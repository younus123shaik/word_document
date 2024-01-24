import React, { useEffect, useState } from "react";
import {io} from 'socket.io-client'
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [user, setUser] = React.useState({
    "name": "",
    "email": "",
    "password": ""
  });
  const [conformpassword,setConformpassword]=useState("");
  const navigate=useNavigate();
  const [socket,setSocket]= useState();
  useEffect(()=>{
     const socketserver= io.connect('http://localhost:5000');
     setSocket(socketserver);
     return ()=>{
        socketserver.disconnect();
     }
  },[])
  const handleSubmit= async(e)=>{
  if (user.password===conformpassword) {
      e.preventDefault();
      try {
        if(socket=== null) return;
       socket && socket.emit("add_user",user)
        console.log("success")
        
      } catch (error) {
        console.log("am error")
    }
        
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("password", user.password);
        alert("Account Created Successfully");
      navigate("/login", { replace: true });
    }
    
   else {
     e.preventDefault();
    alert("Password Missmatching");
  }}
  const handleChange= (e)=>{
    const {name,value}= e.target;
    setUser((pre)=>({...pre,[name]:value}));

  }
  console.log(conformpassword)
  return (
    <div className="h-screen flex justify-center items-center bg-green-200 imgsign  bg-opacity-50 ">
     
        <form className="flex flex-col items-center justify-around bg-transparent  bg-gradient-to-tr from-slate-600 to-gray-300 h-1/2 shadow-xl rounded-xl  " onSubmit={handleSubmit}>
        <h1 className="text-2xl text-lime-900">SIGN UP</h1>
          
        <div className="flex flex-col justify-around h-10 px-9">
          <label>Name : </label>
          <input type="text" className="focus:outline-none " name="name" onChange={handleChange} required/>
        </div>
        <div className="flex flex-col justify-around h-10">
          <label>Email : </label>
          <input type="email" className="focus:outline-none" name="email" onChange={handleChange} required/>
        </div>
        <div className="flex flex-col justify-around h-10">
          <label>Password : </label>
          <input type="password" className="focus:outline-none" name="password" onChange={handleChange} required/>
        </div>
        <div className="flex flex-col justify-around h-10">
          <label >Conform Password : </label>
          <input type="password" className="focus:outline-none" required onChange={(e)=>setConformpassword(e.target.value)}/>
        </div>
        <button className="bg-red-400 p-2 rounded-md transition hover:scale-110">Create Account</button>
        </form>
      </div>
    
  );
};

export default Register;
