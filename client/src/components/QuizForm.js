import React, { useContext, useState } from "react";
import CreateArea from "./CreateArea";
import Axios from "axios";
import UserContext from "../contexts/UserContext";

export default function QuizForm(props){
    const [questions,setQuestions] = useState([]);
    const [title,setTitle] = useState("");
    const [time,setTime] = useState("00:00:00");
    const [h,seth] = useState("00");
    const [m,setm] = useState("00");
    const [s,sets] = useState("00");
    const a = useContext(UserContext);

    function Cancel(){
        props.setForm(false);
    }
    function Create(){
        Axios.post("http://localhost:5000/quiz",{
            userID:a.state._id,
            "title":title,
            "questions":questions,
            "time":time
        }).then(res=>{
            props.setQuizzes(prev=>[...prev,res.data]);
            props.setForm(false);
        }).catch(err=>{console.log(err)});
    }
    function Delete(id){
        setQuestions(()=>{
            return questions.filter((e,i)=>{
                return id!==i;
            })
        })
    }
    function handleChange(event){
        setTitle(event.target.value);
    }
    function changeTime(event){
        const {name,value} = event.target;
        if(name==="hh"){
            if(isNaN(Number(value))) seth("00");
            else if(Number(value)>=24){}
            else if(Number(value)<0){}
            else {
                const str = `0${value}`;
                seth(str.slice(-2));
                setTime(`${str.slice(-2)}:${m}:${s}`);
            }
        }
        else if(name==="mm"){
            if(isNaN(Number(value))) setm("00");
            else if(Number(value)>=60){}
            else if(Number(value)<0){}
            else {
                const str = `0${value}`;
                setm(str.slice(-2));
                setTime(`${h}:${str.slice(-2)}:${s}`);
            }
        }
        else{
            if(isNaN(Number(value))) sets("00");
            else if(Number(value)>=60){}
            else if(Number(value)<0){}
            else {
                const str = `0${value}`;
                sets(str.slice(-2));
                setTime(`${h}:${m}:${str.slice(-2)}`);
            }
        }
    }

    return (
        <div className="quiz-form">
            <label htmlFor="title">Title: </label>
            <input id="title" onChange={handleChange} value={title}/>
            <label htmlFor="hh">HH</label><input name="hh" id="hh" value={h} onChange={changeTime} />
            <label htmlFor="mm">MM</label><input name="mm" id="mm" value={m} onChange={changeTime} />
            <label htmlFor="ss">SS</label><input name="ss" id="ss" value={s} onChange={changeTime} />
            <CreateArea setQuestions={setQuestions} setTime={setTime}/>
            {questions.map((e,i)=>{
                return <Question 
                    key={i}
                    id={i}
                    q={e.q}
                    a={e.a}
                    b={e.b}
                    c={e.c}
                    d={e.d}
                    ans={e.ans}
                    Delete = {Delete}
                />
            })}
            <div className="quiz-form-btn">
                <button className="quiz-btn" onClick={Create}>Create</button>
                <button className="quiz-btn" onClick={Cancel}>Cancel</button>
            </div>
        </div>
    )
}

function Question(props){
    function handleClick(){
        props.Delete(props.id);
    }

    return (
    <div className="question">
        Q: {props.q}<button onClick={handleClick}>Delete</button><br />
        {"A)"} {props.a}<br />
        {"B)"} {props.b}<br />
        {"C)"} {props.c}<br />
        {"D)"} {props.d}<br />
        ANS: {props.ans}<br /><br />
    </div>
    )
}