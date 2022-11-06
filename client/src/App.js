
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { Nav } from './components/Nav/Nav';
import { RecipeList } from './components/RecipeList/RecipeList';
import { HomePage } from './components/HomePage/HomePage'
import { RecipeSingle } from './components/RecipeSingle/RecipeSingle';
import { Form } from './components/Form/Form';
import { UpdateForm } from './components/UpdateForm/UpdateForm';


function App() {


  return (
    <div className='app-container'>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipes' element={<RecipeList />} />
        <Route path='/recipes/add' element={<Form />} />
        <Route path='/recipe-single/:id' element={<RecipeSingle />} />
        <Route path='/recipe-update/:id' element={<UpdateForm />} />
      </Routes>
    </div>
  );
}

export default App;
