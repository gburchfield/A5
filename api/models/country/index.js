var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jsfPartSchema = new Schema({
  name: String
});
mongoose.model('country.jsfParts', jsfPartSchema);

var countrySchema = new Schema({
  name : {
    type : String,
    required : true
  },
  imagePath:{
    type : String,
    required : true
  },
  // jsfParts: [{
  //   name: String,
  //   // required: true
  // }],
  jsfParts: [jsfPartSchema],
  locations: [{
      type: Schema.Types.ObjectId,
      ref: 'location'
  }]
});

var Country = mongoose.model('country', countrySchema);
module.exports = Country;