import React, { useState } from "react";
import AnswerContext from "./AnswerContext";

const AnswerState = (props)=>{
    const [Answers,setAnswers] = useState([]);
    const [Questions,setQuestions] = useState([]);

    return (
        <AnswerContext.Provider value={{Answers,setAnswers,Questions,setQuestions}}>
            {props.children}
        </AnswerContext.Provider>
    )
}

export default AnswerState;