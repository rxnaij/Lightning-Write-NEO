import React from 'react'

function mapRange (value, low1, high1, low2, high2) {
  return low2
  + (high2 - low2) 
  * (value - low1) 
  / (high1 - low1);
}

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

    return(
      <div className="dynamic-label">
        <div className="title">{name}</div>
        <div className={ `value` + ( successCondition ? `--success` : `` ) }>
          { displayVal }
        </div>
        <div style={{
          'border-bottom': '2px solid black',
          'width': `${mapRange(value, 0, 0, target, 100)}px`  ,
        }}></div>
      </div>
      
    )
  }

export default DynamicLabel