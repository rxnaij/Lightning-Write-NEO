// Import React packages
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Import styles
import './Setup.scss'

// import custom components and functions
import RadioButtonGroup from '../components/radio-button-group/RadioButtonGroup'
import Button from '../components/button/button'
// import NavButton from '../components/NavButton/NavButton'


const Setup = props => {

    const { timeLimit, setTimeElapsed, setTitle } = props

    // Resets the timeElapsed countdown to 0 when the timeLimit is set
    useEffect(() => {
        setTimeElapsed(0)
    }, [timeLimit, setTimeElapsed])

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
            <form className="page-section" onSubmit={e => e.preventDefault()}>
                <fieldset className="input-container align-stretch">
                    <label className="input-label" htmlFor="title-entry">What are you writing? (optional)</label>
                    <input
                        type="text"
                        className="text-input mw-100"
                        name="title"
                        id="title-entry"
                        placeholder="Email, essay intro, journal entry, ..."
                        value={props.title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </fieldset>
                <RadioButtonGroup
                    name="word-limit"
                    label="Word goal"
                    values={[100, 200, 500, 1000]}
                    handleChange={val => {
                        const x = parseInt(val)
                        props.setWordLimit(x)
                    }}
                />
                <RadioButtonGroup
                    name="time-limit"
                    label="Time limit (in minutes)"
                    values={[2, 5, 10, 15, 20]}
                    handleChange={val => {
                        const x = parseInt(val) * 1000 * 60 // Parse to number, then apply an additional conversion 
                                                            // from minutes to milliseconds
                        props.setTimeLimit(x)
                    }}
                />
                <Link to="/writing">
                    <Button
                        
                    >
                        Start writing!!
                    </Button>
                </Link>
            </form>
            
        </div>
    )
}

export default Setup