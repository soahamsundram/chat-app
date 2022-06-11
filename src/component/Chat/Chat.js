import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from '../Message/Message';
import sendBtn from "../../images/send.png";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";



let socket;
const ENDPOINT ="https://soaham-chat-app.herokuapp.com/";    

const Chat = () => {
     
 
  const [id,setid]= useState("");
  const [msg,setmsg] =useState([])
  const send = ()=>{
    const message = document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value="";
  }
   

    useEffect(()=>{
      
      socket = socketIo(ENDPOINT, {transports: ['websocket']});
    socket.on("connect",()=>{
        alert("Connected");
        setid(socket.id);
    } )
    
    socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
        setmsg([...msg,data]);
        console.log(data.user,data.message);
    })

    socket.on('userJoined',(data)=>{
      setmsg([...msg,data]);
        console.log(data.user,data.message)
    })
    socket.on('leave',(data)=>{
      setmsg([...msg,data]);
        console.log(data.user,data.message)
    })

    return ()=>{
      
        socket.emit('disconnect');
        console.log("aaya");
        socket.off();
    }
//  eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

   useEffect(()=>{
     socket.on('sendMessage',(data)=>{
      setmsg([...msg,data]);
       console.log(data.user,data.message,data.id);
     })
     return()=>{
      socket.off();
     }
   },[msg])
  
  return (

    <div className="chatPage">
      <div className="chatContainer">
        
        <div className="header" > 
          <h2>C CHAT</h2>
         <a href="/"><img src={closeIcon} alt="Close" /> </a> 
        </div>
        <ReactScrollToBottom className="chatBox">
          {msg.map((item,i)=> <Message user={item.id===id ? '':item.user} message={item.message} classs={item.id===id? "right":"left" } />)}
          
        </ReactScrollToBottom>
        <div className="inputBox">
            <input onKeyPress={(event)=> event.key==='Enter'&&send()} type="text" name="" autoComplete='off' id="chatInput" />
            <button onClick={send} className="sendBtn"><img src={sendBtn} alt="Send" /></button>
        </div>
      </div>
    </div>
  )
}

export default Chat
