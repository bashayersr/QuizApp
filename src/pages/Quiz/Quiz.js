import React , {useEffect, useState} from 'react'
import './Quiz.css'
import Questions from '../../components/Questions/Questions';
import CirclarProgress from './CirclarProgross/CirclarProgress';

function Quiz({name , questions , score , setScore ,setQuestions}) {
    const[options , setOptions]=useState();
    const[currQues,setCurrQues] =useState(0)
  useEffect(()=>{
    setOptions(
      questions && handleShuffle([
        questions[currQues]?.correct_answer,
        ...questions[currQues]?.incorrect_answers,
      ])
    );
  },[currQues , questions]);
  const handleShuffle=(options)=>{
    return options.sort(()=>Math.random()-0.5)
  };
  return (
    <div className="quiz">
        <span className='quiztitel'>Welcome {name}</span>

        {questions ?(
          <>
          <div className='quizinfo'>
              <span className='category'>Category: {questions[currQues].category}</span>
              <span>Score :{score}</span>
          </div>
          <Questions
          currQues={currQues}
          setCurrQues={setCurrQues}
          questions={questions}
          options={options}
          correct={questions[currQues]?.correct_answer}
          score={score}
          setScore={setScore}
          setQuestions={setQuestions}/>
          </>
          ) : (
            <CirclarProgress/>
            )}
    </div>
  );
}

export default Quiz
