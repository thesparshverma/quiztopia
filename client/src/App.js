import { useState } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar"; 
import User from "./components/User";
import UserState from "./contexts/UserState";
import AnswerState from "./contexts/AnswerState";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import './App.css';

function App() {
  const [logged,loggedfunc] = useState(false);

  return (
    <div className="App">
    <UserState>
    <AnswerState>
    <BrowserRouter>
      <Navbar logged={logged} lf={loggedfunc} />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login lf={loggedfunc} />}/>
        <Route path="/register" element={<Register lf={loggedfunc} />} />
        <Route path="/users/:userID" element={<User />} />
        <Route path="/quiz/:quizID" element={<Quiz />} />
        <Route path="/result/:quizID" element={<Result />} />
      </Routes>
    </BrowserRouter>
    </AnswerState>
    </UserState>
    </div>
  );
}

export default App;
