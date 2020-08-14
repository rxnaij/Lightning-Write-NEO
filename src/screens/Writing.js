// Import React packages
import React, { useState, useEffect } from 'react'
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

// Import styling
import './Writing.scss'


/* Writing screen
*/
const Writing = props => {

  /* State */
  const [ wordCount, setWordCount ] = useState(0)
  /* Initialize countdown timer. */
  const { timeRemaining, setTimeRemaining } = props
  const [ timerIsRunning, setTimerIsRunning ] = useState(true)

  const { text, setText } = props


  /* Clear textarea state on load. */
  useEffect(() => {
    setText('')
  }, [setText])

  /* Update word count when text is written. */
  useEffect(() => {
    setWordCount(wordcount(text))
  }, [text])

  /* Trigger a countdown timer. */
  useEffect(() => {
    let isMounted = true
    let timeout
    if (isMounted && timerIsRunning) {
      if (timeRemaining.totalTime > 0) {
        // const onTick = () => setTimeRemaining(calculateTimeRemaining(timeRemaining.totalTime - 1000))
        timeout = setTimeout(() => {
          setTimeRemaining(calculateTimeRemaining(timeRemaining.totalTime - 1000) )
        }, 1000)
      } else { // See if there's a way to get rid of the undefined
        setTimeRemaining({
          totalTime: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        })
      }
    } 
    return () => {
      if (timeout) clearTimeout(timeout)
      isMounted = false
    }
  }, [timerIsRunning, timeRemaining.totalTime, setTimeRemaining])
  



  /* Render component */
  return (
    <div className="App">
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
        <Link to="/results" className="button">
          Finish
        </Link>
      </nav>
      <div className="page-section">
        <button
          className="button align-center"
          onClick={() => setTimerIsRunning(!timerIsRunning)}
        >
          { 
            timerIsRunning 
            ? <>
                <FontAwesomeIcon icon={faPause} />
                Pause
              </>
            : <>
                <FontAwesomeIcon icon={faPlay} />
                Resume
              </>
          }
        </button>
      </div>
      <h2>{props.title ? props.title : 'New piece' }</h2>
      <div className="page-section">
        <WritingArea
          text={props.text}
          setText={props.setText}
          wordLimit={props.wordLimit}
          placeholder="Enter some text..."
        />
      </div>
    </div>
  );
}

export default Writing;
