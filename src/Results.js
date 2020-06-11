// Import React packages
import React from 'react'
import { Link } from 'react-router-dom'

// Import styles
import './global.scss'
import './Results.scss'

// import npm packages
import wordcount from 'wordcount'
import ClipboardJS from 'clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCopy, faRedo, faBicycle } from '@fortawesome/free-solid-svg-icons'

// Import custom components and functions
import { calculateTimeRemaining } from './functions/calculateTimeRemaining.js'
import { timeToString } from './functions/timeToString.js'



const Results = props => {

    // eslint-disable-next-line
    const clipboard = new ClipboardJS('#button__copy-user-gen-text')

    // Calculate time elapsed writing
    const timeElapsed = calculateTimeRemaining(props.timeLimit ? props.timeLimit - props.timeRemaining.totalTime : 0)

    return(
        <div className="App Results">
            <div className="page-section">
                <Link to="/setup">
                <div className="button-group">
                    <button className="button">
                        <FontAwesomeIcon icon={ faRedo } />
                        Write again
                    </button>
                    <button className="button" onClick={() => {}}>
                        <FontAwesomeIcon icon={ faBicycle } />
                        Continue writing
                    </button>
                </div>
            </Link>
            </div>
            <div className="page-section">
                <h2 className="function-header">Results</h2>
                <p>Nice work! Here are your results:</p>
                <div className="counters">
                    <span className="counters__label">Time elapsed: {`${timeToString(timeElapsed.minutes)}:${timeToString(timeElapsed.seconds)}`} </span>
                    <span className="counters__label">Words written: {wordcount(props.text)}</span>
                </div>
            </div>
            <div className="page-section--full-width">
                <p>If you're done, you can save your writing...</p>
                <div className="button-group">
                    <button className="button">
                        <FontAwesomeIcon icon={ faDownload } /> 
                        Download as file
                    </button>
                    <button className="button" id="button__copy-user-gen-text" data-clipboard-target="#user-generated-text" onClick={ () => { /* TODO: Trigger tooltip */ } }>
                        <FontAwesomeIcon icon={ faCopy } />
                        Copy text
                    </button>
                </div>
            </div>
            <div className="page-section--full-width">
                <h3 style={{textAlign: 'left'}}>{ props.title ? props.title : '' }</h3>
                <div className="border-box">
                    {props.text ? <p id="user-generated-text" className="written-text">{props.text}</p> : <p className="background-text">You haven't written anything.</p> }
                </div>
                {/*Alternative: <textarea id="user-gen-text" className="textbox written-text" readOnly value={ props.text ? props.text : "You haven't written anything." } />*/}
            </div>
        </div>   
    )
}

export default Results