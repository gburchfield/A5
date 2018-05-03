var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nodeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nodeNames: [{
        nodeType:{
            type: String,
            required: true
        },
        nodeName:{
            type: String,
            required:true
        }
    }],
    squadName:{
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'location',
        required: true
    },
    jsfPart:{
        type:Schema.Types.ObjectId,
        ref: 'country.jsfParts',
        required: true
    },
    assets: [{
        type: Schema.Types.ObjectId,
        ref: 'customerAsset'
    }]
});

var Node = mongoose.model('node', nodeSchema);
module.exports = Node;