// src/SignIn.jsx
import { useState } from 'react'
import { supabase } from './supabaseClient'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './login.css'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
        toast(error.message)
    } else {
        setEmail(email);
    }
  }

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      toast(error.message)
    } else if (data.user) {
      toast('Email already registered. Please log in.')
    } else {
      toast('Please verify your email by clicking the link sent to your inbox.')
    }
  }

  return (
    <div className='login-box'>
      <h2 className="login-header">Login or Sign Up</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="login-text" />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="login-text" />
      <div className='login-button-container'>
        <button onClick={handleLogin} className="login-button">Login</button>
        <button onClick={handleSignup} className="login-button">Sign Up</button>
        <ToastContainer />
      </div>
    </div>
  )
}

export default SignIn
