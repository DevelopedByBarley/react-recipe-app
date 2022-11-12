import './RecipeSingle.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Spinner } from "../Spinner/Spinner";
import { IoFootstepsOutline } from 'react-icons/io5'
import { GoPrimitiveDot } from 'react-icons/go'


export function RecipeSingle({ isThemeDark }) {

  const param = useParams();
  const id = param.id;

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
            <div className="recipe-single-container" >

              <div className='recipe-single-content'>
                <div className='recipe-single-image' style={{ "background": `url(${`/assets/files/${recipe.imageURL}`}) center center`, "backgroundSize": "cover" }}></div>
                <div className='recipe-single-userName'>
                  <h2>Receptet hozzáadta:</h2>
                  <p>{recipe.userName}</p>
                </div>
                <div className='recipe-single-body'>
                  <div className='recipe-time'>
                    <div className='prepTime times'>
                      <h4>Elökészités</h4>
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
                  <div className='recipe-header'>
                    <h1 className='recipe-title'>{recipe.title}</h1>
                    <p className='recipe-categorie'>{recipe.categorie?.title}</p>
                  </div>
                  <div className='recipe-single-ingredients'>
                    <h3>Hozzávalók:</h3>
                    {recipe.ingredients?.map((ingredient, index) => {
                      return (
                        <div className='recipe-single-ingredient'>
                          <p className='recipe-single-ingredient-name'>{ingredient.name}</p>
                          <p className='recipe-single-ingredient-data'> {ingredient.quantity} {ingredient.quantityType}</p>
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

