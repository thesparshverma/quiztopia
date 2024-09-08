import React, { useState } from "react";

export default function CreateArea(props){
    const [q,setq] = useState("");
    const [a,seta] = useState("");
    const [b,setb] = useState("");
    const [c,setc] = useState("");
    const [d,setd] = useState("");
    const [ans,setans] = useState("");
    const [h,seth] = useState("00");
    const [m,setm] = useState("00");
    const [s,sets] = useState("00");

    function handleChange(event){
        const {id,value} = event.target;
        if(id==="q") setq(value)
        else if(id==="a") seta(value)
        else if(id==="b") setb(value)
        else if(id==="c") setc(value)
        else if(id==="d") setd(value)
        else setans(value)
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
                props.setTime(`${str.slice(-2)}:${m}:${s}`);
            }
        }
        else if(name==="mm"){
            if(isNaN(Number(value))) setm("00");
            else if(Number(value)>=60){}
            else if(Number(value)<0){}
            else {
                const str = `0${value}`;
                setm(str.slice(-2));
                props.setTime(`${h}:${str.slice(-2)}:${s}`);
            }
        }
        else{
            if(isNaN(Number(value))) sets("00");
            else if(Number(value)>=60){}
            else if(Number(value)<0){}
            else {
                const str = `0${value}`;
                sets(str.slice(-2));
                props.setTime(`${h}:${m}:${str.slice(-2)}`);
            }
        }
    }

    function addQuestion(){
        props.setQuestions(prev=>([...prev,{"q":q,"a":a,"b":b,"c":c,"d":d,"ans":ans}]))
        setq("");seta("");setb("");setc("");setd("");setans("");
    }

    return (
        <div className="create-area">
            <label htmlFor="q">Q: </label>
            <input id="q" onChange={handleChange} value={q} autoComplete="off"/> 
            <label htmlFor="a">{"A)"}</label>
            <input id="a" onChange={handleChange} value={a} autoComplete="off"/>
            <label htmlFor="b">{"B)"}</label>
            <input id="b" onChange={handleChange} value={b} autoComplete="off"/>
            <label htmlFor="c">{"C)"}</label>
            <input id="c" onChange={handleChange} value={c} autoComplete="off"/>
            <label htmlFor="d">{"D)"}</label>
            <input id="d" onChange={handleChange} value={d} autoComplete="off"/>
            <label htmlFor="ans">ANS: </label>
            <input id="ans" onChange={handleChange} value={ans} autoComplete="off"/>
            <button onClick={addQuestion}>Add Question</button>
        </div>
    )
}