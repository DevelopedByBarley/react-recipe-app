import './Register.css'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




  async function registerUser(event) {
    event.preventDefault();


    const res = await axios.post('/api/user/register', {
      name: name,
      email: email,
      password: password
    })

    const status = res.data.status

    if (status === 'ok') {
      navigate('/login')
    } else {
      navigate('/register')
    }



  }


  return (
    <div className='register-container'>
      <h1>Regisztráció</h1>
      <form onSubmit={registerUser}>
        <input type="text" placeholder="Felhasználó név" onChange={(event) => { setName(event.target.value) }} />
        <input type="email" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
        <input type="password" placeholder="Jelszó" onChange={(event) => { setPassword(event.target.value) }} /><br />
        <button type='submit'>Regisztráció</button>
      </form>
    </div>
  )
}