import React, { useState } from 'react';
import './login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../firebase'; // Add 'firestore' import
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailRegistered, setEmailRegistered] = useState(true); // Assuming the email is registered initially

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(firestore, 'students', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // User document exists
        const userData = userDocSnapshot.data();
        console.log(userData);
        // Pass the user data to the home page
        navigate('/', { state: { userDetails: userData } });
      } else {
        // User document does not exist
        console.log('User data does not exist');
        setEmailRegistered(false);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className='login' id='login'>
      <div className='head'>
        <h1 className='company'></h1>
      </div>
      <p className='msg'>Welcome back</p>
      <div className='form'>
        <form onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='Email'
            className='text'
            id='username'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type='password'
            placeholder='••••••••••••••'
            className='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className='btn-login' id='do-login'>
            Login
          </button>
        </form>
        {error && emailRegistered && <span>Wrong email or password</span>}
        {!emailRegistered && (
          <div>
            <p>
              Email is not registered.{' '}
              <Link to='/register'>Click here to register</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
