var mongoose = require('mongoose');
var Asset = require('../models/asset');
module.exports = {
    getAll(req, res, next) {
        Asset.find({})
            .then(assets => res.send(assets))
            .catch(next);
    },
    addOne(req, res, next) {
        console.log(req.body);
        var assetProps =  req.body;
        Asset.create(assetProps)
            .then(asset => res.send(asset))
            .catch(next);
    },
    getOne(req, res, next) {
        var assetId = req.params.assetId;
        Asset.findById({_id:assetId})
            .then(asset => {
                if(asset === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(asset)
                }
            })
            .catch(next);
    },
    updateOne(req, res, next) {
        var assetId = req.params.assetId;
        var assetProps = req.body;
        Asset.findByIdAndUpdate({ _id: assetId }, assetProps)
            .then(() => Asset.findById({ _id: assetId }))
            .then(asset => {
                if(asset === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(asset)
                }
            })
            .catch(next);
    },
    deleteOne(req, res, next) {
        var assetId = req.params.assetId;
        Asset.findByIdAndRemove({_id: assetId})
            .then(asset => res.status(204).send(asset))
            .catch(next);
    },
};