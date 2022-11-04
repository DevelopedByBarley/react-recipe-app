import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Spinner } from "../Spinner/Spinner";


export function RecipeSingle() {
  const param = useParams();
  const id = param.id;
  console.log(id);

  const [recipe, setRecipe] = useState("");
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true)
    axios.get(`/api/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .finally(() => setPending(false))
  }, [])

  console.log(recipe);

  return (
    <>
      {
        isPending ?
          (
            <Spinner />
          )
          :
          (
            <div>
              <h1>Single Recipe!</h1>
              <h1>{recipe.title}</h1>
              <h1>{recipe._id}</h1>
            </div>
          )
      }
    </>
  )
}