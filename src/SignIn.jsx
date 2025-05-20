import { useState } from 'react'
import { supabase } from './supabaseClient'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './login.css'

function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')

    // login
    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
        })

        // if there is an error, display below
        if (error){
        toast(error.message);
        } else {
        setUser(data.user)
        } 
    }

    // signup
    const handleSignup = async () => {
        const { data, error } = await supabase.auth.signUp({ email, password })
    
        if (error) {
            toast(error.message);
        } else if (data.user) {
            // User already exists or created successfully
            toast('Email already registered. Please log in.');
        }else {
            toast('Please verify your email by clicking the link sent to your inbox.');
        }
    }
    
    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    return (
        <div className='login-box'>
        {!user ? (
            <>
            <h2 className="login-header">Login or Sign Up</h2>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="login-text" />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="login-text" />
            <div className='login-button-container'>
            <button onClick={handleLogin} className="login-button">Login</button>
            <button onClick={handleSignup} className="login-button">Sign Up</button>
            <ToastContainer></ToastContainer>
            </div>
            </>
        ) : (
            <>
            <p className="logged-in">Logged in as {user.email}</p>
            <button onClick={handleLogout} className="login-button">Logout</button>
            </>
        )}
        </div>
    )
}
export default SignIn