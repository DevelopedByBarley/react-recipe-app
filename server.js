require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDb = require('./database/connection/connect')
const recipeRouter = require('./routes/recipe');




app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/recipes', recipeRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

connectToDb();

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`)
})