import './HomePage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoFootstepsOutline } from 'react-icons/io5'
import { MdOutlineMenuBook } from 'react-icons/md'
import { CiStopwatch } from 'react-icons/ci'
import { Spinner } from '../Spinner/Spinner'


export function HomePage() {

  const [isPending, setPending] = useState(false);
  const [lastFiveRecipe, setLastFiveRecipe] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState();
  const [hungarianRecipes, setHungarianRecipes] = useState([])

  useEffect(() => {
    setPending(true)
    axios.get('/api/home')
      .then((res) => {
        setLastFiveRecipe(res.data.latestFive);
        setRandomRecipe(res.data.randomRecipe[0]);
        setHungarianRecipes(res.data.hungarianRecipes)
      })
      .finally(() => setPending(false))
  }, [])


  return (
    isPending ? (
      <Spinner />
    ) : (
      <div className="home">
        <div className="home-title">
          <h1>Home</h1>
        </div>
        <div className='latest-five-title section-title'>
          <h1>Latest Five</h1>
        </div>
        <div className='latest-five-recipes-container'>
          {lastFiveRecipe.map((recipe) => {
            return (
              <div className='latest-card'>
                <div className='latest-card-img'>
                  <img src={`/assets/files/${recipe.imageURL}`} />
                </div>
                <div className='latest-card-body'>
                  <h1 className='latest-card-title'>{recipe.title}</h1>
                </div>
                <hr />
                <div className='latest-time-datas'>
                  <p className='latest-recipe-data'>
                    <CiStopwatch className='latest-recipe-icon' size={25} />
                    <span> {recipe.fullTime}</span> minutes
                  </p>
                  <p className='latest-recipe-data'>
                    <MdOutlineMenuBook className='latest-recipe-icon' size={25} />
                    <span> {recipe.ingredients.length}</span> ingredients
                  </p>
                  <p className='latest-recipe-data'>
                    <IoFootstepsOutline className='latest-recipe-icon' size={30} />
                    <span> {recipe.steps.length}</span> steps
                  </p>
                </div>
                <div className='latest-recipes-comment'>
                  <p>{recipe.comment}</p>
                </div>
              </div>

            )
          })}

        </div>
        <div className='random-title  section-title'>
          <h1>The Random One</h1>
        </div>
        <div className='random-recipe-container'>
          <div className='random-recipe-card'>
            <div className='random-recipe-img'>
              <img src={`/assets/files/${randomRecipe?.imageURL}`} />
            </div>
            <div className='random-recipe-body'>
              <div className='random-recipe-card-title'>
                <h1>{randomRecipe?.title}</h1>
              </div>
              <div className='random-time-datas'>
                <p className='random-recipe-data'>
                  <CiStopwatch className='recipe-icon' size={25} />
                  <span> {randomRecipe?.fullTime}</span> minutes
                </p>
                <p className='random-recipe-data'>
                  <MdOutlineMenuBook className='recipe-icon' size={25} />
                  <span> {randomRecipe?.ingredients.length}</span> ingredients
                </p>
                <p className='random-recipe-data'>
                  <IoFootstepsOutline className='recipe-icon' size={30} />
                  <span> {randomRecipe?.steps.length}</span> steps
                </p>
              </div>
            </div>
          </div>
        </div>



        <div className='hungarian-recipes-container'>
          <div className='section-title hungarian-title'>
            <h1>If you love Hungarians</h1>
          </div>
          {hungarianRecipes.map((recipe) => {
            return (
              <div className='latest-card'>
              <div className='latest-card-img'>
                <img src={`/assets/files/${recipe.imageURL}`} />
              </div>
              <div className='latest-card-body'>
                <h1 className='latest-card-title'>{recipe.title}</h1>
              </div>
              <hr />
              <div className='latest-time-datas'>
                <p className='latest-recipe-data'>
                  <CiStopwatch className='latest-recipe-icon' size={25} />
                  <span> {recipe.fullTime}</span> minutes
                </p>
                <p className='latest-recipe-data'>
                  <MdOutlineMenuBook className='latest-recipe-icon' size={25} />
                  <span> {recipe.ingredients.length}</span> ingredients
                </p>
                <p className='latest-recipe-data'>
                  <IoFootstepsOutline className='latest-recipe-icon' size={30} />
                  <span> {recipe.steps.length}</span> steps
                </p>
              </div>
              <div className='latest-recipes-comment'>
                <p>{recipe.comment}</p>
              </div>
            </div>
            )
          })}
        </div>

      </div>
    )
  )
}