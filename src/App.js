import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom'

import Setup from './Setup'
import Writing from './Writing'
import Results from './Results'

const App = () => {
    /* States */
    const [ timeLimit, setTimeLimit ] = useState(10000)
    const [ wordLimit, setWordLimit ] = useState(100)
    const [ text, setText ] = useState('')

    // Debug effects
    useEffect(() => {
        console.log("Time limit", timeLimit)
    }, [timeLimit])
    useEffect(() => {
        console.log("Word limit", wordLimit)
    }, [wordLimit])

    return(
        <Router>
            {/* Comment out below code in build mode */}
            {/* <ul>
                <li>
                    <Link to="/setup">Setup</Link>
                </li>
                <li>
                    <Link to="/writing">Writing</Link>
                </li>
                <li>
                    <Link to="/results">Results</Link>
                </li>
            </ul> */}
            <Switch>
                <Route exact path="/">
                    <Redirect to="/setup" />
                </Route>
                <Route path="/setup">
                    <Setup setTimeLimit={setTimeLimit} setWordLimit={setWordLimit} />
                </Route>
                <Route path="/writing">
                    <Writing text={text} setText={setText} timeLimit={timeLimit} setTimeLimit={setTimeLimit} wordLimit={wordLimit} />
                </Route>
                <Route path="/results">
                    <Results text={text} timeLimit={timeLimit} wordLimit={wordLimit} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App