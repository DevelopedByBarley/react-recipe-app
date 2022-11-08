import './RecipeSingle.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Spinner } from "../Spinner/Spinner";
import { IoFootstepsOutline } from 'react-icons/io5'


export function RecipeSingle({ isThemeDark }) {

  const param = useParams();
  const id = param.id;
  console.log(id);

  const [recipe, setRecipe] = useState("");
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true)
    axios.get(`/api/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .finally(() => setPending(false))
  }, [])

  return (
    <>
      {
        isPending ?
          (
            <Spinner />
          )
          :
          (
            <div className={`recipe-single-container ${isThemeDark ? "dark" : ""}`}>

              <div className='recipe-single-content'>
                <div className='recipe-single-image'>
                  <img src={`/assets/files/${recipe.imageURL}`} />
                </div>
                <div className='recipe-single-body'>
                  <div className='recipe-time'>
                    <div className='prepTime times'>
                      <h4>Előkészités</h4>
                      <p className='recipe-prepTime'>{recipe.prepTime} min</p>
                    </div>
                    <div className='cookTime times'>
                      <h4>Sütés</h4>
                      <p className='recipe-cookTime'>{recipe.cookTime} min</p>
                    </div>
                    <div className='fullTime times'>
                      <h4>Összesen</h4>
                      <p className='recipe-fullTime'>{recipe.fullTime} min</p>
                    </div>
                  </div>
                  <div className='title'>
                    <h1 className='recipe-title'>{recipe.title}</h1>
                    <p className='recipe-categorie'>{recipe.categorie?.title}</p>
                  </div>
                  <div className='recipe-single-ingredients'>
                    <h3>Hozzávalók:</h3>
                    {recipe.ingredients?.map((ingredient, index) => {
                      return (
                        <div className='recipe-single-ingredient'>
                          <p className='ingredient-index'>{index + 1}. </p>
                          <p className='recipe-single-ingredient-name'>{ingredient.name}</p>
                          <p className='recipe-single-ingredient-data'> {ingredient.quantity} {ingredient.type}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className='recipe-single-steps'>
                    {recipe.steps?.map((step, index) => {
                      return (
                        <div className='recipe-single-step'>
                          <div className='step-index'>{index + 1}.<IoFootstepsOutline /></div>
                          <div className='recipe-single-step-content'>{step.content}</div>
                        </div>
                      )
                    })}
                  </div>
                  <div className='recipe-single-comment'>
                    <h1>Comment:</h1>
                    <p className='comment'>{recipe.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </>
  )
}

