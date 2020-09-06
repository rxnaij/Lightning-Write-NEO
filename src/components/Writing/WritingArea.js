import React from 'react'

/* Textbox to write in.
*/
const WritingArea = ({ text, setText, wordLimit, placeholder }) => {
    return(
        <textarea className="textbox" name="writing" id=""
                  value={text} onChange={e => setText(e.target.value)}
                  placeholder={placeholder}
                  cols="30" rows="10"
        />
    )
}

export default WritingArea