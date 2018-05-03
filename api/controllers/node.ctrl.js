var mongoose = require('mongoose');
var Location = require('../models/location');
var Node = require('../models/node');
module.exports = {
    getAll(req, res, next) {
        if(req.query.nodes){
            var nodes = Array.from(JSON.parse(req.query.nodes));
            for(let node in nodes){
                nodes[node] = mongoose.Types.ObjectId(nodes[node]);
            }
            Node.find({'_id':{$in:nodes}}).populate('assets')
                .then(nodes => res.send(nodes))
                .catch(next);    
        } else {
            Node.find({}).populate('assets')
                .then(nodes => res.send(nodes))
                .catch(next);
        }
    },
    addOne(req, res, next) {
        console.log(req.body);
        var nodeProps =  req.body;
        Node.create(nodeProps)
            .then(node => {
                Location.findByIdAndUpdate(node.location,{$push:{nodes:node._id}},{new:true})
                    .then((location) =>{
                        console.log(location);
                        res.send(node);
                    })
                    .catch(next);
            })
            .catch(next);
    },
    getOne(req, res, next) {
        var nodeId = req.params.nodeId;
        Node.findById({_id:nodeId}).populate({path:'assets location jsfPart', populate: {path:'asset'}})
            .then(node => {
                if(node === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(node)
                }
            })
            .catch(next);
    },
    updateOne(req, res, next) {
        var nodeId = req.params.nodeId;
        var nodeProps = req.body;
        Node.findByIdAndUpdate({ _id: nodeId }, nodeProps)
            .then(() => Node.findById({ _id: nodeId }))
            .then(node => {
                if(node === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(node)
                }
            })
            .catch(next);
    },
    deleteOne(req, res, next) {
        var nodeId = req.params.nodeId;
        Node.findByIdAndRemove({_id: nodeId})
            .then(node => res.status(204).send(node))
            .catch(next);
    },
};