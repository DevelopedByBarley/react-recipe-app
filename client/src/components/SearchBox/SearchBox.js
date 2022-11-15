import './SearchBox.css'
import axios from "axios"
import { useState } from "react";
import { Link } from "react-router-dom";

export function SearchBox() {
  const [foundRecipe, setFoundRecipe] = useState([])


  console.log(foundRecipe, "hello");

  function searchRecipes(event) {

    console.log(event.target.value.length);
    const title = event.target.value;
    axios.post('/api/home/query', {
      title: title
    })
      .then((res) => {
        if (event.target.value.length > 0) {
          setFoundRecipe(res.data)
        } else {
          setFoundRecipe([])
        }
      })

  }



  return (
    <div className='search-box'>
      <div className="search-box-component">
        <h1 className="search-box-title">Recept kereső:</h1>
        <input type="text" onChange={searchRecipes} placeholder="recept neve" />
      </div>
      <div className='founded-recipe-list-component'>
        <ul>
          {foundRecipe.map((recipe) => {
            return (
              <>
                <Link className="founded-recipes-link" to={`/recipe-single/${recipe._id}`}>
                  <li>
                    {recipe.title} <span className='mini-img' style={{ "background": `url(${`/assets/files/${recipe.imageURL}`}) center center`, "backgroundSize": "cover" }}></span>
                  </li>
                </Link>
              </>
            )
          })}
        </ul>
      </div>
    </div>

  )
}