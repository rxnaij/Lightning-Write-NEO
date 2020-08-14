import React from './node_modules/react'

/* Displays information about the text being written.
*/
const WritingLabels = props => {

    const labelsToRender = props.data.map(label => 
      <div className="counters" key={label.name}>
        <div className="title">{label.name}</div>
        <div className={label.className}>{label.value}</div>
      </div>  
    )

    return(
      <div className="stat-display">
        {labelsToRender}
      </div>
      
    )
  }

export default WritingLabels