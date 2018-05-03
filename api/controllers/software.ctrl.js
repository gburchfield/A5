var mongoose = require('mongoose');
var Software = require('../models/software');
module.exports = {
    getAll(req, res, next) {
        Software.find({})
            .then(softwares => res.send(softwares))
            .catch(next);
    },
    addOne(req, res, next) {
        console.log(req.body);
        var softwareProps =  req.body;
        Software.create(softwareProps)
            .then(software => res.send(software))
            .catch(next);
    },
    getOne(req, res, next) {
        var softwareId = req.params.softwareId;
        Software.findById({_id:softwareId})
            .then(software => {
                if(software === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(software)
                }
            })
            .catch(next);
    },
    updateOne(req, res, next) {
        var softwareId = req.params.softwareId;
        var softwareProps = req.body;
        Software.findByIdAndUpdate({ _id: softwareId }, softwareProps)
            .then(() => Software.findById({ _id: softwareId }))
            .then(software => {
                if(software === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(software)
                }
            })
            .catch(next);
    },
    deleteOne(req, res, next) {
        var softwareId = req.params.softwareId;
        Software.findByIdAndRemove({_id: softwareId})
            .then(software => res.status(204).send(software))
            .catch(next);
    },
};