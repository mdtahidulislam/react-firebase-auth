import './App.css';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
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
  // email and pass state from from
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  // register btn handler
  const handleRegistration = (e) => {
    e.preventDefault();
    // pass validation
    if (pass.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }
    console.log(email, pass);
    createUserWithEmailAndPassword(auth, email, pass)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
      })
      .catch(error => {
        setError(error.message);
      })
  }
  // get email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  // get pass
  const handlePassChange = (e) => {
    setPass(e.target.value);
  }

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

  // signout btn handler
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }

  return (
    <div className="">
      {/* login form */}
      <div className="container">
        <form onSubmit={handleRegistration}>
          <h1>Please register</h1>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input onBlur={handleEmailChange} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input onBlur={handlePassChange} type="password" class="form-control" id="exampleInputPassword1" />
          </div>
          {error}
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>


        <div>---------------------------</div>

        {!user.name ?
          <div>
            <button onClick={handleGoogleSignIn}>Google SignIn</button>
          </div> :
          <button onClick={handleSignOut}>Signout</button>
        }
        <hr />
        {/* show user info */}
        {
          user.email && <>
            <h1>Welcome to {user.name}</h1>
            <p>{user.email}</p>
            <img src={user.img} alt={user.name} />
          </>

        }
      </div>
    </div>
  );
}

export default App;
