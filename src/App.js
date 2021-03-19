import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const credential = result.credential;
        const token = credential.accessToken;
        const user = result.user;
        console.log(token, user)
        setUser(user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential)
      });
  }
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const credential = result.credential;
        const user = result.user;
        const accessToken = credential.accessToken;
        console.log(accessToken, user)
        setUser(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential)
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleGoogleSignIn}>Sign In Using Google</button>
        <br/>
        <button onClick={handleFacebookSignIn}>Sign In Using Facebook</button>
        <h1>Your Name: {user.displayName}</h1>
        <h3>Email: {user.email}</h3>
        <img src={user.photoURL} alt="" />
      </header>
    </div>
  );
}

export default App;
