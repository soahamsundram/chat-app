import React from "react";
import './App.css';
import { Route, Routes} from "react-router-dom";
import Join from "./component/Join/Join.js";
import Chat from "./component/Chat/Chat.js";
// import socketIO from "socket.io-client";

// const ENDPOINT ='http://localhost:4500/';

// const socket=socketIO(ENDPOINT, {transports :['websocket']});


function App() {


  // socket.on("connect", ()=> {

  // });

  return (
    <div className="App">
    
 
      <Routes>
      <Route  path="/" element={<Join />} >  </Route>
      <Route  path="/chat" element={<Chat />} ></Route>
      </Routes>

        
      
    </div>
  );
}

export default App;
