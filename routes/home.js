const express = require('express');
const router = express.Router();
const Recipe = require('../database/models/recipeModel')


router.get('/', async (req, res) => {
  let randomRecipe = await Recipe.aggregate().sample(1)
  const latestFive = await Recipe.find({}).sort({ _id: -1 }).limit(5)
  const hungarianRecipes = await Recipe.find({categorie: '636a32aa75f43bb3fb93cd3e'}).sort({ _id: -1 }).limit(5)
  getRandomRecipe();


  res.send(
    {
      latestFive: latestFive,
      randomRecipe: randomRecipe,
      hungarianRecipes: hungarianRecipes
    }
  );
})




async function getRandomRecipe() {
  await Recipe.count().exec(function (err, count) {

    var random = Math.floor(Math.random() * count)

    Recipe.findOne().skip(random).exec(
      function (err, result) { })
  })
}




module.exports = router;