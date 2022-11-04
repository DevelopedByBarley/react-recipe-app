const express = require('express');
const router = express.Router();
const fs = require('fs')

const Recipe = require('../database/models/recipeModel')
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/assets/files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })






router.get('/', async (req, res) => {
  const allRecipes = await Recipe.find({});
  res.send(allRecipes)
})

router.post('/', upload.single('fileName'), async (req, res) => {

  const fileName = req.file.filename;
  const recipeData = JSON.parse(req.body.data)
  const ingredientsData = JSON.parse(req.body.ingredients)
  const stepsData = JSON.parse(req.body.steps)

  console.log(stepsData.steps)
  const recipe = {
    title: recipeData.title,
    ingredients: ingredientsData.ingredients,
    steps: stepsData.steps,
    prepTime: Number(recipeData.prepTime),
    cookTime: Number(recipeData.cookTime),
    fullTime: Number(recipeData.prepTime) + Number(recipeData.cookTime),
    comment: recipeData.comment,
    imageURL: fileName
  }

  const newRecipe = await new Recipe(recipe)
  await newRecipe.save()
  res.send(newRecipe)
})

router.delete('/:recipeId', async (req, res) => {
  const id = req.params.recipeId;
  const path = './public/assets/files/';

  const deletedRecipe = await Recipe.findByIdAndDelete({
    _id: id
  })

  const fileName = deletedRecipe.imageURL;


  fs.unlink(`./public/assets/files/${fileName}`,function(err){
    if(err) return console.log(err);
    console.log('file deleted successfully');
});  

  res.send(deletedRecipe)
})

router.put('/:recipeId', upload.single('fileName'), async (req, res) => {
  const id = req.params.recipeId;
  const fileName = req.file.filename;
  const recipeData = JSON.parse(req.body.data)
  const ingredientsData = JSON.parse(req.body.ingredients)
  const stepsData = JSON.parse(req.body.steps)

  const newRecipe = {
    title: recipeData.title,
    ingredients: ingredientsData.ingredients,
    steps: stepsData.steps,
    prepTime: Number(recipeData.prepTime),
    cookTime: Number(recipeData.cookTime),
    fullTime: Number(recipeData.prepTime) + Number(recipeData.cookTime),
    comment: recipeData.comment,
    imageURL: fileName
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate({ _id: id }, newRecipe, { returnOriginal: false })
  res.send(updatedRecipe)
})


module.exports = router;