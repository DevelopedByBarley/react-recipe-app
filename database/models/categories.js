const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = new Schema({
  title: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Categories', Categories)