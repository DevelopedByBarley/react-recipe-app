const express = require('express');
const router = express.Router();
const Ratings = require('../database/models/ratings')



router.get('/', async (req, res) => {
  const ratings = await Ratings.find({});
  res.send(ratings)
})

router.put('/', async (req, res) => {
  const id = '63694256f05658826a38d944'
  const ratings = req.body.ratings;


  const newRating = await Ratings.findByIdAndUpdate({ _id: id }, {
    $push: { ratings: ratings }
  }, { returnOriginal: false })
  await newRating.save();
  console.log(newRating)

})



module.exports = router;