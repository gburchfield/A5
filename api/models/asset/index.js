var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    partNum: {
        type: String,
        required: true
    },
    IUID: {
        type: String,
        required: true
    },
    assetType:{
        type: String,
        required: true
    },
    assetSubType:{
        type: String,
        required: true
    },
    classification:{
        type: String,
        enum: ['Classified', 'Unclassified'],
        default: 'Unclassified',
        required: true
    },
    childAssets:[{
        name: {
            type: String,
            required: true
        },
        partNum: {
            type: String,
            required: true
        },
        cage: {
            type: String,
            required: true
        },
        mfg: {
            type: String,
            required: false
        },
        modelNum: {
            type: String,
            required: false
        },
        venPartNum: {
            type: String,
            required: false
        },
        hardDrives:{
            type: Number,
            required: true,
            default: 0
        },
        servers:{
            type: Number,
            required: true,
            default: 0
        }
    }]
});

var Asset = mongoose.model('asset', assetSchema);
module.exports = Asset;