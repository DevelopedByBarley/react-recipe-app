import './WelcomePage.css'
import axios from 'axios'
import { BsStarFill } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import {BsFillArrowRightCircleFill} from 'react-icons/bs'

export function WelcomePage() {

  const [recipes, setRecipes] = useState([]);
  const [isPending, setPending] = useState(false)
  const [ratings, setRatings] = useState()

  useEffect(() => {
    setPending(true)
    axios.get('/api/recipes/allRecipes')
      .then((res) => {
        setRecipes(res.data)
      })
      .finally(() => setPending(false))


    axios.get('/api/ratings')
      .then((res) => setRatings(res.data[0].ratings))
  }, [])

  const reduceRatings = (ratings) => {
    const sumOfRatings = ratings?.reduce((prev, curr) => prev + curr)
    const numberOfRatings = ratings?.length
    const sum = sumOfRatings / numberOfRatings;
    return sum
  }



  return (
    <>
      {isPending ?
        (
          <Spinner />
        )
        :
        (
          <div className='welcome-page'>
            <div className>
              <div className='welcome'>
                <h1>Köszöntelek a Recept Appon!</h1>
              </div>
              <h1>Jelenleg {recipes.length} recept található!</h1>
              <Link className='link next-arrow' to="/home"><BsFillArrowRightCircleFill size={70}/></Link>
              <div className='ratings'>
                <div className='numberOfRatings'>
                  <h1>{ratings?.length} értékelés!</h1>
                </div>
                <div className='rating'>
                  {reduceRatings(ratings).toFixed(2)} / 5 <BsStarFill />
                </div>
              </div>
            </div>
          </div>

        )
      }
    </>

  )
}