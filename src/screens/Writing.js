// Import React packages
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Import app state
import { useAppState, useAppReducer } from '../AppContext'

// Import npm packages
import wordcount from 'wordcount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Import custom components and functions
import Button from '../components/button/button'
import DynamicLabel from '../components/dynamic-label/DynamicLabel'
import Navbar from '../components/navbar/Navbar'
import WritingArea from '../components/writing/WritingArea'
import {
  displayMillisecondsAsTime
} from '../functions/calculateTimeRemaining'

// Import styling
import './Writing.scss'


/* 
 * Writing screen
 */
const Writing = props => {

  // Retrieve app state and reducer functions
  const { timer, writing } = useAppState()
  const dispatch = useAppReducer()

  /** Resets text and starts timer on page load */
  useEffect(() => {
    dispatch({ type: 'START_TIMER' })
    dispatch({ type: 'RESET_TEXT' })
  }, [dispatch, timer.limit])

  /* Keeps textarea component value controlled to state. */
  useEffect(() => {
    dispatch({ type: 'SET_TEXT', payload: { value: writing.text } })
  }, [dispatch, writing.text])

  /**
   * Trigger countdown timer.
   */
  useEffect(() => {
    let isMounted = true
    let timeout
    if (isMounted && timer.isRunning) {
      if (timer.limit > 0) {
        timeout = setTimeout(() => {
          dispatch({ type: 'SET_TIME_ELAPSED', payload: { value: timer.elapsed + 1000 }})
        }, 1000)
      }
    } 
    return () => {
      if (timeout) clearTimeout(timeout)
      isMounted = false
    }
  }, [dispatch, timer.limit, timer.elapsed, timer.isRunning])
  


  /* Render component */
  return (
    <div id="Writing">
      <Navbar>
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to home
        </Link>
        <DynamicLabel
          name="Word count"
          type="counter"
          value={wordcount(writing.text)}
          target={writing.goal}
          display={ (x, y) => `${x} / ${y}` }
        />
        <DynamicLabel 
          name="Time"
          type="timer"
          value={timer.elapsed}
          target={timer.limit}
          display={ (time, target) => displayMillisecondsAsTime(time) }
        />
        <Button
          outline
          onClick={() => dispatch({ type: 'TOGGLE_TIMER' })}
        >
          <FontAwesomeIcon icon={timer.isRunning ? faPause : faPlay} />
          { timer.isRunning ? 'Pause' : 'Resume' }
        </Button>
        <Link to="/results">
          <Button>
            Finish
          </Button>
        </Link>
      </Navbar>
      <h2>{writing.title ? writing.title : 'New piece' }</h2>
      <div className="page-section">
        <WritingArea
          text={writing.text}
          setText={e => dispatch({ type: 'SET_TEXT', payload: { value: e } })}
          wordLimit={writing.goal}
          placeholder="Enter some text..."
        />
      </div>
    </div>
  )
}

export default Writing