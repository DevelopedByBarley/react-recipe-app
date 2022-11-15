import './NavigateToLogin.css'
import { Link } from "react-router-dom";

export function NavigateToLogin() {
  return (
    <div className="navigate-login-container">
      <h1>Nem vagy bejelentkezve! Regisztráj vagy jelentkezz be!</h1>
      <div className='navigate-login-buttons'>
        <Link className='navigate-login-button register' to='/register'>Regisztráció</Link>
        <Link className='navigate-login-button login' to='/login'>Bejelentkezés</Link>
      </div>
    </div>
  )
}