// Import React packages
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Import app state reducer functions
import { useAppState, useAppReducer } from "../AppContext.js";

// import custom components and functions
import RadioButtonGroup from '../components/radio-button-group/RadioButtonGroup.tsx'
import Button from '../components/button/button.tsx'
import Navbar from '../components/navbar/Navbar.tsx'
import TextInput from '../components/text-input/TextInput.tsx'
import { quip } from "../functions/quip";

export default function Setup() {
    const { timer, writing } = useAppState()
    const dispatch = useAppReducer()
    const [introQuip] = useState(quip())

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
                    <TextInput 
                        name="title"
                        id="title-entry"
                        placeholder="Email, essay intro, journal entry, ..."
                        label="What are you writing?"
                        value={writing.title}
                        onChange={e => dispatch({ type: 'SET_TITLE', payload: { value: e.target.value } })}
                    />
                    <RadioButtonGroup
                        name="word-limit"
                        label="Word goal – how many words are you aiming for?"
                        values={[100, 200, 500, 1000]}
                        handleChange={val => {
                            const wordGoal = parseInt(val)
                            dispatch({ type: 'SET_WORD_GOAL', payload: { value: wordGoal } })
                        }}
                    />
                    <RadioButtonGroup
                        name="time-limit"
                        label="Time limit (in minutes) – how long will you write for?"
                        values={[2, 5, 10, 15, 20]}
                        handleChange={val => {
                            const minutesToMs = parseInt(val) * 1000 * 60 // Parse to number, then apply an additional conversion 
                                                                // from minutes to milliseconds
                            dispatch({ type: 'SET_TIMER', payload: { value: minutesToMs } })
                        }}
                    />
                    <Link to={validated ? '/writing' : ''} onClick={e => !validated && e.preventDefault()}>
                        <Button state={!validated && 'disabled'}>Start writing!!</Button>
                    </Link>
                </form>
            </section>
            <footer className="footer">
                <p><a href="https://github.com/rxnaij/lightning-write-NEO">github</a> · made by <a href="https://github.com/rxnaij">@rxnaij</a>  © 2020</p>
            </footer>
        </div>  
    )
}