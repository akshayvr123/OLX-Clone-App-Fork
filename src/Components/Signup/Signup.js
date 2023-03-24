import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import './Signup.css';

export default function Signup() {
  const navigate =useNavigate()

  const [Username,setUsername] = useState('')
  const [Email,setEmail] = useState('')
  const [Phone,setPhone] = useState('')
  const [Password,setPassword] = useState('')
const {firebase } = useContext(FirebaseContext) 
  const handleSubmit = (e)=>{
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(Email,Password).then((result)=>{
      result.user.updateProfile({displayName:Username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:Username,
          phone:Phone
        }).then(()=>{
          navigate('/login')
        })
      })
    })
  }
  
    return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={Username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={Email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={Phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
