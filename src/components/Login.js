import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'
let name = '';

const Login = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [socket,setSocket]=useState();
  const navigate = useNavigate();
  useEffect(()=>{
    const socketserver= io.connect('http://localhost:5000');
    setSocket(socketserver);
    return ()=>{
       socketserver.disconnect();
    }
 },[])
 console.log(socket)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const handleCheck =(user)=>{
        console.log(user)
        if (user.Uid === data.name && user.email === data.email && user.password === data.password) {
          alert('Login Successful');
          navigate(`/home/${data.name}`);
           // Update the name variable
        } else {
          alert('Invalid Credentials');
        }
      }
      if(socket=== null) return;
      socket&& socket.emit("send_user",data);
      console.log("success")
      socket && socket.on("get_user",handleCheck)
       return ()=>{
        socket&&socket.off("get_user",handleCheck);
       }
    } catch (error) {
      console.log(error);
     
    }

  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  


  return (
    <div className="h-screen flex justify-center items-center bg-red-200 imglogin">
      <form
        className="flex flex-col items-center justify-around bg-gradient-to-tr from-stone-600 to-slate-500  h-1/2 shadow-xl rounded-xl py-7"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-lime-900">LOG IN</h1>
        <div  className="flex flex-col justify-around h-10 px-9" >
          <label>UserName : </label>
          <input type="text" className="focus:outline-none " name="name" onChange={handleChange} required />
        </div>
        <div  className="flex flex-col justify-around h-10 px-9">
          <label>email : </label>
          <input type="email" className="focus:outline-none" name="email" onChange={handleChange} required />
        </div>
        <div  className="flex flex-col justify-around h-10 px-9">
          <label>Password : </label>
          <input type="password" className="focus:outline-none" name="password" onChange={handleChange} required />
        </div>
        <button className="bg-red-400 p-2 rounded-md transition hover:scale-125">Log in</button>
      </form>
    </div>
  );
};

console.log(name);

const LoginName = (nam) => {
  name=nam;
  return name;
};

export default Login;
export { LoginName, name };
