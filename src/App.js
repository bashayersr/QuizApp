import React , {useState} from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header'
import Home from './pages/Home/Home';
import Quiz from './pages/Quiz/Quiz';
import{BrowserRouter , Route , Routes} from 'react-router-dom'
import Resulte from './pages/Resulte/Resulte'

function App() {
  const[name , setName]=useState("");
  const[questions , setQuestions]=useState("");
  const[score , setScore]=useState(0);
  const fetchQuestions=async(questionCategory="", questionDifficulty="")=>{
      const {data}=await axios.get(`https://opentdb.com/api.php?amount=10${questionCategory && `&category=${questionCategory}`}${questionDifficulty && `&questionDifficulty=${questionDifficulty}`}&type=multiple`);
      setQuestions(data.results);
  };
  return (
    <BrowserRouter>
    <div className="App">
          <Header/>
          <Routes>
              <Route path='/' element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions}/>}/>
              <Route path='/quiz' 
              element={
                <Quiz
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                />}
                />
              <Route path='/result' element={<Resulte name={name} score={score}/>}/>
          </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;
