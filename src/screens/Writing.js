// Import React packages
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Import app state
import { useAppState, useAppReducer } from '../AppContext'

// Import npm packages
import wordcount from 'wordcount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import Editor from '../components/editor/Editor.tsx'

// Import custom components and functions
import Button from '../components/button/button.tsx'
import DynamicLabel from '../components/dynamic-label/DynamicLabel.tsx'
import Navbar from '../components/navbar/Navbar.tsx'
import { displayMillisecondsAsTime } from '../functions/calculateTimeRemaining'

// Import styling
import './Writing.scss'

export default function Writing() {
  // Retrieve app state and reducer functions
  const { timer, writing } = useAppState()
  const dispatch = useAppReducer()

  /** Resets text and starts timer on page load */
  useEffect(() => {
    let writingInProgress = true
    if (writingInProgress) {
      dispatch({ type: 'START_TIMER' })
    }
    return () => {
      writingInProgress = false
    }
  }, [dispatch, timer.limit])

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

  // if (writing.text) {
  //   window.onbeforeunload = () => "If you leave now, you'll lose your writing in progress. Are you sure you want to leave this page?"
  // }

  /* Render component */
  return (
    <div id="Writing">
      <Navbar>
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <Link to="/results" className="">
          <Button icon={<FontAwesomeIcon icon={faCheck} />} collapse="sm">
            <span className="button__text--sm">Finish</span>
          </Button>
        </Link>
      </Navbar>
      <div className="writing__settings">
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
          variant="outline"
          icon={<FontAwesomeIcon icon={timer.isRunning ? faPause : faPlay} />}
          collapse="sm"
          onClick={() => dispatch({ type: 'TOGGLE_TIMER' })}
        >
          <span className="button__text--sm">{ timer.isRunning ? 'Pause' : 'Resume' }</span>
        </Button>
      </div>
      
      <h2>{writing.title ? writing.title : 'New piece' }</h2>
      <Editor
        value={writing.editorState}
        onChange={ e => dispatch({ type: 'SET_EDITOR_STATE', payload: { value: e } }) }
        setText={ e => dispatch({ type: 'SET_TEXT', payload: { value: e } }) }
      />
    </div>
  )
}