import React, { useState } from "react";

const Profile = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [text,setText] = useState("")

    return (
        <>
            <h2 className="register">Enter your Profile datails:</h2>
            <div className="register">
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
                className="inputBox"  type="email" placeholder="Enter your email" />
                <textarea 
                onChange={(e)=> {
                    setText(e.target.value)
                }}
                value={text}
                rows="5" className="inputBox"  placeholder="Describe yourself"></textarea>
                <h2>{name}</h2>
                <h2>{email}</h2>
                <h2>{text}</h2>
            </div>
        </>
    )
} 

export default Profile;