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
            <nav className="main-nav">
                <span className="this-is-just-a-placeholder">
                    Home
                </span>
            </nav>
            <div className="page-section">
                <h1>Let's start writing!</h1>
            </div>
            <div className="page-section card">
                <div className="input-container">
                    <label className="input-label" htmlFor="title-entry">What are you writing? (optional)</label>
                    <input type="text" className="text-input" name="title" id="title-entry" placeholder="Email, essay intro, journal entry, ..." value={props.title} onChange={e => { props.setTitle(e.target.value) }} />
                </div>
                <div className="input-container">
                    <label className="input-label" htmlFor="word-count">Word goal</label>
                    <form className="radio-button-group" name="word-count">
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
                </div>
                <div className="input-container">
                    <label className="input-label" htmlFor="time-limit">Time limit</label>
                    <form className="radio-button-group" name="time-limit">
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
            </div>
            <div className="page-section">
                <Link className="button align-end" to="/writing">
                    Start writing
                </Link>
            </div>
            
        </div>
    )
}

export default Setup