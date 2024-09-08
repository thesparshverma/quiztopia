import React, { useContext , useEffect, useState } from "react";
import AnswerContext from "../contexts/AnswerContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Result(){
    const temp = useContext(AnswerContext);
    const questions = temp.Questions;
    const answers = temp.Answers;
    const params = useParams();
    const navigate = useNavigate();
    const [score,setScore] = useState(0);

    useEffect(()=>{
        let c=0;
        for(let i=0 ; i<questions.length ; i++){
            if(questions[i].ans===answers[i]) c++;
        }
        setScore(c);
        console.log(questions);
        console.log(answers);
    },[questions,answers])

    const style1 = {
        border: "2px solid #293264",
        borderRadius: "8px",
        width: "20vw",
        margin: "0 2vw 0",
        color: "#293264",
        height: "50px",
        fontSize: "18px",
        backgroundColor: "#F5F7FB"
    }

    const style2 = {
        border: "none",
        borderRadius: "8px",
        width: "20vw",
        margin: "0 2vw 0",
        color: "#293264",
        height: "50px",
        fontSize: "18px",
        backgroundColor: "#94D7A2"
    }

    const style3 = {
        border: "none",
        borderRadius: "8px",
        width: "20vw",
        margin: "0 2vw 0",
        color: "#293264",
        height: "50px",
        fontSize: "18px",
        backgroundColor: "#F8BCBC"
    }

    function customStyle(opt,id){
        if(questions[id].ans===opt) return style2;
        else if(answers[id]===opt) return style3;
        else return style1;
    }

    return (
        <div>
            <div className="result">
                <h1>Your final score is: {score}</h1>
                {questions.map((e,i)=>{
                    return(
                        <div key={i}>
                            <p>Q: {e.q}</p>
                            <button name="A" style={customStyle("A",i)}>
                                {`A) ${e.a}`}</button>
                            <button name="B" style={customStyle("B",i)}>
                                {`B) ${e.b}`}</button>
                            <button name="C" style={customStyle("C",i)}>
                                {`C) ${e.c}`}</button>
                            <button name="D" style={customStyle("D",i)}>
                                {`D) ${e.d}`}</button><br /><br /><br />
                        </div>
                    )
                })}
            </div>
            <div className="result-footer">
                <button onClick={()=>{navigate(`/quiz/${params.quizID}`)}}>Try Again</button>
                <button onClick={()=>navigate(-1)}>Go Back</button>
            </div>
        </div>
    )
}