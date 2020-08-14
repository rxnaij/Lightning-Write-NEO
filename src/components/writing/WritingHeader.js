import React from "react";
import { Link } from 'react-router-dom'

// Import npm packages
import wordcount from 'wordcount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Import custom components and functions
import DynamicLabel from '../components/writing/DynamicLabel'
import WritingArea from '../components/writing/WritingArea'
import { calculateTimeRemaining } from '../functions/calculateTimeRemaining'
import { timeToString } from '../functions/timeToString'

const WritingHeader = () => {
    return(
        <nav className="main-nav">
            <Link to="/">
                <FontAwesomeIcon icon={faArrowLeft} /> Back to home
            </Link>
            <DynamicLabel 
                name="Word count"
                type="counter"
                value={wordCount}
                target={props.wordLimit}
                display={ (x, y) => `${x} / ${y}` }
            />
            <DynamicLabel 
                name="Time limit"
                type="timer"
                value={timeRemaining.totalTime}
                target={0}
                display={`${timeToString(timeRemaining.minutes)}:${timeToString(timeRemaining.seconds)}`}
            />
            <button
                className="button align-center"
                onClick={() => setTimerIsRunning(!timerIsRunning)}
            >
                { 
                    timerIsRunning 
                    ?   <>
                            <FontAwesomeIcon icon={faPause} />
                            Pause
                        </>
                    :   <>
                            <FontAwesomeIcon icon={faPlay} />
                            Resume
                        </>
                }
                </button>
            <Link to="/results" className="button">
                Finish
            </Link>
      </nav>
    )
}

export default WritingHeader