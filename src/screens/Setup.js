// Import React packages
import React from 'react'
import { Link } from 'react-router-dom'

// Import styles
import './Setup.scss'

// Import app state reducer functions
import { useAppState, useAppReducer } from "../AppContext.js";

// import custom components and functions
import RadioButtonGroup from '../components/radio-button-group/RadioButtonGroup'
import Button from '../components/button/button'
import Navbar from '../components/navbar/Navbar'


const Setup = props => {

    const { writing } = useAppState()
    const dispatch = useAppReducer()

    // useEffect(() => {
    //     dispatch({ type: 'RESET_TEXT' })
    // }, [dispatch])

    return(
        <div id="Setup">
            <Navbar>
                <span className="this-is-just-a-placeholder">
                    Lightning Write
                </span>
            </Navbar>
            <div className="page-section">
                <h1>Lightning Write</h1>
                <p>Let's power through that writer's block!</p>
            </div>
            <form className="page-section" onSubmit={e => e.preventDefault()}>
                <div className="input-container">
                    <label className="input-label" htmlFor="title-entry">What are you writing? (optional)</label>
                    <input
                        type="text"
                        className="text-input mw-100"
                        name="title"
                        id="title-entry"
                        placeholder="Email, essay intro, journal entry, ..."
                        value={writing.title}
                        onChange={e => dispatch({ type: 'SET_TITLE', payload: { value: e.target.value } })}
                    />
                </div>
                <RadioButtonGroup
                    name="word-limit"
                    label="Word goal"
                    values={[100, 200, 500, 1000]}
                    handleChange={val => {
                        const x = parseInt(val)
                        dispatch({ type: 'SET_WORD_GOAL', payload: { value: x } })
                    }}
                />
                <RadioButtonGroup
                    name="time-limit"
                    label="Time limit (in minutes)"
                    values={[2, 5, 10, 15, 20]}
                    handleChange={val => {
                        const x = parseInt(val) * 1000 * 60 // Parse to number, then apply an additional conversion 
                                                            // from minutes to milliseconds
                        dispatch({ type: 'SET_TIMER', payload: { value: x } })
                    }}
                />
                <Link to="/writing">
                    <Button>
                        Start writing!!
                    </Button>
                </Link>
            </form>
        </div>
    )
}

export default Setup