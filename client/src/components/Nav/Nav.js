import './Nav.css'
import { Link } from 'react-router-dom'
import { SwitchTheme } from '../SwitchTheme/SwitchTheme'


export function Nav({isThemeDark, setThemeDark}) {
  return (
    <nav className={`${isThemeDark ? "dark": ""}`}>
      <ul>
        <li>
          <Link className='link' to="/">Home</Link>
        </li>
        <li>
          <Link className='link' to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link className='link' to="/recipes/add">Add recipe</Link>
        </li>
      </ul>

      <SwitchTheme isThemeDark={isThemeDark} setThemeDark={setThemeDark}/>
    </nav>

  )
}