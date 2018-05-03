var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    assets:[{
        type: Schema.Types.ObjectId,
        ref: 'asset'
    }]
});

var AssetType = mongoose.model('assetType', assetTypeSchema);
module.exports = AssetType;