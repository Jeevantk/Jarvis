/**
* @Author: aravind
* @Date:   2017-11-08T15:06:24+05:30
* @Last modified by:   aravind
* @Last modified time: 2017-11-08T15:06:24+05:30
*/



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  name: String,
  person_id: String,
  type: String
});

module.exports = mongoose.model('Person', PersonSchema);
