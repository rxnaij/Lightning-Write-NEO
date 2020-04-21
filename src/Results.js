import React from 'react'
import { Link } from 'react-router-dom'

import './global.scss'
import './Results.scss'

import wordcount from 'wordcount'

const Results = props => {
    return(
        <div className="App Results">
            <div className="page-section">
                <Link to="/setup">
                <button className="button">Write again</button>
            </Link>
            </div>
            <div className="page-section">
                <h2>Results</h2>
                <p>Here are your results:</p>
                <div className="counters">
                    <span className="counters__label">Time elapsed: </span>
                    <span className="counters__label">Words written: {wordcount(props.text)}</span>
                </div>
                
            </div>
            <div className="page-section">
                <div className="button-group">
                    <button className="button">Download as file</button>
                    <button className="button">Copy link</button>
                </div>
            </div>
            <div className="page-section">
                <p>
                    {props.text ? props.text : "Text goes here."}
                </p>
            </div>
        </div>   
    )
}

export default Results;