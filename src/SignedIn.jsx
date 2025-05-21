import { supabase } from "./supabaseClient"
import Counter from "./Counter.jsx"
import DataFetcher from "./DataFetcher.jsx"

function SignedIn({user, setUser}){

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
            if (error) {
                console.error('Logout error:', error.message)
            } else {
                setUser(null)
        }
    }


    return(
        <>
        <p className="logged-in">Logged in as {user.email}</p>
        <button onClick={handleLogout} className="login-button">Logout</button>
        <Counter user={user}></Counter>
        <DataFetcher></DataFetcher>
        </>
    )
}
export default SignedIn