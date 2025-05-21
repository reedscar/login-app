import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import SignIn from './signIn'
import SignedIn from './SignedIn'

function Authenticator() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      {user ? <SignedIn user={user} setUser={setUser} /> : <SignIn />}
    </>
  )
}

export default Authenticator