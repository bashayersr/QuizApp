import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
import './Question.css'
function Questions({currQues,setCurrQues,questions,setQuestions,options,correct,score,setScore}) {
    const[selected , setSelected]=useState();
    const[error , setError]=useState(false);

    const navigate=useNavigate()
    const handleSelected=(i)=>{
        if(selected===i && selected===correct){
            return 'selected';
        }else if(selected===i && selected!==correct){
                return 'wrong';
        }else if(i===correct){
            return 'selected';
        }
    }
    
    const handleCheck=(i)=>{
        setSelected(i)
        if(i===correct){
            setScore(score+1)
        }
        setError(false)
    }

    const handleNext=()=>{
        if(currQues>8){
            navigate('/result')
        }else if(selected){
            setCurrQues(currQues+1)
            setSelected()
        }else{
            setError("Please select an option first")
        }
    }
    const handleQuit=()=>{
            setCurrQues(0)
            setQuestions();
            setScore(0)
    }
    const error_="Please Fill all the feiled"
    return (
    <div className="question">
        <h1 style={{color:'white'}}>Question {currQues +1}</h1>
        <div className="oneQuestion">
            <h1>{questions[currQues].question}</h1>
            <div className='options'>
                {error && <div className="eror">{error_}</div>}
                {options && options.map((i)=>(
                    <button onClick={()=>handleCheck(i)} 
                    className={`oneOption ${selected && handleSelected(i)}`} 
                    key={i} 
                    disable={selected}
                    >{i}</button>))}
            </div>
            <div className='controles'>
                <button onClick={handleQuit} className="button1">Quit</button>
                <button onClick={handleNext} className="button2">{currQues>20 ? "Submit" : "Next Question"}</button>
            </div>
        </div>
    </div>
  )
}

export default Questions
