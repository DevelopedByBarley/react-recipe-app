import './Form.css'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Form({ isThemeDark }) {

  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([{
    id: uuidv4(),
    name: "",
    quantity: "",
    type: "g"
  }])

  const [steps, setSteps] = useState([{
    id: uuidv4(),
    content: ""
  }])

  return (
    <div className={`${isThemeDark ? "dark" : ""} form-container`}>
      <form onSubmit={(event) => {
        event.preventDefault();
        const recipeData = {
          title: event.target.elements.title.value,
          prepTime: event.target.elements.prepTime.value,
          cookTime: event.target.elements.cookTime.value,
          comment: event.target.elements.comment.value
        }

        const file = event.target.elements.fileName.files[0];


        const formData = new FormData();
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

        <div>
          <input type="text" name="title" id="title" required/>
        </div>

        <div className="ingredients">
          {ingredients.map((ingredient, index) => {
            return (
              <div key={index}>
                <input type="text" placeholder='name' name={`ingredient-name-${index}`} required onChange={(event) => {
                  setIngredients((prev) => {
                    const next = [...prev];
                    next[index].name = event.target.value;
                    return next
                  })
                }} />
                <input type="number" placeholder='quantity' name={`ingredient-quantity-${index}`} required onChange={(event) => {
                  setIngredients((prev) => {
                    const next = [...prev];
                    next[index].quantity = event.target.value
                    return next
                  })
                }} />
                <select name={`ingredient-type-${index}`} defaultValue={"g"} required onChange={(event) => {
                  setIngredients((prev) => {
                    const next = [...prev];
                    next[index].type = event.target.value
                    return next
                  })
                }}>
                  <option defaultValue="g" selected>g</option>
                  <option defaultValue="kg">kg</option>
                  <option defaultValue="ml">ml</option>
                </select>
                <span>
                  <button onClick={(event) => {
                    event.preventDefault();
                    const index = ingredients.findIndex(item => item.id === ingredient.id);
                    setIngredients((prev) => {
                      const next = [...prev];
                      next.splice(index, 1);
                      return next;
                    })

                  }}>Delete</button>
                </span>
              </div>
            )
          })}
          <button className="add-ingredient" onClick={(event) => {
            event.preventDefault();
            setIngredients((prev) => [...prev, {
              id: uuidv4(),
              name: "",
              quantity: "",
              type: "g"
            }])
          }}>+</button>
        </div>





        <div className='steps'>
          {steps.map((step, index) => {
            return (
              <div className='step'>
                <input type="text" name={`steps-content-${index}`} placeholder="step" required onChange={(event) => {
                  setSteps((prev) => {
                    const next = [...prev];
                    next[index].content = event.target.value;
                    return next;
                  })
                }} />
                <span><button className='delete-step' required onClick={(event) => {
                  event.preventDefault();
                  const index = steps.findIndex(item => item.id === step.id);
                  setSteps((prev) => {
                    const next = [...prev];
                    next.splice(index, 1);
                    return next;
                  })
                }}>Delete</button></span>
              </div>
            )
          })}
          <button className='add-step' required onClick={(event) => {
            event.preventDefault();
            setSteps((prev) => [...prev, {
              id: uuidv4(),
              content: ""
            }])
          }}>+</button>
        </div>

        <div className='file'>
          <input type="file" name="fileName" id="fileName" required/>
        </div>





        <div>
          <input type="number" name="prepTime" id="prepTime" required/>
        </div>
        <div>
          <input type="number" name="cookTime" id="cookTime" required/>
        </div>
        <div>
          <textarea rows="4" col="50" name="comment" required>
            comment...
          </textarea>
        </div>






        <button>Send Recipe</button>
      </form>
    </div>
  )
}