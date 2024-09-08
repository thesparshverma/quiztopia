import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchQuiz(){
    const [id,setId] = useState("");
    const navigate = useNavigate();

    function handleChange(event){
        setId(event.target.value);
    }

    function search(){
        Axios.post("http://localhost:5000/search",{quizID:id})
        .then(res=>{
            if(res.data.error===true) alert("Invalid Quiz ID. Please try again")
            else{
                navigate(`/quiz/${res.data.result._id}`);
            }
        }).catch(err=>console.log(err));
    }

    return (
        <div className="search">
            <h1>Search for a Quiz</h1>
            <input  value={id} onChange={handleChange}/>
            <button onClick={search}>Search</button>
        </div>
    )
}