import React, {Fragment, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

const Results = ({results, data, setAnswers, setActiveQuestion })=>{
  
    const[correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(()=>{
        let correct = 0;
        results.forEach((val, index) =>{
            if(val.a === data[index + 1].answer){
                correct++;
            }
        })
        setCorrectAnswers(correct);
        //eslint-disable-next-line
    },[]);

    const tryAgain = () =>{
        setActiveQuestion(1);
        setAnswers([]);
    }
    const exit = () =>{
        setActiveQuestion(1);
        setAnswers([]);
    }

    return(
        <Fragment>
        <Helmet><title>Results Page</title></Helmet>
        <div className="results-container">
        <div className="results">
            <h1 className="results-header">Results</h1>
            <p className="score">You scored {correctAnswers} of {data.length-1}</p>
            <div className="bottom-div">
                <Link to="/quiz">
                <button className="tryagain-button" onClick={tryAgain}>Try Again</button>
                </Link>
                <Link to="/">
                <button className="exit-button" onClick={exit}>exit</button>
                </Link>
            </div>
        </div>
        </div>
        </Fragment>
    )
}
export default Results;