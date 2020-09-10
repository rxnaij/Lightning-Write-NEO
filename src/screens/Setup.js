// Import React packages
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Import styles
import './Setup.scss'

// Import app state reducer functions
import { useAppState, useAppReducer } from "../AppContext.js";

// import custom components and functions
import RadioButtonGroup from '../components/radio-button-group/RadioButtonGroup'
import Button from '../components/button/button'
import Navbar from '../components/navbar/Navbar'

import { quip } from "../functions/quip";

const Setup = props => {

    const { timer, writing } = useAppState()
    const dispatch = useAppReducer()
    const [introQuip, setintroQuip] = useState(quip())

    const validated = timer.limit && writing.goal

    return(
        <div id="Setup">
            <Navbar>
                <span className="navbar__title">
                    Lightning Write
                </span>
            </Navbar>
            <section className="page-section flex">
                <h1>Let's get writing!</h1>
                <p style={{ color: 'hsla(0, 0%, 0%, 0.7)' }}>{introQuip}</p>
            </section>
            <section className="page-section">
                <form className="form" onSubmit={e => e.preventDefault()}>
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
                        label="Word goal – how many words are you aiming for?"
                        values={[100, 200, 500, 1000]}
                        handleChange={val => {
                            const x = parseInt(val)
                            dispatch({ type: 'SET_WORD_GOAL', payload: { value: x } })
                        }}
                    />
                    <RadioButtonGroup
                        name="time-limit"
                        label="Time limit (in minutes) – how long will you write for?"
                        values={[2, 5, 10, 15, 20]}
                        handleChange={val => {
                            const x = parseInt(val) * 1000 * 60 // Parse to number, then apply an additional conversion 
                                                                // from minutes to milliseconds
                            dispatch({ type: 'SET_TIMER', payload: { value: x } })
                        }}
                    />
                    <Link to={validated ? '/writing' : ''} onClick={e => !validated && e.preventDefault()}>
                        <Button disabled={!validated}>
                            Start writing!!
                        </Button>
                    </Link>
                </form>
            </section>
        </div>  
    )
}

export default Setup