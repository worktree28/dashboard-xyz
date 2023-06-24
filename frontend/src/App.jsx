// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Home from './pages/Home';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBTMOyQbwUxsHpWJClOAfWuHnctn-ozkzA',
  authDomain: 'dashboard-xyz.firebaseapp.com',
  projectId: 'dashboard-xyz',
  storageBucket: 'dashboard-xyz.appspot.com',
  messagingSenderId: '306128283135',
  appId: '1:306128283135:web:dc38ed2ec1f89a5dd6f3ca',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const setUserInLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };
  useEffect(() => {
    const user = getUserFromLocalStorage();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInLocalStorage(user);
        setUser(user);
        setLoggedIn(true);
        setLoading(false);
      } else {
        setUserInLocalStorage(null);
        setUser(null);
        setLoggedIn(false);
        setLoading(false);
      }
    });
  }, []);
  // store user in state
  const handleLoginState = (user) => {
    setUser(user);
    setUserInLocalStorage(user);
    setLoggedIn(true);
  };
  const login = (data) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        handleLoginState(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const googleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        handleLoginState(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
  };
  const logout = () => {
    const auth = getAuth();
    setUser(null);
    localStorage.removeItem('user');
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // return <Login login={login} googleLogin={googleLogin} />;
  if (loading) return <div>loading...</div>;
  if (!loggedIn) return <Login login={login} googleLogin={googleLogin} />;
  return <Home logout={logout} />;
}
