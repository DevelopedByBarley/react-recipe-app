
function connectToDb() {
  const mongoose = require('mongoose');
  const db = process.env.MONGO_URI;

  mongoose.connect(db)
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.log(err))
}

module.exports = connectToDb;