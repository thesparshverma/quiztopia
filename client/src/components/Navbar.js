import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Navbar(props){
    const navigate = useNavigate();
    const a = useContext(UserContext);

    function handleClick(){
        a.setState((prev)=>({...prev,logged:false}))
        navigate("/",{replace:true})
    }

    return (
        <nav className="nav">
            <h1>QuizTopia</h1>
            {!a.state.logged && <p><a className="login-link" href="/login">Login</a>/
            <a className="signup-link" href="/register">Register</a></p>}
            {a.state.logged && <button onClick={handleClick}>Log Out</button>}
        </nav>
    )
}