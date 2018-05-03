var mongoose = require('mongoose');
var Contract = require('../models/contract');
module.exports = {
    getAll(req, res, next) {
        Contract.find({}).populate({path:'kits', populate:{path:'nodeRef', populate: {path:'location'}}})
            .then(contracts => res.send(contracts))
            .catch(next);
    },
    addOne(req, res, next) {
        console.log(req.body);
        var contractProps =  req.body;
        if(Array.isArray(contractProps)){
            Contract.insertMany(contractProps)
                .then(contracts => res.send(contracts))
                .catch(next);
        } else {
            Contract.create(contractProps)
                .then(contract => res.send(contract))
                .catch(next);
        }
        
    },
    getOne(req, res, next) {
        var contractId = req.params.contractId;
        Contract.findById({_id: contractId}).populate({path:'kits', populate:{path:'nodeRef', populate: {path:'location'}}})
            .then(contract => {
                if(contract === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(contract)
                }
            })
            .catch(next);
    },
    updateOne(req, res, next) {
        var contractId = req.params.contractId;
        var contractProps = req.body;
        Contract.findByIdAndUpdate({ _id: contractId }, contractProps)
            .then(() => Contract.findById({ _id: contractId }))
            .then(contract => {
                if(contract === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(contract)
                }
            })
            .catch(next);
    },
    deleteOne(req, res, next) {
        var contractId = req.params.contractId;
        Contract.findByIdAndRemove({_id: contractId})
            .then(contract => res.status(204).send(contract))
            .catch(next);
    },
};