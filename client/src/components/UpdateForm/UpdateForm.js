import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4, v4 } from 'uuid';

export function UpdateForm() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const [recipeData, setRecipeData] = useState([])
  const [ingredients, setIngredients] = useState([{}])
  const [steps, setSteps] = useState([{}])



  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then((res) => {
        setRecipeData({
          title: res.data.title,
          prepTime: res.data.prepTime,
          cookTime: res.data.cookTime,
          comment: res.data.comment
        })
        setIngredients(res.data.ingredients)
        setSteps(res.data.steps)
      })
  }, [])


  console.log(recipeData);

  return (
    <div className="form-container">
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
          method: "put",
          url: `/api/recipes/${id}`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => navigate('/recipes'))
          .catch((err) => console.log(err))
        event.preventDefault();
      }}>

        <div>
          <input type="text" name="title" id="title" required defaultValue={recipeData.title} />
        </div>

        <div className="ingredients">
          {ingredients?.map((ingredient, index) => {
            return (
              <div key={index}>
                <input type="text" defaultValue={ingredient.name} name={`ingredient-name-${index}`} required onChange={(event) => {
                  setIngredients((prev) => {
                    const next = [...prev];
                    next[index].name = event.target.value;
                    return next
                  })
                }} />
                <input type="number" defaultValue={ingredient.quantity} name={`ingredient-quantity-${index}`} required onChange={(event) => {
                  setIngredients((prev) => {
                    const next = [...prev];
                    next[index].quantity = event.target.value
                    return next
                  })
                }} />
                <select name={`ingredient-type-${index}`} defaultValue={ingredient.type} required onChange={(event) => {
                  setIngredients((prev) => {
                    const next = [...prev];
                    next[index].type = event.target.value
                    return next
                  })

                }}>
                  <option defaultValue="g">g</option>
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
          <button className="add-ingredient" required onClick={(event) => {
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
          {steps?.map((step, index) => {
            return (
              <div className='step' key={index}>
                <input type="text" name={`steps-content-${index}`} defaultValue={step.content} required onChange={(event) => {
                  setSteps((prev) => {
                    const next = [...prev];
                    next[index].content = event.target.value;
                    return next;
                  })
                }} />
                <span><button className='delete-step' onClick={(event) => {
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
          <button className='add-step' onClick={(event) => {
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
          <input type="number" name="prepTime" id="prepTime" defaultValue={recipeData.prepTime} required />
        </div>
        <div>
          <input type="number" name="cookTime" id="cookTime" defaultValue={recipeData.cookTime} required/>
        </div>
        <div>
          <textarea rows="4" col="50" name="comment" defaultValue={recipeData.comment} required>

          </textarea>
        </div>






        <button>Send Recipe</button>
      </form>
    </div>
  )
}