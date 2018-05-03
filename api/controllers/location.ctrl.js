var mongoose = require('mongoose');
var Country = require('../models/country');
var Location = require('../models/location');
module.exports = {
    greeting(req, res) {
        res.send({hi: 'there'});
    },
    getAll(req, res, next) {
        Location.find({}).populate('nodes')
            .then(locations => res.send(locations))
            .catch(next);
    },
    addOne(req, res, next) {
        console.log(req.body);
        var locationProps =  req.body;
        Location.create(locationProps)
            .then(location => {
                Country.findByIdAndUpdate(location.country, {$push: {locations:location._id} }, {new:true})
                    .then((country)=> console.log(country));
                res.send(location)
            })
            .catch(next);
    },
    getOne(req, res, next) {
        var locationId = req.params.locationId;
        Location.findById({_id:locationId})
            .then(location => {
                if(location === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(location)
                }
            })
            .catch(next);
    },
    updateOne(req, res, next) {
        var locationId = req.params.locationId;
        var locationProps = req.body;
        Location.findByIdAndUpdate({ _id: locationId }, locationProps)
            .then(() => Location.findById({ _id: locationId }))
            .then(location => {
                if(location === null){
                    res.status(404).send({message: "ID Does not exist in database."});
                } else {
                    res.send(location)
                }
            })
            .catch(next);
    },
    deleteOne(req, res, next) {
        var locationId = req.params.locationId;
        Location.findByIdAndRemove({_id: locationId})
            .then(location => res.status(204).send(location))
            .catch(next);
    },
};