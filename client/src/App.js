
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { Nav } from './components/Nav/Nav';
import { RecipeList } from './components/RecipeList/RecipeList';
import { HomePage } from './components/HomePage/HomePage'
import { RecipeSingle } from './components/RecipeSingle/RecipeSingle';


function App() {


  return (
    <div className='app-container'>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipes' element={<RecipeList />} />
        <Route path='/recipe-single/:id' element={<RecipeSingle />} />
      </Routes>
    </div>
  );
}

export default App;
