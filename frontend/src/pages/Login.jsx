import React, {useState} from 'react'
import axios from 'axios'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) =>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:8000/auth/login', {email, password})
      localStorage.setItem('token', res.data.access_token)
      window.location.href = '/dashboard'
    }catch(err){
      alert('Login failed')
    }
  }

  return (
    <div style={{maxWidth:400, margin:'2rem auto'}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
