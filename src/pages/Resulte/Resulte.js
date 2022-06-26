import React ,{useEffect}from 'react'
import {useNavigate} from 'react-router-dom'
import './Resulte.css'
function Resulte({name,score}) {

  const navigate=useNavigate();
  useEffect(
    ()=>{
      if(!name){
        navigate('/result')
      }
    },[name , navigate])
    const handleAgine=()=>{
      navigate('/')
    }
  return (
    <div className='result'>
        <span className='result-title'>Final Score: {score}</span>
        <button onClick={handleAgine}>Go to homepage</button>
    </div>
  )
}

export default Resulte
