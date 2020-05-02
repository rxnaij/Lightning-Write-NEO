// Import React packages
import React from 'react'
import { Link } from 'react-router-dom'

// Import styles
import './global.scss'
import './Setup.scss'

// import custom components and functions
import { calculateTimeRemaining } from './functions/calculateTimeRemaining.js'

const Setup = props => {

    /* Specific to inputs on this component:
        Sets state from value heard on the input
        Correctly casts the value to an integer
    */
    const handleChange = (val, ...fs) => {
        for (let fn of fs) {
            const x = parseInt(val)
            console.log(val)
            fn(x)
        }
    }


    // Change the values in these arrays to change the values of the input buttons.
    // For instance, if you want to make the word limit values 100 and 200, make sure
    // wordLimitValues = [100, 200].
    const wordLimitValues = [100, 200, 500, 1000]
    const timeLimitValues = [2, 5, 10, 15, 20].map(val => Math.floor(val * 1000 * 60))


    return(
        <div className="App Setup">
            <div className="page-section">
                <h1>Let's start writing!</h1>
            </div>
            <div className="page-section--full-width">
                <label htmlFor="title-entry">
                    What are you writing? (optional)
                </label>
                <input type="text" className="text-input" name="title" id="title-entry" placeholder="Email, essay intro, journal entry, ..." value={props.title} onChange={e => { props.setTitle(e.target.value) }} />
            </div>
            <div className="page-section">
                <h2>Word goal</h2>
                <form className="radio-button-group">
                    {
                        wordLimitValues.map(val => 
                            <label className="button" htmlFor={`words-option_${val}`} key={'word-limit-' + val}>
                                <input type="radio" name="words" id={`words-option_${val}`} value={val}
                                    onChange={e => handleChange(e.target.value, props.setWordLimit) } />
                                {val} words
                            </label>
                        )
                    }
                </form>
                <h2>Time limit</h2>
                <form className="radio-button-group">
                    {
                        timeLimitValues.map(val =>
                            <label className="button" htmlFor={`${val}-min`} key={'time-limit-' + val}>
                                <input type="radio" name="time" id={`${val}-min`} value={val}
                                    onChange={e => handleChange(e.target.value, props.setTimeLimit, t => props.setTimeRemaining(calculateTimeRemaining(t)) )}
                                />
                                { Math.floor((val / 1000 / 60) % 60) } min
                            </label>    
                        )
                    }
                </form>
            </div>
            <div className="page-section">
                <Link to="/writing">
                    <button className={`button`} >Start writing</button>
                </Link>
            </div>
            
        </div>
    )
}

export default Setup