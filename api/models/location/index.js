var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  locationType: {
    type: String,
    enum: ['Base', 'Ship']
  },
  country:{
    type : Schema.Types.ObjectId,
    ref: 'country',
    required : true
  },
  city: String,
  state: String,
  nodes: [{
      type: Schema.Types.ObjectId,
      ref: 'node'
  }]
//   location : {
//     address : String,
//     // Always store coordinates longitude (East/West), latitude (North/South) order.
//     coordinates : {
//       type : [Number],
//       index : '2dsphere'
//     }
//   }
});

var Location = mongoose.model('location', locationSchema);
module.exports = Location;