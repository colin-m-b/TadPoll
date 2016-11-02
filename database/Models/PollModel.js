const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  _id: String,
  userName: String,
  title: String,
  questions: Array,
  open: Boolean,
  created_at: Date,
});

const Poll = mongoose.model('Poll', pollSchema);

// make this available to our users in our Node applications
module.exports = Poll;
