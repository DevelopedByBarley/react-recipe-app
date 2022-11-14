
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { Nav } from './components/Nav/Nav';
import { RecipeList } from './components/RecipeList/RecipeList';
import { RecipeSingle } from './components/RecipeSingle/RecipeSingle';
import { Form } from './components/Form/Form';
import { UpdateForm } from './components/UpdateForm/UpdateForm';
import { useEffect, useState } from 'react';
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import { RatingStars } from './components/RatingStars/RatingStars';
import { HomePage } from './components/HomePage/HomePage';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';

function App() {
  const [isRatingVisible, setRatingVisible] = useState(false)
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(!token) {
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
    }

    setTimeout(() => {
      setRatingVisible(true)
    },240000)
  })


  return (
    <div className="app-container">
      <Nav isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/recipes' element={<RecipeList />} />
        <Route path='/recipes/add' element={<Form />} />
        <Route path='/recipe-single/:id' element={<RecipeSingle />} />
        <Route path='/recipe-update/:id' element={<UpdateForm />} />
      </Routes>
      <div>{isRatingVisible ? (<RatingStars setRatingVisible={setRatingVisible} />) : ("")}</div>
    </div>
  );
}

export default App;
