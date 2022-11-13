import './NavigateToLogin.css'
import { Link } from "react-router-dom";

export function NavigateToLogin() {
  return (
    <div className="navigate-login-container">
      <h1>U are did not logged! Please Register Or Login</h1>
      <div className='navigate-login-buttons'>
        <Link className='navigate-login-button register' to='/register'>Register</Link>
        <Link className='navigate-login-button login' to='/login'>Login</Link>
      </div>
    </div>
  )
}