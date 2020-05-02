import React from 'react'

import { timeToString } from '../../functions/timeToString.js'

/* Displays information about the text being written.
*/
const WritingLabels = props => {
  
    return(
      <div className="counters">
        <span className={`counters__label ${ props.timeRemaining.totalTime === 0 ? 'counters__label--completed' : '' }`}>{timeToString(props.timeRemaining.minutes)}:{timeToString(props.timeRemaining.seconds)}</span>
        <span className={`counters__label ${ props.wordCount >= props.wordLimit ? 'counters__label--completed' : '' }`}>{props.wordCount} / {props.wordLimit} words</span>
      </div>
    )
  }

export default WritingLabels