var mongoose = require('mongoose');
var Contract = require('../models/contract');
var Location = require('../models/location');
var Kit = require('../models/kit');
var Node = require('../models/node');
var ObjectId = mongoose.Types.ObjectId;

module.exports = {
    getAll(req, res, next) {
        var kitStatus = req.query.kitStatus;
        if(kitStatus){
            Kit.find({ status:kitStatus }).populate({path: 'assets nodeRef contractRef', populate:{ path: 'location' } })
                .then(kit => res.send(kit))
                .catch(next);
        } else {
            Kit.find({}).populate({path: 'nodeRef contractRef', populate:{ path: 'location' } })
            .then(kit => res.send(kit))
            .catch(next);
        }
        
    },
    addOne(req, res, next) {
        console.log(req.query);
        console.log('********');
        console.log(req.body);
        var kitProps =  req.body;
        if(kitProps.newNode === 'false'){
            console.log('newNode is false');
            Kit.create(kitProps)
                .then((kit) => {
                    console.log("Kit successfully created:");
                    console.log(kit);
                    Contract.findByIdAndUpdate(kit.contractRef, {$push:{kits:kit._id}},{new:true})
                        .then((contract)=>{
                            console.log(contract);
                        })
                    res.send(kit);
                })
                .catch(next);
        } else{
            Node.create(kitProps.nodeRef)
                .then(node => {
                    Location.findByIdAndUpdate(node.location,{$push:{nodes:node._id}},{new:true})
                        .then((location) =>{
                            console.log(location);
                            //res.send(node);
                        })
                        .catch(next);
                    kitProps.nodeRef = node._id;
                    console.log(kitProps);
                    Kit.create(kitProps)
                        .then((kit) => {
                            console.log("Kit successfully created:");
                            console.log(kit);
                            Contract.findByIdAndUpdate(kit.contractRef, {$push:{kits:kit._id}},{new:true})
                                .then((contract)=>{
                                    console.log(contract);
                                })
                            res.send(kit);
                        })
                        .catch(next);
                })
                .catch(next);
        }
    },
    getOne(req, res, next) {
        var kitId = req.params.kitId;
        Kit.findById({_id:kitId}).populate({path:'nodeRef assets', populate: {path:'location', populate:{path:'country'}}})
            .then(kit => {
                if(kit === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(kit)
                }
            })
            .catch(next);
    },
    updateOne(req, res, next) {
        console.log(req.body);
        var kitId = req.params.kitId;
        var kitProps =  req.body;
        Kit.findByIdAndUpdate({ _id: kitId },kitProps)
            .then(() => Kit.findById({ _id: kitId }))
                .then(kit => {
                    if(kit === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                    } else {
                        res.send(kit);
                    }
                })
            .catch(next);
    },
    deleteOne(req, res, next) {
        var kitId = req.params.kitId;
        console.log('*****');
        console.log(!req.query.newNode);
        console.log('*****');
        console.log(req.query.newNode);
        console.log('*****');
        if(req.query.newNode == 'false'){
            console.log('*****Deleting Partial Kit*****');
            Contract.update( {}, {$pull: {kits: new ObjectId(kitId) }}, {new:true})
                .then(
                    (contract) => {
                        console.log("Updated Contract");
                        console.log(contract);
                        Kit.findByIdAndRemove({_id: kitId})
                            .then( (kitResponse) => {
                                res.status(204).send(kitResponse);
                            } )
                            .catch(next);
                    }
                )
                .catch(next);
        } else if(req.query.newNode == 'true') {
            console.log('*****Deleting Full Kit*****');       
        Kit.findById({_id: kitId})
            .then( (kit) => {
                console.log('Locating node to delete with _id: ');
                console.log(kit.nodeRef);
                Node.findById({ _id: kit.nodeRef })
                .then(
                    (node) => {
                        console.log('Removing Node Reference from Location with id: ');
                        console.log(node.location);
                        console.log('Node Id is: ');
                        console.log(node._id);
                        Location.update( {}, {$pull:{ nodes: new ObjectId(node._id) }}, {new:true})
                            .then(
                                (location)=>{
                                    console.log("Updated Location");
                                    console.log(location);
                                    Node.findByIdAndRemove({_id: kit.nodeRef})
                                        .then((node) => {
                                            console.log('Removing Kit Reference from Contract with id: ');
                                            console.log(kit.contractRef);
                                            console.log('Kit Id is: ');
                                            console.log(kit._id);
                                            Contract.update( {}, {$pull: {kits: new ObjectId(kit._id) }}, {new:true})
                                                .then(
                                                    (contract) => {
                                                        console.log("Updated Contract");
                                                        console.log(contract);
                                                        Kit.findByIdAndRemove({_id: kitId})
                                                            .then( (kitResponse) => {
                                                                res.status(204).send(kitResponse);
                                                            } )
                                                            .catch(next);
                                                    }
                                                )
                                                .catch(next);
                                        } )
                                        .catch(next);
                            })
                            .catch(next);
                    }
                )
                .catch(next);
            } )
            .catch(next);
        }
        
    },
};