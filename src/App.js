// Import React and other necessary packages
import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
} from 'react-router-dom'

import { AppStateProvider } from "./AppContext";
import Layout from './components/layout/Layout.tsx'

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

const App = () => (
    <AppStateProvider>
        <Layout>
            <Router>
                <ScrollToTop />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/setup" />
                    </Route>
                    <Route path="/setup">
                        <Setup />
                    </Route>
                    <Route path="/writing">
                        <Writing />
                    </Route>
                    <Route path="/results">
                        <Results />
                    </Route>
                </Switch>
            </Router>
        </Layout>
    </AppStateProvider>
)

export default App