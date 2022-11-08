const express = require('express');
const router = express.Router();
const Categoires = require('../database/models/categories')


router.get('/', async (req, res) => {
  const categories = await Categoires.find({})
  res.send(categories)
})

router.post('/', async (req, res) => {
  const newCategorie = await new Categoires({
    title: req.body.title
  })
  await newCategorie.save();
  res.send(newCategorie)
})


module.exports = router;