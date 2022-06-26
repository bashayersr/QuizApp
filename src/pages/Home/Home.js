import React , {useEffect , useState } from 'react'
import './Home.css'
import {useNavigate} from 'react-router-dom';

function Home({name , setName , fetchQuestions}) {
    const [options , setOptions]=useState(null);
    const[questionCategory , setquestionCategory]=useState("");
    const [questionDifficulty, setQuestionDifficulty] = useState("");
    const [error , setError] = useState("");

    const navigate=useNavigate()

    useEffect(
        ()=>{
            const apiUrl=`https://opentdb.com/api_category.php`;
            fetch(apiUrl)
            .then((res)=>res.json())
            .then((response)=>{
                setOptions(response.trivia_categories)
            });
        },[setOptions]);

        const handleQuestionChange=(event) => {
            setquestionCategory(event.target.value);
        }

        const handleDifficultyChange=(event) => {
            setQuestionDifficulty(event.target.value);
        }
        const handleNameChange=(event) => {
            setName(event.target.value);
        }
        const handleSubmit=()=>{
            if(!questionCategory || !questionDifficulty ||!name){
                setError(true);
                return;
            }else{
                setError(false);
                fetchQuestions(questionCategory , questionDifficulty);
                navigate("/quiz")
            }
        }
        return (
            <div className='home'>
                <h3 className='title'>Quiz Setting</h3>
                {error && <p className='err'>Please Fill all the feiled</p>}
                <div className="input">
                <input value={name} onChange={handleNameChange} placeholder="Enter Your Name"/>
                </div>
                <div className="home-category">
                    <h2>Select Category:</h2>
                    <select value={questionCategory} onChange={handleQuestionChange} className="select-category">
                            <option>All</option>
                            {options &&
                                options.map((option)=>(
                                    <option value={option.id} key={option.id}>
                                            {option.name}
                                    </option>
                                ))}
                    </select>
                </div>

                <div className="difficulty">
                    <h2>Select Difficulty:</h2>
                    <select value={questionDifficulty} onChange={handleDifficultyChange} className="select-difficulty">
                        <option value="easy" key="difficulty-1">Easy</option>
                        <option value="medium" key="difficulty-2">Medium</option>
                        <option value="hard" key="difficulty-3">Hard</option>
                    </select>
                </div>
                <button onClick={handleSubmit} className="home-button">Start Quiz</button>
            </div>
            )
}

export default Home
