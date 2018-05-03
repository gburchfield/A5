var mongoose = require('mongoose');
var CustomerAsset = require('../models/customerAsset');
var Node = require('../models/node');
var Kit = require('../models/kit');
var Software = require('../models/software');
var ObjectId = mongoose.Types.ObjectId;
module.exports = {
    getAll(req, res, next) {
        CustomerAsset.find({}).populate('asset currentSW.swVer')
            .then(customerAssets =>{
                res.send(customerAssets)
            })
            .catch(next);
    },
    addOne(req, res, next) {
        console.log(req.body);
        var customerAssetProps =  req.body;
        CustomerAsset.create(customerAssetProps)
            .then(customerAsset => {
                console.log("*****");
                console.log(customerAsset.length);
                var assetIdArray = [];
                for(var i = 0; i<customerAsset.length; i++){
                    console.log(customerAsset[i]._id);
                    assetIdArray.push(customerAsset[i]._id);
                }
                console.log(assetIdArray);
                console.log("*****");
                Node.findByIdAndUpdate(customerAsset[0].nodeHome,{$pushAll:{assets:assetIdArray}},{new:true})
                    .then((node) =>{
                        console.log(node);
                        Kit.findByIdAndUpdate(customerAsset[0].kitRef,{$pushAll:{assets:assetIdArray}},{new:true})
                            .then((kit) =>{
                                console.log(kit);
                                res.send(customerAsset);
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);


        // var alisPN = customerAssetProps.asset;
        // var swVer = customerAssetProps.currentSW.swVer
        // Asset.findOne({partNum: alisPN})
        //     .then(asset => {
        //         if(asset === null){
        //             res.status(404).send({message: "The ALIS PN does not exist in database."});
        //         } else {
        //             customerAssetProps.asset = asset._id;
        //             Software.findOne({version: swVer})
        //                 .then(software => {
        //                     if(software === null){
        //                         res.status(404).send({message: "The ALIS Software Version does not exist in database."});
        //                     } else {
        //                         customerAssetProps.currentSW.swVer = software._id;
        //                         CustomerAsset.create(customerAssetProps)
        //                             .then(customerAsset => res.send(customerAsset))
        //                             .catch(next);
        //                     }
        //                 })
        //                 .catch(next);
        //         }
        //     })
        //     .catch(next);
    },
    getOne(req, res, next) {
        var customerAssetId = req.params.customerAssetId;
        CustomerAsset.findById({_id:customerAssetId}).populate('asset currentSW.swVer')
            .then(customerAsset => {
                if(customerAsset === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(customerAsset)
                }
            })
            .catch(next);
    },
    updateOne(req, res, next) {
        var customerAssetId = req.params.customerAssetId;
        var customerAssetProps = req.body;
        CustomerAsset.findByIdAndUpdate({ _id: customerAssetId }, customerAssetProps)
            .then(() => CustomerAsset.findById({ _id: customerAssetId }))
            .then(customerAsset => {
                if(customerAsset === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(customerAsset)
                }
            })
            .catch(next);
    },
    deleteOne(req, res, next) {
        var customerAssetId = req.params.customerAssetId;
        var kitId = req.query.kit;
        var nodeId = req.query.node;
        Kit.update( {_id:kitId}, {$pull:{ assets: new ObjectId(customerAssetId) }}, {new:true})
            .then(
                () => {
                    Node.update( {_id:nodeId}, {$pull:{ assets: new ObjectId(customerAssetId) }}, {new:true})
                        .then(
                            () => {
                                CustomerAsset.findByIdAndRemove({_id: customerAssetId})
                                    .then(customerAsset => res.status(204).send(customerAsset))
                                    .catch(next);
                            }
                        )
                        .catch(next);
                }
            )
            .catch(next);
    },
};