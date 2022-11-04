import { Link } from 'react-router-dom'


export function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/recipes/add">Add recipe</Link>
        </li>
      </ul>
    </nav>

  )
}