// @ts-check
import React, { createContext, useContext, useReducer } from "react"
import { EditorState } from 'draft-js'

/**
 * Context.
 * This actually is an array of two things:
 * 0. a read-only state object
 * 1. reducer functions to write to state
 */
// @ts-expect-error
export const AppContext = createContext()
AppContext.displayName = 'AppContext'

/**
 * Provides read-only app state values.
 */
export function useAppState() {
    return useContext(AppContext)[0];
}

/**
 * Provides write-only app state values.
 */
export function useAppReducer() {
    return useContext(AppContext)[1];
}

/** 
 * These states determine different aspects of the writing process.
 * @typedef {Object} AppState
 * @prop {Object} timer
 * @prop {boolean} timer.isRunning   whether the timer is currently active
 * @prop {number} timer.limit        the total amount of time, in ms, allocated to the writing phase
 * @prop {number} timer.elapsed    the amount of time currently remaining on the timer
 * @prop {Object} writing
 * @prop {string} writing.title            the title of the piece of writing
 * @prop {string} writing.text             the text that the user has currently written 
 * @prop {number}  writing.goal the number of words the user aims to write
 * @prop {EditorState} writing.editorState        the current EditorState object representing the rich text data
*/

/**
 * The initial state of the app
 * @type AppState
 */
const initialState = {
    timer: {
        isRunning: false,
        limit: 0,
        elapsed: 0,
    },
    writing: {
        title: '',
        text: "",
        goal: 0,
        editorState: EditorState.createEmpty()
    }
}

/**
 * Reducer function: call this to write new value(s) to state.
 * @param {AppState} state the app's current state
 * @param {Object}  action argument sent with the call to the reducer function
 * @param {string}  action.type the name of the dispatch function to call
 * @param {Object}  action.payload an object containing data to send with the dispatch call
 * @param {any}     action.payload.value the argument(s) to pass with the dispatch call
 */
const appStateReducer = (state, action) => {
    switch (action.type) {
        // Starts the timer
        case 'START_TIMER': {
            return {
                ...state,
                timer: {
                    ...state.timer,
                    isRunning: true
                }
            }
        }
        // Stops the timer
        case 'STOP_TIMER': {
            return {
                ...state,
                timer: {
                    ...state.timer,
                    isRunning: false
                }
            }
        }
        case 'TOGGLE_TIMER': {
            return {
                ...state,
                timer: {
                    ...state.timer,
                    isRunning: !state.timer.isRunning
                }
            }
        }
        case 'SET_TIMER': {
            return {
                ...state,
                timer: {
                    ...state.timer,
                    limit: action.payload.value,
                    elapsed: 0
                }
            }
        }
        // Resets the timer
        case 'RESET_TIMER': {
            return {
                ...state,
                timer: {
                    isRunning: false,
                    limit: 0,
                    elapsed: 0,
                }
            }
        }
        case 'SET_TIME_ELAPSED': {
            return {
                ...state,
                timer: {
                    ...state.timer,
                    elapsed: action.payload.value
                }
            }
        }
        case 'SET_TITLE': {
            return {
                ...state,
                writing: {
                    ...state.writing,
                    title: action.payload.value
                }
            }
        }
        case 'SET_TEXT': {
            return {
                ...state,
                writing: {
                    ...state.writing,
                    text: action.payload.value,
                }
            }
        }
        case 'SET_EDITOR_STATE': {
            return {
                ...state,
                writing: {
                    ...state.writing,
                    editorState: action.payload.value
                }
            }
        }
        case 'RESET_TEXT': {
            return {
                ...state,
                writing: {
                    ...state.writing,
                    text: '',
                    wordCount: 0,
                    editorState: EditorState.createEmpty(),
                    title: ''
                }
            }
        }
        case 'SET_WORD_GOAL': {
            return {
                ...state,
                writing: {
                    ...state.writing,
                    goal: action.payload.value
                }
            }
        }
        case 'RESET_ALL':
            return initialState
            
        // If no action type/an unknown action type is provided, do nothing
        default:
            return state
    }
}

/**
 * This is the parent function that provides the state to the app.
 * @param {Object} props 
 * @param {React.ReactNode} props.children
 */
export function AppStateProvider({ children }) {

    // The reducer hook which manages the state object and the dispatch function 
    // whose function is based on the state
    const value = useReducer(appStateReducer, initialState)

    // Return a provider "container" for the context.
    // AppContext.Provider signals that the children components can access the
    // reducer state declared in AppContext.
    return (
        <div className="App">
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </div>
    )
}