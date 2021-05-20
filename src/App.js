import React, {useState} from 'react';
import {Home} from "./components/Home";
import Quiz from './components/Quiz';
import {BrowserRouter, Route} from 'react-router-dom'
import Results from "./components/Results";
import quizData from './questions.json';


function App() {

  const [activeQuestion, setActiveQuestion] =  useState(1);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState ({});


  return (
    <div className="App">

    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>

      <Route path="/quiz" ><Quiz  
      data={quizData.data[activeQuestion]}
      time = {time}
      setTime = {setTime}
      setAnswers={setAnswers}
      numberOfQuestions={quizData.data.length}
      activeQuestion={activeQuestion}
      setActiveQuestion={setActiveQuestion}/></Route> 

      <Route path="/results"> <Results
      results = {answers}
      data = {quizData.data}
      setAnswers={setAnswers}
      setActiveQuestion={setActiveQuestion}
      /></Route>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
