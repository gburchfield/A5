var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contractSchema = new Schema({
    updated: {
        type: Date,
        default: Date.now(),
        required:true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    popStartDate:{
        type: Date,
        required: true
    },
    popEndDate: {
        type: Date,
        required: true
    },
    kits: [{
        type: Schema.Types.ObjectId,
        ref: 'kit'
    }]
});

var Contract = mongoose.model('contract', contractSchema);
module.exports = Contract;