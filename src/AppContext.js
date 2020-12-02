/* Create versions of state that can be 
    transferred across all screens in the app.
*/
import React, { createContext, useContext, useReducer } from "react"
import wordcount from 'wordcount'
import { EditorState } from 'draft-js'

/**
 * Context.
 * This actually is an array of two things:
 * 1. the state
 * 2. reducer functions for that state
 */
export const AppContext = createContext()
AppContext.displayName = 'AppContext'

/** States
    *  These states determine different aspects of the writing process.
    *
    *  @prop timeLimit:        (number) the total amount of time, in ms, allocated to the writing phase
    *  @prop timeElapsed:    (object) the amount of time currently remaining on the timer
    *  @prop wordLimit:        (number) how many words the user is aiming toward
    *  @prop text:             (string) the text that the user has currently written @todo replace this when rich text is implemented
    *  @prop editorState        (EditorState) the current EditorState object representing the rich text data
    * @prop title:            (string, optional) the title of the piece of writing
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
 * Reducer dispatch function – called to initiate a particular change in state.
 * @param {Object} state the app's current state
 * @param {Object} action an object containing the "type" prop, specifying the name of the dispatch function to call, and "payload", which includes any necessary parameters for the function
 */
const appStateReducer = (state, action) => {
    switch(action.type) {
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
                    wordCount: 0
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
        // If no action type/an unknown action type is provided, do nothing
        default:
            return state
    }
}

/**
 * This is the parent function that provides the state to the app.
 * @param {*} param0 
 */
export function AppStateProvider({children}) {

    // The initial state of the app
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

    // The reducer hook which manages the state object and the dispatch function 
    // whose function is based on the state
    const value = useReducer(appStateReducer, initialState)



    // Return a provider "container" for the context.
    // AppContext.Provider signals that the children components can access the
    // reducer state declared in AppContext.
    return(
        <div className="App">
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </div>
    )
}