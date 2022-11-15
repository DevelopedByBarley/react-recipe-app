import axios from "axios";
import '../Form/Form.css'
import { BiTrash } from 'react-icons/bi';
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { RiImageAddFill } from 'react-icons/ri'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4, v4 } from 'uuid';

export function UpdateForm() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const [recipeData, setRecipeData] = useState([])
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([{}])
  const [steps, setSteps] = useState([{}])
  const [fileNameForDelete, setFileNameForDelete] = useState()



  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then((res) => {
        setRecipeData({
          title: res.data.title,
          prepTime: res.data.prepTime,
          cookTime: res.data.cookTime,
          comment: res.data.comment,
          categorie: res.data.categorie.title,
        })
        setFileNameForDelete(res.data.imageURL)
        setIngredients(res.data.ingredients)
        setSteps(res.data.steps)
      })
  }, [])




  useEffect(() => {
    axios.get('/api/categories')
      .then(res => setCategories(res.data))
  }, [])


  return (
    <div className="form-container">
      <h1 className="form-header">Update</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        const recipeData = {
          title: event.target.elements.title.value,
          prepTime: event.target.elements.prepTime.value,
          cookTime: event.target.elements.cookTime.value,
          comment: event.target.elements.comment.value,
          categorie: event.target.elements.categories.value,
        }

        const file = event.target.elements.fileName.files[0];


        const formData = new FormData();
        formData.append('data', JSON.stringify(recipeData));
        formData.append('ingredients', JSON.stringify(ingredients))
        formData.append('steps', JSON.stringify(steps));
        formData.append('fileName', file)
        formData.append('fileNameForDelete', fileNameForDelete)
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
          <h3>Title:</h3>
          <input type="text" name="title" id="title" required defaultValue={recipeData.title} />
        </div>

        <div className='categories'>
          <h3>Categories:</h3>
          <select name='categories'>
            {categories.map((categorie) => {
              {
                if (categorie.title === recipeData.categorie) {
                  return <option key={categorie._id} selected value={categorie._id}>{categorie.title}</option>
                } else {
                  return <option key={categorie._id} value={categorie._id}>{categorie.title}</option>
                }
              }
            })}
          </select>
        </div>

        <div className="ingredients">
          <h3>Ingredients:</h3>
          {ingredients?.map((ingredient, index) => {
            return (
              <div key={index}>
                <input type="text" defaultValue={ingredient.name} name={`ingredient-name-${index}`} className="ingredient-input" required onChange={(event) => {
                  setIngredients((prev) => {
                    const next = [...prev];
                    next[index].name = event.target.value;
                    return next
                  })
                }} />
                <input type="number" defaultValue={ingredient.quantity} name={`ingredient-quantity-${index}`} className="ingredient-input" required onChange={(event) => {
                  setIngredients((prev) => {
                    const next = [...prev];
                    next[index].quantity = event.target.value
                    return next
                  })
                }} />
                <select name={`ingredient-quantity-type-${index}`} defaultValue={ingredient.quantityType} required onChange={(event) => {
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
                  <button className="form-delete-btn" onClick={(event) => {
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
          <button className="add-ingredient add-btn" required onClick={(event) => {
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
                <span><button className='delete-step form-delete-btn' onClick={(event) => {
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
          <button className='add-step add-btn' onClick={(event) => {
            event.preventDefault();
            setSteps((prev) => [...prev, {
              id: uuidv4(),
              content: ""
            }])
          }}><BsFillPlusCircleFill size={25} /></button>
        </div>

        <div className='file-container'>
          <button className='file-button'>
            <input type="file" className='file' name="fileName" id="fileName" required />
            <RiImageAddFill size={50} />
          </button>
        </div>






        <div>
          <h3>Preparation:</h3>
          <input type="number" name="prepTime" id="prepTime" defaultValue={recipeData.prepTime} required />
        </div>
        <div>
          <h3>Cook:</h3>
          <input type="number" name="cookTime" id="cookTime" defaultValue={recipeData.cookTime} required />
        </div>
        <div>
          <h3>Comment:</h3>
          <textarea rows="4" col="50" name="comment" defaultValue={recipeData.comment} required>

          </textarea>
        </div>






        <div className="send">
          <button className="send-button">Send Recipe</button>
        </div>
      </form >
    </div >
  )
}