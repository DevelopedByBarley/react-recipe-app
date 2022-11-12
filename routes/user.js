const express = require('express');
const router = express.Router();
const User = require('../database/models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
  const newPassword = await bcrypt.hash(req.body.password, 10)

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword
    })
    res.send({ status: "ok", user: true })
  } catch {
    res.send({ status: "error, email is duplicated!", user: false })
  }

})

router.post('/login', async (req, res) => {
  let isUserExist

  const user = await User.findOne({
    email: req.body.email,
  })

  if (user) {
    isUserExist = await bcrypt.compare(req.body.password, user.password)
  }


  if (isUserExist) {
    console.log(user);
    const token = jwt.sign({ user }, 'secret123')

    res.send({ status: "ok", user: token })
  } else {
    res.send({ status: "error", user: false })
  }



})





module.exports = router;