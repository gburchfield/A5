var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var softwareSchema = new Schema({
    version: {
        type: String,
        required: true
    },
    features: String
});

var Software = mongoose.model('software', softwareSchema);
module.exports = Software;