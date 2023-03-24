import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';

import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const[Email,setEmail]=useState('')
  const[Password,setPassword]=useState('')
  const {firebase} =useContext(FirebaseContext)
  const navigate =useNavigate()

  const handleLogin = (e)=>{
      e.preventDefault()
      firebase.auth().signInWithEmailAndPassword(Email,Password).then(()=>{
        navigate("/")
        // alert('Logged In')
      }).catch((error)=>{
        alert(error.message)
      })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={Email}
            onChange={(e)=>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
