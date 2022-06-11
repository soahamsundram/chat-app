import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png"
import {Link} from "react-router-dom";


var user="";

function Join() {

  const [name,setname] = useState("");

function handleChange(event){
    setname(event.target.value);
    // console.log("aaya");
    // console.log(event);
    console.log(name);
}

function handleClick(event){
  user=name;
  if(user==="") event.preventDefault();
}

  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={logo} alt="" />
        <h1>C CHAT</h1>
        <input type="text" onChange={handleChange} name="" id="joininput"  placeholder='Enter Your Name'/>

        <Link onClick={handleClick} to="./chat"> <button className='joinbtn'>Login</button></Link>
       
      </div>
    </div>
  )
}

export default Join
export {user}