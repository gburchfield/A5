var mongoose = require('mongoose');
var AssetType = require('../models/assetType');
module.exports = {
    getAll(req, res, next) {
        AssetType.find({}).populate({path:"assets"})
            .then(assetTypes => res.send(assetTypes))
            .catch(next);
    },
    addOne(req, res, next) {
        console.log(req.body);
        var assetTypeProps =  req.body;
        AssetType.create(assetTypeProps)
            .then(assetType => res.send(assetType))
            .catch(next);
    },
    getOne(req, res, next) {
        var assetTypeId = req.params.assetTypeId;
        AssetType.findById({_id:assetTypeId})
            .then(assetType => {
                if(assetType === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(assetType)
                }
            })
            .catch(next);
    },
    updateOne(req, res, next) {
        var assetTypeId = req.params.assetTypeId;
        var assetTypeProps = req.body;
        AsseTypet.replaceOne({ _id: assetTypeId }, assetTypeProps)
            .then(() => AssetType.findById({ _id: assetTypeId }))
            .then(assetType => {
                if(assetType === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(assetType)
                }
            })
            .catch(next);
    },
    deleteOne(req, res, next) {
        var assetTypeId = req.params.assetTypeId;
        Asset.findByIdAndRemove({_id: assetTypeId})
            .then(assetType => res.status(204).send(assetType))
            .catch(next);
    },
};