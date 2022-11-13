import './RecipeList.css'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { IoEyeSharp, IoFootstepsOutline } from 'react-icons/io5'
import { BiTrash } from 'react-icons/bi'
import { CiStopwatch } from 'react-icons/ci'
import { HiOutlineRefresh } from 'react-icons/hi'
import { MdOutlineMenuBook } from 'react-icons/md'
import { useState, useEffect } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { NavigateToLogin } from '../NavigatToLogin/NavigateToLogin';



export function RecipeList() {
  const [userName, setUserName] = useState('')
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [recipes, setRecipes] = useState([]);
  const [isPending, setPending] = useState(false)

  function getRecipes() {
    setPending(true)
    axios.get('api/recipes', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then((res) => { setRecipes(res.data); console.log(res.data) })
      .finally(() => setPending(false))
  }



  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwtDecode(token);
      if (user) {
        setUserName(user.user.name)
        setLoggedIn(true)
        getRecipes();
      }
    }
  }, [])

  return (
    <>


      {!isLoggedIn ?
        (
          <NavigateToLogin />
        )
        :
        (

          <div className="recipeList-container">
            <div className='recipeList-welcome'>
              <h1>Welcome {userName}! </h1>
              <h3>You have {recipes.length} recipes!</h3>
            </div>
            <div className='recipeList'>
              {recipes.map((recipe, index) => {
                return (

                  <div className='card' key={recipe._id}>
                    <div className='card-header' style={{ "background": `url(${`/assets/files/${recipe.imageURL}`}) center center`, "backgroundSize": "cover", "height": "300px" }}>

                    </div>
                    <div className='card-content'>
                      <div className='card-body'>
                        <div className='card-title'>
                          <h3>{recipe.title}</h3>
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
                          <button className='view-btn card-btn'>
                            <IoEyeSharp size={30} />
                          </button>
                        </Link>
                        <Link to={`/recipe-update/${recipe._id}`}>
                          <button className='update-btn card-btn'><HiOutlineRefresh size={25} /></button>
                        </Link>
                        <button className='delete-btn card-btn' onClick={(event) => {
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
          </div>
        )
      }
    </>

  )
}
