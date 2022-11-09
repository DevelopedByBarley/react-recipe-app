import './Nav.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { RiMenuFill } from 'react-icons/ri'
import { IoRestaurantSharp } from 'react-icons/io5'


export function Nav({ isThemeDark, setThemeDark }) {
  const [isMenuActive, setMenuActive] = useState(false)

  return (
    <header>
      <button className='menu-toggle' onClick={() => {
        setMenuActive(prevCheck => !prevCheck)
      }}>
        <RiMenuFill />
      </button>
      <nav className={`${isMenuActive ? "active" : ""}`}>
        <div className={`nav-wrapper ${isThemeDark ? "dark" : ""}`}>
          <ul>
            <li onClick={() => setMenuActive(false)} >
              <Link className='link' to="/"><IoRestaurantSharp size={25}/></Link>
            </li>
            <li onClick={() => setMenuActive(false)}>
              <Link className='link' to="/home">Home</Link>
            </li>
            <li onClick={() => setMenuActive(false)}>
              <Link className='link' to="/recipes">Recipes</Link>
            </li>
            <li onClick={() => setMenuActive(false)}>
              <Link className='link' to="/recipes/add">Add recipe</Link>
            </li>
          </ul>

        </div>
      </nav>
    </header >
  )
}