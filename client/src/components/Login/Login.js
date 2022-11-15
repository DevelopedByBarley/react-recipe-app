import './Login.css'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      setTimeout(() => {
        localStorage.clear();
        setLoggedIn(false)
      }, 1500000)
    } else {
      alert('Invalid email or password')
      navigate("/login")
    }
  }


  return (
    <div className='login-form'>
      <h1>Bejelentkezés</h1>
      <form onSubmit={loginUser}>

        <input type="email" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
        <input type="password" placeholder="Jelszó" onChange={(event) => { setPassword(event.target.value) }} /><br/>
        <button type='submit' className='login-button'>Bejelentkezés</button> <br></br>
        <Link className='forgot-password'>Elfelejtetted a jelszavad?</Link>
      </form>
    </div>
  )
}