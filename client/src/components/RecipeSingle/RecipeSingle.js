import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"


export function RecipeSingle() {
  const param = useParams();
  const id = param.id;
  
  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then(res => console.log(res.data))
  }, [])
  return (
    <div>
      <h1>Single Recipe!</h1>
    </div>
  )
}