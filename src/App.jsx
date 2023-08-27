import { useState } from 'react'
import './App.css'
import { auth, provider } from "./firebase.config"
import { signInWithPopup, signOut } from 'firebase/auth'


function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  // handle Sign In 
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      })
  }

  // handle Sign Out 
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }


  return (
    <>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
          <h1>Welcome, {user.name}</h1>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </>
  )
}
export default App
