import React, { Fragment } from 'react';
import {Helmet} from 'react-helmet';
import {useState, useEffect, useRef} from 'react';
import {Link, useHistory} from 'react-router-dom';

const Quiz = ({data,time, setTime, setAnswers, numberOfQuestions, activeQuestion, setActiveQuestion}) =>{
    
    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    const radiosWrapper = useRef();
    const history = useHistory();

    useEffect(() => {
            let interval = null;
            const countDownTime = Date.now() + 120000;
            interval = setInterval(()=>{
                const now = new Date();
                const total = countDownTime - now;

                const minutes = Math.floor((total % (1000 *60 *60))/(1000*60));
                const seconds = Math.floor((total % (1000 * 60)) / 1000);

                if(total < 0 && window.location.href === "http://localhost:3000/quiz"){
                    clearInterval(interval);
                    setTime({minutes: 0, seconds: 0})
                    alert("Time's up !! The quiz has ended");
                    history.push('/');
                    setActiveQuestion(1);
                    setAnswers([]);
                } else if (window.location.href === "http://localhost:3000/" || window.location.href === "http://localhost:3000/results" ){
                    clearInterval(interval);
                    setTime({minutes: 0, seconds: 0})
                }
                else{
                    setTime({
                        minutes,
                        seconds
                    })
                }   
            })
            //eslint-disable-next-line
        },[])
    useEffect(()=>{
        const checkedInput = radiosWrapper.current.querySelector('input:checked');
        if(checkedInput){
            checkedInput.checked = false;
        } 
    },[data])
    const changeHandler = (e) =>{
            setSelected(e.target.value);
            if(error){
                setError('');
            }
    }
    const nextClick = (e)=>{
        if(selected === ''){
            return setError('Please select one option');
        }
        setAnswers(prevState => [...prevState, {q: data.question, a:selected}])
        setSelected('')
        if(activeQuestion < numberOfQuestions -1){
            setActiveQuestion(activeQuestion +1);
        }
    }
    const prevClick = (e)=>{
        setSelected('');
        if(activeQuestion < numberOfQuestions -1){
            (activeQuestion === 1)? setActiveQuestion(activeQuestion) :  setActiveQuestion(activeQuestion -1);
        }
    }

    const quitButton = () =>{
        setActiveQuestion(1);
        setAnswers([]);
        
    }
    return(
            <Fragment >
                <Helmet><title>Quiz Page</title></Helmet>
                <div className="questions-container">
                <section className = 'questions'>
                <h1 className="quiz-header">Quiz Mode</h1>
                    <div className="time-container">
                            <span className="left">{activeQuestion} of 10</span>
                            <span className="right">time left: {time.minutes}:{(time.seconds)>=10?(time.seconds):"0"+(time.seconds)}</span>
                    </div>
                <h3 className="quiz-question">{activeQuestion}. {data.question}</h3>
                <div className="options-container" ref={radiosWrapper}>
                    {
                        data.choices.map((val, i)=>(
                            <label className="rad-label" key={i}>
                                <input type="radio" className = "rad-input" 
                                name="answer" value={val} onChange={changeHandler}/> 
                                <div className="rad-design"></div>
                                <div className="rad-text">{val} </div><br/>
                            </label>
                        ))
                    }
                </div>
                <div className="error-div">{error}</div>
                <div className="bottom-container">
                    <button className="previous-button" onClick={prevClick}>Previous</button>
                    {activeQuestion < numberOfQuestions -1 && 
                    <button className="next-button" onClick={nextClick} >Next</button>
                    }
                    {activeQuestion === numberOfQuestions -1 && 
                    <Link  to="/results">
                    <button className ="submit-button" onClick={nextClick} >
                    Submit</button></Link>
                    }  
                    <Link to="/">
                    <button className="quit-button" onClick={quitButton} >Quit</button>
                    </Link>
                    
                </div>
                </section>
                </div>
            </Fragment>
    )
}

export default Quiz;