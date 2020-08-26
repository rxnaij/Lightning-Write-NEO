// Import React packages
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Import npm packages
import wordcount from 'wordcount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Import custom components and functions
import Button from '../components/button/button'
import DynamicLabel from '../components/dynamic-label/DynamicLabel'
import WritingArea from '../components/writing/WritingArea'
import {
  toMinutes,
  toSeconds,
  timeToString
} from '../functions/calculateTimeRemaining'

// Import styling
import './Writing.scss'


/* 
 * Writing screen
 */
const Writing = props => {

  /* State */
  const [ wordCount, setWordCount ] = useState(0)
  /* Initialize countdown timer. */
  const [ timerIsRunning, setTimerIsRunning ] = useState(true)

  const { timeLimit, timeElapsed, setTimeElapsed } = props
  const { text, setText } = props


  /* Clear textarea state on load. */
  useEffect(() => {
    setText('')
  }, [setText])

  /* Update word count when text is written. */
  useEffect(() => {
    setWordCount(wordcount(text))
  }, [text])

  /* 
   * Trigger countdown timer.
   * 
   * 
   */
  useEffect(() => {
    let isMounted = true
    let timeout
    if (isMounted && timerIsRunning) {
      if (timeLimit > 0) {
        timeout = setTimeout(() => {
          setTimeElapsed(timeElapsed + 1000)
        }, 1000)
      } else if (timeElapsed >= timeLimit ) {
        // setTimerIsRunning(false)
      }
    } 
    return () => {
      if (timeout) clearTimeout(timeout)
      isMounted = false
    }
  }, [timerIsRunning, timeElapsed, setTimeElapsed, timeLimit])
  


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
        {/** @todo rework the timer component to count up instead of counting down behind the scenes,
            while displaying a count-up on the front end. This addresses a bug where the 
            dynamic label can't map the target value correctly--since it's 0, it'll
            run into a division-by-zero error.
        */}
        <DynamicLabel 
          name="Time"
          type="timer"
          value={timeElapsed}
          target={timeLimit}
          display={ (time, target) => timeToString(toMinutes(time)) + ':' + timeToString(toSeconds(time)) }
        />
        <Button
          outline
          onClick={() => setTimerIsRunning(!timerIsRunning)}
        >
          <FontAwesomeIcon icon={timerIsRunning ? faPause : faPlay} />
          { timerIsRunning ? 'Pause' : 'Resume' }
        </Button>
        <Link to="/results" className="button">
          Finish
        </Link>
      </nav>
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
  )
}

export default Writing