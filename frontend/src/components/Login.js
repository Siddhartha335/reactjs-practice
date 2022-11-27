import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login =()=> {

    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=> {
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate("/");
        }
    })

    const handleLogin = async ()=> {
        console.warn(email,password);
        let result = await fetch("http://localhost:5000/login",{
            method:"Post",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type" : "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth) {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/");
        } else {
            alert("Please enter valid credentials!");
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input 
            onChange={(e)=> {
                setEmail(e.target.value);
            }}
            value={email}
            className="inputBox" type="email" placeholder="Enter your email:" />
            <input 
            onChange={(e)=> {
                setPassword(e.target.value);
            }}
            value={password}
            className="inputBox" type="password" placeholder="Enter your password:" />
            <button 
            onClick={handleLogin}
            className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login;
