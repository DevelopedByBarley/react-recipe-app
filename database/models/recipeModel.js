const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Categories'
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageURL: {
    type: String,
    required: false
  },
  ingredients: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    quantityType: {
      type: String,
      required: true
    }
  }],
  steps: [{
    id: {
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