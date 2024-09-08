import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import UserContext from "../contexts/UserContext";
import WaitingScreen from "./WaitingScreen";

export default function Login(){
    const [info,setInfo] = useState({username:"",email:"",password:""});
    const navigate = useNavigate();
    const a = useContext(UserContext);
    const [show,setshow] = useState(false);

    function handleChange(event){
        const {name,value} = event.target;
        setInfo((prev)=>({...prev,[name]:value}));
    }
    function login(event){
        event.preventDefault();
        setshow(true);
        console.log("true");
        Axios.post("http://localhost:5000/login",{
            Email:info.email,
            Password:info.password
        }).then(res=>{
            setshow(false);
            console.log("false");
            if(res.data.error===true){
                alert("Error! Incorrect Username and/or Password. Please try again");
            }
            else{
                const path="/users/"+res.data.result.username;
                a.setState(()=>({...res.data.result,logged:true}));
                navigate(path);
            }
        })
    }

    return (
        <form className="form">
            {show && <WaitingScreen />}
            <div className="inputs">
                <label htmlFor="email">Username/Email: </label>
                <input 
                    id="email"
                    type="text" 
                    name="email" 
                    value={info.email} 
                    onChange={handleChange}
                    required
                    autoComplete="off"
                /><br />
                <label htmlFor="password">Password: </label>
                <input 
                    id="password"
                    type="password" 
                    name="password" 
                    value={info.password} 
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />
            </div><br />
            <button onClick={login}>Login</button>
        </form>
    )
}