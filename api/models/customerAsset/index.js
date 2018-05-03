var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerAssetSchema = new Schema({
    nodeHome: {
        type: Schema.Types.ObjectId,
        ref: 'node',
        required: true
    },
    kitRef: {
        type: Schema.Types.ObjectId,
        ref: 'kit',
        required: true
    },
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
        required: false
    },
    assetType: {
        type: String,
        required:true
    },
    assetSubType: {
        type: String,
        required: true
    },
    classification: {
        type: String,
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
            required: false
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
        serialNum: {
            type: String,
            default: 'To Be Assigned'
        },
        hardDrives:[{
            slot: Number,
            mfg: String,
            modelNum: String,
            partNum: String,
            serialNum: String
        }],
        servers:[{
            node: Number,
            serialNum: String
        }],        
    }],
    serialNum: {
        type: String,
        default: "To Be Assigned",
        required: true
    },
    IUIDsn: {
        type: String,
        default: "To Be Assigned",
        required:true
    },
    nodeName: {
        type: String,
        //default: "To Be Assigned",
        //required: true
    },
    productionLog: [{
        taskGroup: String,
        taskTitle: String,
        startDate: Date,
        endDate: Date
    }],
    log: {
        build: [{
            phaseName: String,
            tasks: [{
                taskName: String,
                startDate: {
                    type: Date,
                    default: null
                },
                endDate: {
                    type: Date,
                    default: null
                },
                estimatedStart: {
                    type: Date,
                    default: null
                }
            }]
        }],
        swInstalls: {
            currentSW: {
                swVer: String,
                dateInstalled: Date,
            },
            oldSW: [{
                swVer: String,
                dateInstalled: Date
            }]
        },
        hwMods:[{
            old:{
                lmPn: String,
                lmSn: String,
                IUID: String,
                IUIDsn: String
            },
            new:{
                lmPn:String,
                lmSn: String,
                IUID: String,
                IUIDsn: String
            },
            modKit: String,
            installDate: Date,
            installers:[String],
            signers:[String]
        }]
    }
    
});

var CustomerAsset = mongoose.model('customerAsset', customerAssetSchema);
module.exports = CustomerAsset;