import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';

export function HomePage() {

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

  console.log(recipes);

  return (
    <>
      {isPending ?
        (
          <Spinner />
        )
        :
        (
          <div>
            <h1>You have {recipes.length} Recipes!</h1>
            <Link to="/recipes">LetsSee!</Link>
          </div>

        )
      }
    </>

  )
}