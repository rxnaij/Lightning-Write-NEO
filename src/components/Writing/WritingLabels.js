import React from 'react'

/* Displays information about the text being written.
*/
const WritingLabels = props => {

    const labelsToRender = props.data.map(label => 
      <div className="counters" key={label.name}>
        <span className="title">{label.name}</span>
        <span className={label.className}>{label.value}</span>
      </div>  
    )

    return(
      <div className="stat-display">
        {labelsToRender}
      </div>
      
    )
  }

export default WritingLabels