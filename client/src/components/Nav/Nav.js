import './Nav.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RiMenuFill } from 'react-icons/ri'
import { IoRestaurantSharp } from 'react-icons/io5'


export function Nav({ isLoggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuActive, setMenuActive] = useState(false)

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
              <NavLink className='link' to="/"><IoRestaurantSharp size={25} /></NavLink>
            </li>
            <li onClick={() => setMenuActive(false)}>
              <NavLink className='link' to="/home">Kezdőlap</NavLink>
            </li>
            <li onClick={() => setMenuActive(false)}>
              <NavLink className='link' to="/recipes">Recept lista</NavLink>
            </li>
            <li onClick={() => setMenuActive(false)}>
              <NavLink className='link' to="/recipes/add">Recept hozzáadása</NavLink>
            </li>
          </ul>
          <div className='log-buttons'>
            <button className='login' style={{ "display": `${isLoggedIn ? "none" : ""}` }} onClick={() => {
              navigate("/login")
              setMenuActive(false);
            }}>Bejelentkezés</button>
            <button className='logout' style={{ "display": `${isLoggedIn ? "" : "none"}` }} onClick={() => {
              setMenuActive(false)
              localStorage.clear();
              setLoggedIn(false)
              navigate('/')
            }}>Kijelentkezés</button>
            <button className='register' style={{ "display": `${isLoggedIn ? "none" : ""}` }} onClick={() => {
              setMenuActive(false)
              navigate('/register')
            }}>Regisztráció</button>
          </div>
        </div>


      </nav>
    </header >
  )
}