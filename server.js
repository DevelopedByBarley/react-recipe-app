require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDb = require('./database/connection/connect')
const recipeRouter = require('./routes/recipe');
const ratingsRouter = require('./routes/ratings');
const categoriesRouter = require('./routes/categories')


app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.use('/api/recipes', recipeRouter);
app.use('/api/ratings', ratingsRouter)
app.use('/api/categories', categoriesRouter)

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