
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { Nav } from './components/Nav/Nav';
import { RecipeList } from './components/RecipeList/RecipeList';
import { HomePage } from './components/HomePage/HomePage'
import { RecipeSingle } from './components/RecipeSingle/RecipeSingle';
import { Form } from './components/Form/Form';
import { UpdateForm } from './components/UpdateForm/UpdateForm';
import { useState } from 'react';


function App() {

  const [isThemeDark, setThemeDark] = useState(false)


  return (
    <div className={`${isThemeDark ? "dark" : ""} app-container`}>
      <Nav isThemeDark={isThemeDark} setThemeDark={setThemeDark}/>
      <Routes>
        <Route path='/' element={<HomePage isThemeDark={isThemeDark}/>} />
        <Route path='/recipes' element={<RecipeList isThemeDark={isThemeDark} />} />
        <Route path='/recipes/add' element={<Form isThemeDark={isThemeDark}/>} />
        <Route path='/recipe-single/:id' element={<RecipeSingle />} />
        <Route path='/recipe-update/:id' element={<UpdateForm />} />
      </Routes>
    </div>
  );
}

export default App;
