import './RecipeList.css'
import axios from 'axios';
import { IoEyeSharp, IoFootstepsOutline } from 'react-icons/io5'
import { BiTrash } from 'react-icons/bi'
import { CiStopwatch } from 'react-icons/ci'
import { HiOutlineRefresh } from 'react-icons/hi'
import { MdOutlineMenuBook } from 'react-icons/md'
import { useState, useEffect } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { Link } from 'react-router-dom';



export function RecipeList({ isThemeDark }) {
  const [recipes, setRecipes] = useState([]);
  const [isPending, setPending] = useState(false)

  useEffect(() => {
    setPending(true)
    axios.get('/api/recipes')
      .then((res) => {
        setRecipes(res.data)
      })
      .finally(() => setPending(false))
  }, [])



  return (
    <>
      {isPending ?
        (
          <Spinner />
        )
        :
        (
          <div className={`${isThemeDark ? "dark" : ""} recipeList-container`}>
            {recipes.map((recipe, index) => {
              return (

                <div className='card' key={recipe._id}>
                  <div className='card-header'>
                    <img src={`/assets/files/${recipe.imageURL}`} alt="recipe-picture" />
                  </div>
                  <div className='card-content'>
                    <div className='card-body'>
                      <div className='card-title'>
                        <h1>{recipe.title}</h1>
                      </div>
                      <hr></hr>

                      <div className='time-datas'>
                        <p className='recipe-data'>
                          <CiStopwatch className='recipe-icon' size={25} /> 
                          <span> {recipe.fullTime}</span> minutes
                        </p>
                        <p className='recipe-data'>
                          <MdOutlineMenuBook className='recipe-icon' size={25} />
                          <span> {recipe.ingredients.length}</span> ingredients
                        </p>
                        <p className='recipe-data'>
                          <IoFootstepsOutline className='recipe-icon' size={30} />
                          <span> {recipe.steps.length}</span> steps
                        </p>
                      </div>

                    </div>
                    <div className='card-footer'>

                      <Link to={`/recipe-single/${recipe._id}`}>
                        <button style={{"color": `${isThemeDark ? "white" : "black"}`}} className='view-btn card-btn'>
                          <IoEyeSharp size={30} />
                        </button>
                      </Link>
                      <Link to={`/recipe-update/${recipe._id}`}>
                        <button style={{"color": `${isThemeDark ? "white" : "black"}`}} className='update-btn card-btn'><HiOutlineRefresh size={25} /></button>
                      </Link>
                      <button style={{"color": `${isThemeDark ? "white" : "black"}`}} className='delete-btn card-btn' onClick={(event) => {
                        event.preventDefault();
                        axios.delete(`/api/recipes/${recipe._id}`)
                          .then((res) => {
                            setPending(true)
                            setRecipes((prev) => {
                              const next = [...prev];
                              const index = prev.findIndex(index => index._id === recipe._id)
                              console.log(index);
                              next.splice(index, 1)
                              return next
                            })
                          })
                          .finally(() => {
                            setPending(false)
                          })

                      }}><BiTrash size={30} /></button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      }
    </>

  )
}