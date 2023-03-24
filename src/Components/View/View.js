import React,{useEffect,useState,useContext} from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';

import './View.css';
function View() {
  const[UserDetails,setUserDetails] =useState()
  const {PostDetails} =useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    const {UserId} =PostDetails
firebase.firestore().collection('users').where('id','==',UserId).get().then((result)=>{
  result.forEach(doc => {
    setUserDetails(doc.data())
    
  });
})
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={PostDetails.url}
          alt=""
        />
       
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {PostDetails.Price} </p>
          <span>{PostDetails.Name}</span>
          <p>{PostDetails.Category}</p>
          <span>{PostDetails.createdAt}</span>
        </div>

   {  UserDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{UserDetails.username}</p>
          <p>{UserDetails.phone}</p>
        </div>
     }  

      </div>
    </div>
  );
}
export default View;
