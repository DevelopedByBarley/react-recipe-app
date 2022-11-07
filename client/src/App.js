
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

function App() {

  const [isThemeDark, setThemeDark] = useState(false)
  const [isRatingVisible, setRatingVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRatingVisible(true)
    }, 320000)
  }, [])


  return (
    <div className={`${isThemeDark ? "dark" : ""} app-container`}>
      <Nav isThemeDark={isThemeDark} setThemeDark={setThemeDark} />
      <Routes>
        <Route path='/' element={<WelcomePage isThemeDark={isThemeDark} />} />
        <Route path='/home' element={"<WelcomePage isThemeDark={isThemeDark}/>"} />
        <Route path='/recipes' element={<RecipeList isThemeDark={isThemeDark} />} />
        <Route path='/recipes/add' element={<Form isThemeDark={isThemeDark} />} />
        <Route path='/recipe-single/:id' element={<RecipeSingle isThemeDark={isThemeDark} />} />
        <Route path='/recipe-update/:id' element={<UpdateForm />} />
      </Routes>
      <div>{isRatingVisible ? (<RatingStars setRatingVisible={setRatingVisible} />) : ("")}</div>
    </div>
  );
}

export default App;
