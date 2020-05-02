// Import React packages
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Import styling
import './global.scss'
import './Writing.scss'

// Import npm packages
import wordcount from 'wordcount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

// Import custom components and functions
import WritingArea from './components/Writing/WritingArea.js'
import WritingLabels from './components/Writing/WritingLabels.js'
import { calculateTimeRemaining } from './functions/calculateTimeRemaining.js'



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
      <div className="page-section">
        <h2>Start writing</h2>
      </div>
      <div className="page-section--full-width">
        <h3>{props.title}</h3>
        <WritingArea text={props.text} setText={props.setText} wordLimit={props.wordLimit}></WritingArea>
      </div>
      <div className="page-section">
        <WritingLabels wordLimit={props.wordLimit} wordCount={wordCount} timeRemaining={timeRemaining} ></WritingLabels>
        <button className="button" onClick={() => setTimerIsRunning(!timerIsRunning)}>
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
      <div className="page-section">
        <div className="button-group">
          <Link to="/" className="button">
            Cancel
          </Link>
          <Link to="/results" className="button">
            Finish
          </Link>
        </div>
      </div>
      
    </div>
  );
}

export default Writing;
