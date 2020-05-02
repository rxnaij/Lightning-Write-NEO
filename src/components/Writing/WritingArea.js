import React from 'react'

/* Textbox to write in.
*/
const WritingArea = props => {
    return(
        <textarea className="textbox" name="writing" id=""
                  value={props.text} onChange={e => props.setText(e.target.value)}
                  cols="30" rows="10"
        />
    )
}

export default WritingArea