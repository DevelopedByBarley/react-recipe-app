import './HomePage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiStopwatch } from 'react-icons/ci'
import { MdOutlineMenuBook } from 'react-icons/md'
import { IoFootstepsOutline } from 'react-icons/io5'
import { Spinner } from '../Spinner/Spinner'
import { Footer } from '../Footer/Footer';
import { SearchBox } from '../SearchBox/SearchBox';


export function HomePage() {

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
      <div className={"home-container"}>
        <div className='search-container'>
          <SearchBox/>
        </div>
        <div className='latest-five-container'>
          <div className='latest-five-recipes-container'>

            {lastFiveRecipe.map((recipe) => {
              return (
                <div className='latest-five-recipe-card'>
                  <Link className='homepage-link' to={`/recipe-single/${recipe._id}`}>
                    <div className='latest-recipe-header'>
                      <div className='latest-recipe-img' style={{ "background": `url(${`/assets/files/${recipe.imageURL}`}) no-repeat center center` , "backgroundSize": "cover" }}></div>
                    </div>
                    <div className='latest-recipe-body'>
                      <div className='latest-recipe-title'>
                        <h1>{recipe.title}</h1>
                      </div>
                      <div className='latest-recipe-content'>
                        <CiStopwatch size={30} className='recipe-icon' />&nbsp;{recipe.fullTime} perc
                        <MdOutlineMenuBook size={30} className='recipe-icon' />&nbsp;{recipe.ingredients.length} hozzávaló
                        <IoFootstepsOutline size={30} className='recipe-icon' />&nbsp;{recipe.steps.length} lépés
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}

          </div>
          <div className='random-one-container'>
            <div className='random-one-img' style={{ "background": `url(${`/assets/files/${randomRecipe?.imageURL}`}) center center`, "backgroundSize": "cover" }}></div>
            <div className='random-one-body'>
              <h1 className='random-one-card-title'>{randomRecipe?.title}</h1>
              <div className='random-one-card-content'>
                <h5>
                  <CiStopwatch size={30} className='recipe-icon' />{randomRecipe?.fullTime} perc
                  <MdOutlineMenuBook size={30} className='recipe-icon' />{randomRecipe?.ingredients.length} hozzávaló
                  <IoFootstepsOutline size={30} className='recipe-icon' />{randomRecipe?.steps.length} lépés</h5>
              </div>
            </div>
          </div>






          <div className='hungarian-five-container'>
            <div className='hungarian-five-header'>
              <div className='hungarian-five-title'>
                <h1 className='section-title'>Ha szereted a Magyar recepteket!</h1>
                <p>{hungarianRecipes.length} Recept neked</p>
              </div>
            </div>
            {hungarianRecipes.map((recipe) => {
              return (
                <div className='hungarian-five-cards'>
                  <Link className='homepage-link' to={`/recipe-single/${recipe._id}`}>
                    <div className='hungarian-card-img' style={{ "background": `url(${`/assets/files/${recipe.imageURL}`}) no-repeat center center`, "backgroundSize": "cover" }}></div>
                    <div className='hungarian-card-body'>
                      <div className='hungarian-card-title'>
                        <h1>{recipe.title}</h1>
                      </div>
                      <div className='hungarian-card-content'>
                        <CiStopwatch size={30} className='recipe-icon' /> {recipe.fullTime} mins
                        <MdOutlineMenuBook size={30} className='recipe-icon' /> {recipe.ingredients.length} ingredient
                        <IoFootstepsOutline size={30} className='recipe-icon' /> {recipe.steps.length} step
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>




          <div className='fast-recipes-container'>
            <div className='fast-recipes-header'>
              <div className='fast-recipes-title'>
                <h1 className='section-title'>Ha kevés időd van!</h1>
                <p>Kevesebb mint 18 perc alatt elkészül!</p>
              </div>
            </div>
            <div className='fast-recipes-cards'>
              {fastRecipes.map((recipe) => {
                return (
                  <div className='fast-recipes-card'>
                    <Link className='homepage-link' to={`/recipe-single/${recipe._id}`}>
                      <div className='fast-recipes-card-img' style={{ "background": `url(${`/assets/files/${recipe.imageURL}`}) no-repeat center center`, "backgroundSize": "cover" }}></div>
                      <div className='fast-recipes-card-body'>
                        <div className='fast-recipes-card-title'>
                          <h1>{recipe.title}</h1>
                        </div>
                        <div className='fast-recipes-card-content'>
                          <CiStopwatch size={30} className='recipe-icon' />{recipe.fullTime}  mins
                          <MdOutlineMenuBook size={30} className='recipe-icon' /> {recipe.ingredients.length} ingredient
                          <IoFootstepsOutline size={30} className='recipe-icon' /> {recipe.steps.length} step
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        <Footer />
      </div>
    )
  )
}
