import './RecipeList.css'
import { useState, useEffect } from 'react';
import { Spinner } from '../Spinner/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RecipeList({isThemeDark}) {
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
          <div className={`${isThemeDark ? "dark": ""} recipeList-container`}>
            {recipes.map((recipe, index) => {
              return (

                <div className='card' key={recipe._id}>
                  <div className='card-header'>
                    <img src={`/assets/files/${recipe.imageURL}`} alt="recipe-picture" />
                  </div>
                  <div className='card-body'>
                    <h1>{recipe.title}</h1>
                    <p>{recipe._id}</p>
                  </div>
                  <div className='card-footer'>
                    <button className='delete-btn' onClick={(event) => {
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

                    }}>Törlés</button>

                    <Link to={`/recipe-single/${recipe._id}`}>
                      <button>
                        Check
                      </button>
                    </Link>
                    <Link to={`/recipe-update/${recipe._id}`}>
                      <button className='update-btn'>Update</button>
                    </Link>
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