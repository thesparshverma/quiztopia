import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import AnswerContext from "../contexts/AnswerContext";

export default function Quiz(){
    const params = useParams();
    const quizID = params.quizID;
    const [quiz,setQuiz] = useState({});
    const [questions,setQuestions] = useState([]);
    const [answers,setAnswers] = useState([]);
    const temp = useContext(AnswerContext);
    const navigate = useNavigate();
    const [time,setTime] = useState("00:00:10");
    const [flag,setflag] = useState(false);

    useEffect(()=>{
        Axios.post(`http://localhost:5000/quiz/${quizID}`)
        .then(res=>{
            setQuiz(res.data.quiz);
            setQuestions(res.data.questions);
            setAnswers(()=>new Array(res.data.questions.length).fill(""));
            setTime(res.data.quiz.time);
            setflag(true);
        })
        .catch(err=>{console.log(err)});
    },[])

    useEffect(()=>{
        if(flag===false) return;
        if(time!=="00:00:00"){
            setTimeout(()=>{setTime(dec())},1000);
        }
        else submit();
    },[time,flag])

    function dec(){
        const arr = time.split(":");
        let a = Number(arr[0]);
        let b = Number(arr[1]);
        let c = Number(arr[2]);
        if(c>0){
            c--;
        }
        else if(b>0){
            c=59;
            b--;
        }
        else{
            c=59;b=59;
            a--;
        }
        let ans="";
        if(a<10){
            ans+="0";
        }
        ans+=a.toString();
        ans+=":";
        if(b<10){
            ans+="0";
        }
        ans+=b.toString();
        ans+=":";
        if(c<10){
            ans+="0";
        }
        ans+=c.toString();
        return ans;
    }
    function submit(){
        temp.setAnswers(answers);
        temp.setQuestions(questions);
        navigate(`/result/${quizID}`,{replace:true});
    }
    function handleClick(id,event){
        setAnswers(()=>{
            return answers.map((e,i)=>{
                if(i===id) return event.target.name;
                else return e;
            })
        })
    }

    function customStyle(opt,id){
        if(answers[id]===opt) return {
            backgroundColor:"#D6DBF5",
            border: "2px none",
            borderRadius: "8px",
            width: "20vw",
            margin: "0 2vw 0",
            color: "#293264",
            height: "50px",
            fontSize: "18px"
        }
        else return {
            border: "2px solid #293264",
            borderRadius: "8px",
            width: "20vw",
            margin: "0 2vw 0",
            color: "#293264",
            height: "50px",
            fontSize: "18px",
            backgroundColor: "#F5F7FB"
        };
    }

    return (
        <div>
            <div className="timer"><h2>{time}</h2></div>
            <div className="quiz-body">
                <h1>{quiz.title}</h1>
                {questions.map((e,i)=>{
                    return(
                        <div key={i}>
                            <p>Q: {e.q}</p>
                            <button name="A" onClick={(event)=>handleClick(i,event)} style={customStyle("A",i)}>
                                {`A) ${e.a}`}</button>
                            <button name="B" onClick={(event)=>handleClick(i,event)} style={customStyle("B",i)}>
                                {`B) ${e.b}`}</button>
                            <button name="C" onClick={(event)=>handleClick(i,event)} style={customStyle("C",i)}>
                                {`C) ${e.c}`}</button>
                            <button name="D" onClick={(event)=>handleClick(i,event)} style={customStyle("D",i)}>
                                {`D) ${e.d}`}</button><br /><br /><br />
                        </div>
                    )
                })}
            </div>
            <div className="quiz-footer">
                <button onClick={submit}>Submit</button>
            </div>
        </div>
    )
}
