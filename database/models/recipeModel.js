const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: false
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }],
  steps: [{
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }],
  prepTime: {
    type: Number,
    required: true
  },
  cookTime: {
    type: Number,
    required: true
  },
  fullTime: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false,
  },

})


module.exports = mongoose.model('Recipe', RecipeSchema)