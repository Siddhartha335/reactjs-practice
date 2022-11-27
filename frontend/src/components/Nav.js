import React, { useReducer } from "react";
import { Link,useNavigate } from "react-router-dom";

const Nav = ()=> {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout = ()=> {
           localStorage.clear();
           navigate("/signup");
    }

    return (
        <div className="nav-ul">
            <img src="https://whispering-reef-29535.herokuapp.com/images/Sid.png" alt="sid" className="logo"></img>
            <ul>
                {
                    auth ? 
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/add">Add products</Link></li>
                        <li><Link to="/update">Update Product</Link></li>
                        <li><Link to="/profile">Profiles</Link></li>
                        <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                    </> :
                    <ul className="nav-ul nav-right">
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                
                }
            </ul>
        </div>
    )
}

export default Nav;