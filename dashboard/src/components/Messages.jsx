import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const {isAuthenticated}=useContext(Context);

  useEffect(()=>{
    const fetchMessages=async() =>{ //Get all meses so get data by using useEffect to get all temmporary data
      try{
        const {data}=await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          {withCredentials: true}
        );
        setMessages(data.messages);
      }
      catch(error){
        console.log(error.respnse.data.message);
      }

    };
    fetchMessages();
  },[]); //When page will refreshed fetch the messages by useEffect

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>;
    
  }


  return (
    <section className='page messages'>
      <h1>MESSAGE</h1>
      <div className='banner'>
        {messages && messages.length>0 ? (messages.map((element)=>
        {
          return(
            <div className='card' key={element._id}>
              <div className='details'>
                <p>
                  First Name: <span>{element.firstName}</span>
                </p>
                <p>
                  Last Name: <span>{element.lastName}</span>
                </p>
                <p>
                  Email: <span>{element.email}</span>
                </p>
                <p>Phone: <span>{element.phone}</span>
                </p>
                <p>
                  Message: <span>{element.message}</span>
                </p>


              </div>
            </div>
          )
        })
      ):(
        <h1>No Messages!</h1>
      )}

      </div>
    </section>
  )
}

export default Messages