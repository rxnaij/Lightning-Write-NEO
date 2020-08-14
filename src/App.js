// Import React and other necessary packages
import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
} from 'react-router-dom'

// Import app screens
import Setup from './screens/Setup'
import Writing from './screens/Writing'
import Results from './screens/Results'

// Import CSS
import './global.scss'



/* Helper function
 * Automatically scrolls window to top
 * when navigating to a new screen.
 */ 
const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname])

    return null
}

const App = () => {
    /* States
    *  These states determine different aspects of the writing process.
    *
    *  timeLimit: how much time is allocated to writing
    *  timeRemaining: how much time is currently left on the timer
    *  wordLimit: how many words the user is aiming toward
    *  text: the text that the user has currently written
    *  title: (optional) the title of the piece of writing
    */
    const [ timeLimit, setTimeLimit ] = useState(0)
    const [ timeRemaining, setTimeRemaining ] = useState(0)
    const [ wordLimit, setWordLimit ] = useState(0)
    const [ text, setText ] = useState('')
    const [ title, setTitle ] = useState('')

    return(
        <Router>
            <ScrollToTop />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/setup" />
                </Route>
                <Route path="/setup">
                    <Setup timeLimit={timeLimit} setTimeLimit={setTimeLimit}
                           timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining}
                           wordLimit={wordLimit} setWordLimit={setWordLimit}
                           setTitle={setTitle}
                    />
                </Route>
                <Route path="/writing">
                    <Writing text={text} setText={setText} 
                             timeLimit={timeLimit} setTimeLimit={setTimeLimit}
                             timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining}
                             wordLimit={wordLimit}
                             title={title} 
                    />
                </Route>
                <Route path="/results">
                    <Results text={text} timeLimit={timeLimit}
                             timeRemaining={timeRemaining} wordLimit={wordLimit}
                             title={title}
                    />
                </Route>
            </Switch>
        </Router>
    )
}

export default App