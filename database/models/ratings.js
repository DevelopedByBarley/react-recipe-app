const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingsModel = new Schema({
  ratings: {
    type: [Number],
    required: true
  }
})

module.exports = mongoose.model('Ratings', RatingsModel)