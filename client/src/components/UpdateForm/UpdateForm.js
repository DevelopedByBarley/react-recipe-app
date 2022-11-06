import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { v4 as uuidv4, v4 } from 'uuid';

export function UpdateForm() {
    const [recipe, setRecipe] = useState('');
    const param = useParams();
    const id = param.id;

    const [ingredients, setIngredients] = useState([{
        id: uuidv4(),
        name: "",
        quantity: "",
        type: "g"
      }])
    
      const [steps, setSteps] = useState([{
        id: uuidv4(),
        conent: ""
      }])
    
    

    useEffect(() => {
        axios.get(`/api/recipes/${id}`)
            .then(res => setRecipe(res.data))
    }, [])

    console.log(recipe)
        
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
                  url: `http://localhost:8080/api/recipes/${id}`,
                  data: formData,
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
        
        
                  .then(res => console.log(res.data))
                  .catch((err) => console.log(err))
                event.preventDefault();
              }}>
        
                <div>
                  <input type="text" name="title" id="title" />
                </div>
        
                <div className="ingredients">
                  {ingredients.map((ingredient, index) => {
                    return (
                      <div key={index}>
                        <input type="text" placeholder='name' name={`ingredient-name-${index}`} onChange={(event) => {
                          setIngredients((prev) => {
                            const next = [...prev];
                            next[index].name = event.target.value;
                            return next
                          })
                        }} />
                        <input type="text" placeholder='quantity' name={`ingredient-quantity-${index}`} onChange={(event) => {
                          setIngredients((prev) => {
                            const next = [...prev];
                            next[index].quantity = event.target.value
                            return next
                          })
                        }} />
                        <select name={`ingredient-type-${index}`} defaultValue={"g"} onChange={(event) => {
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
                        <input type="text" name={`steps-content-${index}`} placeholder="step" onChange={(event) => {
                          setSteps((prev) => {
                            const next = [...prev];
                            next[index].conent = event.target.value;
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
                  <input type="file" name="fileName" id="fileName"/>
                </div>
        
        
        
        
        
                <div>
                  <input type="number" name="prepTime" id="prepTime" />
                </div>
                <div>
                  <input type="number" name="cookTime" id="cookTime" />
                </div>
                <div>
                  <textarea rows="4" col="50" name="comment">
                    comment...
                  </textarea>
                </div>
        
        
        
        
        
        
                <button>Send Recipe</button>
              </form>
            </div>
          )
}