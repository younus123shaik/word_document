import React, { useState } from "react";
import Signup from "../components/Register";
import Login from "../components/Login";
import { Link, useNavigate } from "react-router-dom";

const UserAccout = () => {
  const [enable,setEnable]=useState(false)
  const nav = useNavigate();
  return (
    <div className="flex  flex-col items-center justify-stretch  bg-gray-200  ">
      <div className="imginner">

      <h1 className="text-white flex flex-col text-3xl shadow-lg p-10 bg-green-400 rounded-md">
        Welcome To Word Document{" "}
        <span className="text-sm text-orange-600 ">
          Sign up To Create Rich Document
        </span>
      </h1>
      {enable ?  <div className="shadow-md flex  justify-around text-white p-12">
          
          <Link to="/signup">
            <button className="p-2 transition hover:scale-125 text-blue-400">
              Sign up
            </button>{" "}
          </Link>
          <Link to="/login">
            <button className="border-r-gray-500 p-2 rounded-md transition hover:scale-125 text-red-400">
              Login
            </button>
          </Link>
          
          </div> :<button className="p-4 transition hover:scale-125 text-blue-400" onClick={()=>setEnable(true)}>Get Started</button> } 
       
      </div>
    </div>
  );
};

export default UserAccout;
