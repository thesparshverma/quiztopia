import React, { useContext, useEffect, useState } from "react";
import MyQuizzes from "./MyQuizzes";
import SearchQuiz from "./SearchQuiz";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Axios from "axios";

export default function User(){
    const [choice,setChoice] = useState(1);
    const navigate = useNavigate();
    const a = useContext(UserContext);
    const params = useParams();

    useEffect(()=>{
        if(a.state.username!==params.userID) navigate("/");
    },[])

    function random(){
        Axios.get("http://localhost:5000/random")
        .then(res=>{
            navigate(`/quiz/${res.data}`);
        })
        .catch(err=>console.log(err));
    }
    
    return (
        <div className="user">
            <div className="buttons">
                <button onClick={()=>{setChoice(1)}} >My Quizzes</button>
                <button onClick={()=>{setChoice(2)}} >Search for a Quiz</button>
                <button onClick={random} >Give a random Quiz</button>
            </div>
            {choice===1 && <MyQuizzes />}
            {choice===2 && <SearchQuiz />}
        </div>
    )
}