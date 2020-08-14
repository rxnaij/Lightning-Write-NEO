// Import React packages
import React from 'react'
import { Link } from 'react-router-dom'

// Import styles
import './Setup.scss'

// import custom components and functions
import { calculateTimeRemaining } from '../functions/calculateTimeRemaining'
import RadioButtonGroup from '../components/radio-button-group/RadioButtonGroup'


const Setup = props => {

    return(
        <div className="App Setup">
            <nav className="main-nav">
                <span className="this-is-just-a-placeholder">
                    Home
                </span>
            </nav>
            <div className="page-section">
                <h1>Lightning Write</h1>
                <p>Let's power through that writer's block!</p>
            </div>
            <div className="page-section card">
                <div className="input-container align-stretch">
                    <label className="input-label" htmlFor="title-entry">What are you writing? (optional)</label>
                    <input type="text" className="text-input" name="title" id="title-entry" placeholder="Email, essay intro, journal entry, ..." value={props.title} onChange={e => { props.setTitle(e.target.value) }} />
                </div>
                <RadioButtonGroup
                    name="word-limit"
                    unitName="words"
                    label="Word goal"
                    values={[100, 200, 500, 1000]}
                    handleChange={val => {
                        const x = parseInt(val)
                        props.setWordLimit(x)
                    }}
                />
                <RadioButtonGroup
                    name="time-limit"
                    unitName="minutes"
                    label="Time limit"
                    values={[2, 5, 10, 15, 20]}
                    handleChange={val => {
                        const x = parseInt(val) * 1000 * 60 // Parse to number, then apply an additional conversion 
                                                            // from minutes to milliseconds
                        props.setTimeLimit(x)
                        props.setTimeRemaining(calculateTimeRemaining(x))
                    }}
                />
            </div>
            <div className="page-section">
                <Link
                    className={ `button${ 
                        !(props.timeLimit && props.wordLimit) 
                        ? `--disabled` 
                        : `` } 
                        align-end` }
                    to={ `${ (props.timeLimit && props.wordLimit) ? `/writing` : `` }` }
                >
                    Start writing
                </Link>
            </div>
            
        </div>
    )
}

export default Setup