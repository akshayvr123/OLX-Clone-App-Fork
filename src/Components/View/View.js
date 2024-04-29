import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';
import axios from "axios"

import './View.css';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const [generatedText, setGeneratedText] = useState('');
  const [prompt, setPrompt] = useState('');
  //Provide your api key
  const { firebase } = useContext(FirebaseContext);
  const [state, setState] = useState();
  const value = postDetails;

  if (value) {
    localStorage.setItem("Name", JSON.stringify(value));
  }

  const txt = JSON.parse(localStorage.getItem('Name'));
  console.log(txt);

  if (value) {
    localStorage.setItem("Nam", JSON.stringify(value.userId));
  }

  const val = JSON.parse(localStorage.getItem('Nam'));

  useEffect(() => {
    firebase.firestore().collection('user').where('id', '==', val).get().then((res) => {
      res.forEach(doc => {
        setUserDetails(doc.data());
      });
    });
  }, []);

  //openai
  const fetchData = async () => {
    // Set loading to true while fetching data
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: "What are the key feautures of "+prompt +"if you dont know it say it is new version",
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`, // Use the API_KEY variable
          },
        }
      );

      setGeneratedText(response.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
    }
  };

  const handleSubmit = () => {
    setPrompt(txt.name);
  };

  // Use useEffect to trigger fetchData when prompt changes
  useEffect(() => {
    if (prompt) {
      fetchData();
    }
  }, [prompt]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={txt.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {txt.price} </p>
          <span>{txt.name}</span>
          <p>{txt.category}</p>
          <span>Tue May 04 2021</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
        <div>
          <button className='generate_button' onClick={handleSubmit}>Generate features</button>
         {generatedText && <p className='generated_text'>{generatedText}</p>} 
        </div>
      </div>
    </div>
  );
}

export default View;
