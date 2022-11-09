import './HomePage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiFoodMenu } from 'react-icons/bi'
import { Spinner } from '../Spinner/Spinner'


export function HomePage({ isThemeDark }) {

  const [isPending, setPending] = useState(false);
  const [lastFiveRecipe, setLastFiveRecipe] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState();
  const [hungarianRecipes, setHungarianRecipes] = useState([])
  const [fastRecipes, setFastRecipes] = useState([])

  useEffect(() => {
    setPending(true)
    axios.get('/api/home')
      .then((res) => {
        setLastFiveRecipe(res.data.latestFive);
        setRandomRecipe(res.data.randomRecipe[0]);
        setHungarianRecipes(res.data.hungarianRecipes)
        setFastRecipes(res.data.fastRecipes)
      })
      .finally(() => setPending(false))
  }, [])


  return (
    isPending ? (
      <Spinner />
    ) : (
      <div className={`${isThemeDark ? "dark" : ""} home-container`}>

        <h1 className='home-title'>Home</h1>

        <div className='latest-five-container'>


          <div className='latest-five-recipes-container'>
            {lastFiveRecipe.map((recipe) => {
              return (
                <div className='latest-five-recipe-card'>
                  <div className='latest-recipe-header'>
                    <div className='latest-recipe-img' style={{ "background": `url(${`/assets/files/${recipe.imageURL}`}) no-repeat center center`, "backgroundSize": "cover" }}>

                    </div>
                    <div className='latest-recipe-body'>
                      <div className='latest-recipe-title'>
                        <h1>{recipe.title}</h1>
                      </div>
                      <div className='latest-recipe-content'>
                        {recipe.fullTime}mins {recipe.ingredients.length}ingredient {recipe.steps.length}step
                      </div>
                    </div>
                    <div className='latest-recipe-view-btn'>
                      <Link to={`/recipe-single/${recipe._id}`}>
                        <button className='view-btn'><BiFoodMenu size={40} /></button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='random-one-container'>
            <div className='random-one-title section-title'>
              <h1 className='section-title'>The Random One</h1>
            </div>
            <div className='random-one-img' style={{ "background": `url(${`/assets/files/${randomRecipe?.imageURL}`}) no-repeat center center`, "backgroundSize": "cover" }}></div>
            <div className='random-one-body'>
              <h1 className='random-one-title'>{randomRecipe?.title}</h1>
              <div className='random-one-content'>
                <h5> {randomRecipe?.fullTime}mins {randomRecipe?.ingredients.length}ingredient {randomRecipe?.steps.length}step</h5>
              </div>
            </div>
          </div>






          <div className='hungarian-five-container'>
            <div className='hungarian-five-header'>
              <div className='hungarian-five-title'>
                <h1 className='section-title'>If you like hungarian's</h1>
                <p>{hungarianRecipes.length} recipe for you</p>
              </div>
            </div>
            {hungarianRecipes.map((recipe) => {
              return (
                <div className='hungarian-five-cards'>
                  <div className='hungarian-card-img' style={{ "background": `url(${`/assets/files/${recipe.imageURL}`}) no-repeat center center`, "backgroundSize": "cover" }}></div>
                  <div className='hungarian-card-body'>
                    <div className='hungarian-card-title'>
                      <h1>{recipe.title}</h1>
                    </div>
                    <div className='hungarian-card-content'>
                      {recipe.fullTime}mins {recipe.ingredients.length}ingredient {recipe.steps.length}step
                    </div>
                    <div className='hungarian-five-view-btn'>
                      <Link to={`/recipe-single/${recipe._id}`}>
                        <button className='view-btn'><BiFoodMenu size={40} /></button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>




          <div className='fast-recipes-container'>
            <div className='fast-recipes-header'>
              <div className='fast-recipes-title'>
                <h1 className='section-title'>If you need some fast food</h1>
                <p> Less than 18 minutes</p>
              </div>
            </div>
            <div className='fast-recipes-cards'>
              {fastRecipes.map((recipe) => {
                return (
                  <div className='fast-recipes-card'>
                    <div className='fast-recipes-card-img' style={{ "background": `url(${`/assets/files/${recipe.imageURL}`}) no-repeat center center`, "backgroundSize": "cover" }}></div>
                    <div className='fast-recipes-card-body'>
                      <div className='fast-recipes-card-title'>
                        <h1>{recipe.title}</h1>
                      </div>
                      <div className='fast-recipes-card-content'>
                        {recipe.fullTime}mins {recipe.ingredients.length}ingredient {recipe.steps.length}step
                      </div>
                      <div className='fast-recipes-view-btn'>
                        <Link to={`/recipe-single/${recipe._id}`}>
                          <button className='view-btn'><BiFoodMenu size={40} /></button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='home-ratings'>

          </div>
        </div>

      </div>
    )
  )
}
