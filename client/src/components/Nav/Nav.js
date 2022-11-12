import './Nav.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RiMenuFill } from 'react-icons/ri'
import { IoRestaurantSharp } from 'react-icons/io5'


export function Nav({ isLoggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuActive, setMenuActive] = useState(false)

  console.log(isLoggedIn);

  return (
    <header>
      <button className='menu-toggle' onClick={() => {
        setMenuActive(prevCheck => !prevCheck)
      }}>
        <RiMenuFill />
      </button>
      <nav className={`${isMenuActive ? "active" : ""}`}>
        <div className="nav-wrapper">
          <ul>
            <li onClick={() => setMenuActive(false)} >
              <Link className='link' to="/"><IoRestaurantSharp size={25} /></Link>
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
          <div className='log-buttons'>
            <button className='login' style={{ "display": `${isLoggedIn ? "none" : ""}` }} onClick={() => { navigate("/login") }}>Login</button>
            <button className='logout' style={{ "display": `${isLoggedIn ? "" : "none"}` }} onClick={() => {
              localStorage.clear();
              setLoggedIn(false)
              navigate('/')
            }}>Logout</button>
            <button className='register' style={{ "display": `${isLoggedIn ? "none" : ""}` }} onClick={() => {
              navigate('/register')
            }}>Register</button>
          </div>
        </div>


      </nav>
    </header >
  )
}