import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom'
const Home = () =>{
    return(
        <Fragment>
            <Helmet><title>Quiz-App - Home</title></Helmet>
        <div id='home'>
            <section className="home-container">
                <h1 className="home-header">Quiz App</h1>
                <div className="play-button-container" >
                    <Link className="play-button" to="/quiz">Play</Link>
                </div>
            </section>
        </div>
        </Fragment>
    )
}
export  {Home};