var mongoose = require('mongoose');
var Country = require('../models/country');
module.exports = {
    getAll(req, res, next) {
        Country.find({}).populate({path:'locations', populate: {path:'nodes'}})
            .then(countries => res.send(countries))
            .catch(next);
    },
    addOne(req, res, next) {
        console.log(req.body);
        var countryProps =  req.body;
        if(Array.isArray(countryProps)){
            Country.insertMany(countryProps)
                .then(country => res.send(country))
                .catch(next);
        } else {
            Country.create(countryProps)
                .then(country => res.send(country))
                .catch(next);
        }
        
    },
    getOne(req, res, next) {
        var countryId = req.params.countryId;
        Country.findById({_id:countryId})
            .then(country => {
                if(country === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(country)
                }
            })
            .catch(next);
    },
    updateOne(req, res, next) {
        var countryId = req.params.countryId;
        var countryProps = req.body;
        Country.findByIdAndUpdate({ _id: countryId }, countryProps)
            .then(() => Country.findById({ _id: countryId }))
            .then(country => {
                if(country === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(country)
                }
            })
            .catch(next);
    },
    deleteOne(req, res, next) {
        var countryId = req.params.countryId;
        Country.findByIdAndRemove({_id: countryId})
            .then(country => res.status(204).send(country))
            .catch(next);
    },
};