const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const wonder = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  tags: {
    type: Array
  },
  likes: {
    type: Number
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('Wonder', wonder);
