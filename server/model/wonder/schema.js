const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const wonder = new Schema({
  title: { type: String, required: true },
  link: { type: String },
  hashtags: { type: String }
});


module.exports = mongoose.model('Wonder', wonder);
