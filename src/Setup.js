import React from 'react'
import { Link } from 'react-router-dom'

import './global.scss'
import './Setup.scss'

const Setup = props => {

    /* Specific to inputs on this component:
        Sets state from value heard on the input
        Correctly casts the value to an integer
    */
    const handleChange = (e, fn) => {
        return fn(parseInt(e.target.value))
    }

    return(
        <div className="App Setup">
            <div className="page-section">
                <h1>Let's start writing!</h1>
            </div>
            <div className="page-section">
                <h2>Word goal</h2>
                <form className="radio-button-group">
                    <label className="button" htmlFor="words-option_1">
                        <input type="radio" name="words" id="words-option_1" value="100" onChange={ e => { handleChange(e, props.setWordLimit) } }/>
                        100 words
                    </label>
                    <label className="button" htmlFor="words-option_2">
                        <input type="radio" name="words" id="words-option_2" value="200" onChange={e => { handleChange(e, props.setWordLimit) }}/>
                        200 words
                    </label>
                    <label className="button" htmlFor="words-option_3">
                        <input type="radio" name="words" id="words-option_3" value="500" onChange={e => { handleChange(e, props.setWordLimit) }}/>
                        500 words
                    </label>
                    <label className="button" htmlFor="words-option_4">
                        <input type="radio" name="words" id="words-option_4" value="1000" onChange={e => { handleChange(e, props.setWordLimit) }}/>
                        1000 words
                    </label>
                </form>
                <h2>Time limit</h2>
                <form action="" className="radio-button-group">
                    <label htmlFor="5-min" className="button">
                        <input type="radio" name="time" id="5-min" value="300000" onChange={e => { handleChange(e, props.setTimeLimit) }}/>
                        5 min
                    </label>
                    <label htmlFor="10-min" className="button">
                        <input type="radio" name="time" id="10-min" value="600000" onChange={e => { handleChange(e, props.setTimeLimit) }}/>
                        10 min
                    </label>
                    <label htmlFor="15-min" className="button">
                        <input type="radio" name="time" id="15-min" value="900000" onChange={e => { handleChange(e, props.setTimeLimit) }}/>
                        15 min    
                    </label>
                    <label htmlFor="20-min" className="button">
                        <input type="radio" name="time" id="20-min" value="1200000" onChange={e => { handleChange(e, props.setTimeLimit) }}/>
                        20 min
                    </label>
                </form>
            </div>
            <div class="page-section">
                <Link to="/writing">
                    <button className="button">Start writing</button>
                </Link>
            </div>
            
        </div>
    )
}

export default Setup