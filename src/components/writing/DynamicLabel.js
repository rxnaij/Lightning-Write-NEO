import React from 'react'

import { mapValues } from "../../functions/mapValues";

/* Displays information about the text being written.
    Props:
        name: String: name of label
        value: String: current value of label
        className: template String: base class, plus a condition when the value hits a certain amount
*/
const DynamicLabel = props => {

    const { name, type, value, target, display } = props

    let successCondition, displayVal

    // Handle success condition depending on type prop
    if (type === 'counter') {
      successCondition = value >= target
    } else if (type === 'timer') {
      successCondition = value <= target
    }

    // Handle displayed value depending on display prop
    if (typeof display === 'function') {
      displayVal = display(value, target)
    } else if (typeof display === 'string') {
      displayVal = display
    }

    const newVal = mapValues(value, 0, target, 0, 100, true)
    console.log(`
    Counter: ${name}
    Value: ${value}
    Target: ${target}
    New value: ${newVal}
    `)

    return(
      <div className="dynamic-label">
        <div className="title">{name}</div>
        <div className={ `value` + ( successCondition ? `--success` : `` ) }>
          { displayVal }
        </div>
        <div style={{
          'borderBottom': '2px solid black',
          'width': `${100}px`  ,
        }}></div>
      </div>
      
    )
  }

export default DynamicLabel