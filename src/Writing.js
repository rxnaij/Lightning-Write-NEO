import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import wordcount from 'wordcount'

import './global.scss'
import './Writing.scss'


/* Given an end time,
     returns the amount of time left until the end time.
     end: time when timer elapses
  */
 const calculateTimeRemaining = (time) => {
  let timeLeft = {}
  if (time > 0) {
    timeLeft = {
      // Total duration of time remaining (in ms)
      totalTime: time,
      // Time to display
      minutes: Math.floor((time / 1000 / 60) % 60),
      seconds: Math.floor((time / 1000) % 60),
      milliseconds: Math.floor(time % 100)
    }
  }
  return timeLeft
}

/* Textbox to write in.
*/
const WritingArea = props => {
  return(
      <textarea className="textbox" name="writing" id="" value={props.text} onChange={e => props.setText(e.target.value)} cols="30" rows="10" />
  )
}

/* Displays information about the text being written.
*/
const WritingLabels = props => {

  const makeString = (number) => {
    return number >= 10 ? number.toString() : '0' + number
  }

  return(
    <div className="counters">
      <span className="counters__label">{makeString(props.timeRemaining.minutes)}:{makeString(props.timeRemaining.seconds)}</span>
      <span className="counters__label">{props.wordCount} / {props.wordLimit} words</span>
    </div>
  )
}

/* Writing screen
*/
const Writing = props => {

  /* State */
  const [ wordCount, setWordCount ] = useState(0)
  /* Initialize countdown timer. */
  const [ timeRemaining, setTimeRemaining ] = useState(calculateTimeRemaining(props.timeLimit))

  /* Updates word count when text is written. */
  useEffect(() => {
    setWordCount(wordcount(props.text))
  }, [props.text])

  /* Triggers a countdown timer. */
  useEffect(() => {
    let isMounted = true
    let timeout
    if (isMounted && timeRemaining.totalTime > 0) {
      const onTick = () => setTimeRemaining(calculateTimeRemaining(timeRemaining.totalTime - 1000))
      timeout = setTimeout(onTick, 1000)
    } else {
      setTimeRemaining({
        totalTime: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      })
    }
    return () => {
      if (timeout) clearTimeout(timeout)
      isMounted = false
    }
  }, [timeRemaining.totalTime])

  return (
    <div className="App">
      <div className="page-section">
        <h2>Start writing</h2>
      </div>
      <div className="page-section--full-width">
        <WritingArea text={props.text} setText={props.setText} wordLimit={props.wordLimit}></WritingArea>
      </div>
      <div className="page-section">
        <WritingLabels wordLimit={props.wordLimit} wordCount={wordCount} timeRemaining={timeRemaining} ></WritingLabels>
      </div>
      <div className="page-section">
        <div className="button-group">
          <button className="button">Cancel</button>
          <Link to="/results">
            <button className="button">
              Finish
            </button>
          </Link>
        </div>
      </div>
      
    </div>
  );
}

export default Writing;
