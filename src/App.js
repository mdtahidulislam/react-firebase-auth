import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import initAuthentication from './Firebase/init.firebase';
import { useState } from 'react';

// call firebase
initAuthentication();

// create providers instance object
const googleProvider = new GoogleAuthProvider();


function App() {
  // user state
  const [user, setUser] = useState([]);
  const auth = getAuth();

  // sign in btn handler
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedUser = {
          name: displayName,
          email: email,
          img: photoURL
        }
        setUser(loggedUser);
      })
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google SignIn</button>
      <hr />
      {
        user.email && <>
          <h1>Welcome to {user.name}</h1>
          <p>{user.email}</p>
          <img src={user.img} alt={user.name} />
        </>

      }
    </div>
  );
}

export default App;
