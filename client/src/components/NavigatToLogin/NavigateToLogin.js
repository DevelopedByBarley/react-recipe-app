import { Link } from "react-router-dom";

export function NavigateToLogin() {
  return (
    <div>
      <h1>U are did not logged! Please Register Or Login</h1>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </div>
  )
}