import './Form.css'
import { BiTrash } from 'react-icons/bi';
import { BsFillPlusCircleFill } from 'react-icons/bs'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import { NavigateToLogin } from '../NavigatToLogin/NavigateToLogin';

export function Form({ isThemeDark }) {

  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([{
    id: uuidv4(),
    name: "",
    quantity: "",
    quantityType: "g"
  }])

  const [steps, setSteps] = useState([{
    id: uuidv4(),
    content: ""
  }])


  useEffect(() => {
    axios.get('/api/categories')
      .then(res => setCategories(res.data))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode(token);
      const user = decoded.user
      if (user) {
        setUserName(user.name);
        setLoggedIn(true)
      }
    }
  })



  return (
    <>
      {
        isLoggedIn ? (
          <div className="form-container">
            <h1 className='form-header'>Add Recipe</h1>

            <form onSubmit={(event) => {
              event.preventDefault();
              const recipeData = {
                title: event.target.elements.title.value,
                prepTime: event.target.elements.prepTime.value,
                cookTime: event.target.elements.cookTime.value,
                comment: event.target.elements.comment.value,
                categorie: event.target.elements.categories.value
              }


              const file = event.target.elements.fileName.files[0];


              const formData = new FormData();
              formData.append('userName', JSON.stringify(userName))
              formData.append('data', JSON.stringify(recipeData));
              formData.append('ingredients', JSON.stringify(ingredients))
              formData.append('steps', JSON.stringify(steps));
              formData.append('fileName', file)
              axios({
                method: "post",
                url: "/api/recipes",
                data: formData,
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .then(res => navigate('/recipes'))
                .catch((err) => console.log(err))
            }}>

              <div className='title'>
                <h3>Title:</h3>
                <input type="text" name="title" id="title" required />
              </div>

              <div className='categories'>
                <h3>Categories:</h3>
                <select name='categories'>
                  {categories.map((categorie) => {
                    return (
                      <option value={categorie._id}>{categorie.title}</option>
                    )
                  })}
                </select>
              </div>

              <div className="ingredients">
                <h3>Ingredients:</h3>
                {ingredients.map((ingredient, index) => {
                  return (
                    <div key={index}>
                      <input type="text" placeholder='name' className='ingredient-input' name={`ingredient-name-${index}`} required onChange={(event) => {
                        setIngredients((prev) => {
                          const next = [...prev];
                          next[index].name = event.target.value;
                          return next
                        })
                      }} />
                      <input type="text" placeholder='quantity' className='ingredient-input' name={`ingredient-quantity-${index}`} required onChange={(event) => {
                        setIngredients((prev) => {
                          const next = [...prev];
                          next[index].quantity = event.target.value
                          return next
                        })
                      }} />
                      <select className='quantity-type' name={`ingredient-quantity-type-${index}`} defaultValue={"g"} required onChange={(event) => {
                        setIngredients((prev) => {
                          const next = [...prev];
                          next[index].quantityType = event.target.value
                          return next
                        })
                      }}>
                        <option defaultValue="g" >g</option>
                        <option defaultValue="dkg" >dkg</option>
                        <option defaultValue="kg">kg</option>
                        <option defaultValue="ml">ml</option>
                        <option defaultValue="cl">cl</option>
                        <option defaultValue="dl">dl</option>
                        <option defaultValue="l">l</option>
                        <option defaultValue="db">db</option>
                        <option defaultValue="evőkanál">evőkanál</option>
                        <option defaultValue="teáskanál">teáskanál</option>
                        <option defaultValue="gerezd">gerezd</option>
                        <option defaultValue="csipet">csipet</option>
                        <option defaultValue="csomag">csomag</option>
                        <option defaultValue="doboz">doboz</option>
                      </select>
                      <span>
                        <button className='form-delete-btn' onClick={(event) => {
                          event.preventDefault();
                          const index = ingredients.findIndex(item => item.id === ingredient.id);
                          setIngredients((prev) => {
                            const next = [...prev];
                            next.splice(index, 1);
                            return next;
                          })

                        }}><BiTrash size={25} /></button>
                      </span>
                    </div>
                  )
                })}
                <button className="add-ingredient add-btn" onClick={(event) => {
                  event.preventDefault();
                  setIngredients((prev) => [...prev, {
                    id: uuidv4(),
                    name: "",
                    quantity: "",
                    quantityType: "g"
                  }])
                }}><BsFillPlusCircleFill size={25} /></button>
              </div>





              <div className='steps'>
                <h3>Steps:</h3>
                {steps.map((step, index) => {
                  return (
                    <div key={index}>
                      <input type="text" name={`steps-content-${index}`} placeholder="step" required onChange={(event) => {
                        setSteps((prev) => {
                          const next = [...prev];
                          next[index].content = event.target.value;
                          return next;
                        })
                      }} />
                      <span><button className='delete-step form-delete-btn' required onClick={(event) => {
                        event.preventDefault();
                        const index = steps.findIndex(item => item.id === step.id);
                        setSteps((prev) => {
                          const next = [...prev];
                          next.splice(index, 1);
                          return next;
                        })
                      }}><BiTrash size={25} /></button></span>
                    </div>
                  )
                })}
                <button className='add-step add-btn' required onClick={(event) => {
                  event.preventDefault();
                  setSteps((prev) => [...prev, {
                    id: uuidv4(),
                    content: ""
                  }])
                }}><BsFillPlusCircleFill size={25} /></button>
              </div>

              <div className='file'>
                <input type="file" name="fileName" id="fileName" required />
              </div>

              <div>
                <h3>Preparation:</h3>
                <input type="number" name="prepTime" id="prepTime" required />
              </div>
              <div>
                <h3>Cook:</h3>
                <input type="number" name="cookTime" id="cookTime" required />
              </div>
              <div>
                <h3>Comment:</h3>
                <textarea rows="10" col="40" name="comment" defaultValue={"comment..."} required></textarea>
              </div>






              <div className='send'>
                <button className='send-button' type='submit'>Send Recipe</button>
              </div>
            </form>
          </div >
        )
          :
          (
            <NavigateToLogin />
          )

      }
    </>
  )
}