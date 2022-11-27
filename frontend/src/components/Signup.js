import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
    useEffect(()=> {
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate("/");
        }

    })

  const submitClick =async ()=> {
    console.warn(name,email,password);
    let result = await fetch("http://localhost:5000/register",{
      method:"Post",
      body:JSON.stringify({name,email,password}),
      headers: {
        "Content-Type":"application/json"
      }
    });
    result = await result.json()
    console.warn(result);
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    if(result) {
      navigate("/");
    }
  }

  return (
    <div className="register">
      <h1>Register</h1>
      <input 
      onChange={(e)=> {
        setName(e.target.value)
      }}
      value={name}
      className="inputBox" type="text" placeholder="Enter your name" />
      <input 
        onChange={(e)=> {
            setEmail(e.target.value)
          }}
          value={email}
      className="inputBox" type="email" placeholder="Enter your email" />
      <input
        onChange={(e)=> {
            setPassword(e.target.value)
          }}
          value={password}
        className="inputBox"
        type="password"
        placeholder="Enter your password"
      />
      <button onClick={submitClick} className="appButton" type="button">
        Sign up
      </button>
    </div>
  );
};

export default Signup;
