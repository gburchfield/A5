var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kitSchema = new Schema({
    contractRef: {
        type: Schema.Types.ObjectId,
        ref: 'contract',
        required:true
    },
    kitRef : {
        type : String,
        required : true
    },
    clin: {
        type: Number,
        required: true
    },
    startPOP : {
        type: Date,
        required: true
    },
    endPOP : {
        type: Date,
        required: true
    },
    cfuDate : {
        type: Date,
        required: true
    },
    achievedCFU : {
        type: Date,
        
    },
    newNode:{
        type: Boolean,
        required: true
    },
    nodeRef:{
        type: Schema.Types.ObjectId,
        ref: 'node',
        required:true
    },
    assets:[{
        type: Schema.Types.ObjectId,
        ref: 'customerAsset'
    }],
    status:{
        type: String,
        enum: ['Not Started', 'In Progress', 'Shipped', 'Delivered'],
        default: 'Not Started',
    },
    log: {
        startDate: {
            type: Date,
            default: null
        },
        endDate: {
            type: Date,
            default: null
        },
        functions: [{
                name: String,
                phases:[{
                    name: String,
                    step: Number
                }]
        }],
    }
});


var Kit = mongoose.model('kit', kitSchema);
module.exports = Kit;