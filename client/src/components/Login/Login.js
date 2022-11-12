import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export function Login({ setLoggedIn }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();




  async function loginUser(event) {
    event.preventDefault();

    const req = await axios.post('/api/user/login', {
      email: email,
      password: password
    })

    const token = req.data.user
    const status = req.data.status;

    if (status === 'ok') {
      localStorage.setItem('token', token)
      setLoggedIn(true)
      alert('Logged successfull')
      navigate('/recipes')
    } else {
      alert('Invalid email or password')
      navigate("/")
    }
  }


  return (
    <div className='login-form'>
      <h1>Login</h1>
      <form onSubmit={loginUser}>

        <input type="email" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
        <input type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
        <button type='submit' className='login-button'>Login</button>
      </form>
    </div>
  )
}