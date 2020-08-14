// Import React packages
import React from 'react'
import { Link } from 'react-router-dom'

// Import npm packages
// Helper packages
import wordcount from 'wordcount'
import ClipboardJS from 'clipboard'
// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCopy, faRedo, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Import custom components and functions
import { calculateTimeRemaining } from '../functions/calculateTimeRemaining'
import { timeToString } from '../functions/timeToString'
import Button from '../components/button/button'

// Import styles
import './Results.scss'

const Results = props => {

    // eslint-disable-next-line
    const clipboard = new ClipboardJS('#button__copy-user-gen-text')

    // Calculate time elapsed writing
    const timeElapsed = calculateTimeRemaining(props.timeLimit ? props.timeLimit - props.timeRemaining.totalTime : 0)

    return(
        <div className="App Results">
            <nav className="main-nav">
                <Link to="/">
                    <span><FontAwesomeIcon icon={faArrowLeft} /> Back to home</span>
                </Link>
            </nav>
            <div className="page-section">
                <div className="article">
                    <div className="article__main">
                        <h2>Nice work!</h2>
                        <p>Here are your results:</p>
                        <div className="linear-group">
                            <div>
                                <h4 className="data-label">
                                    Time elapsed:
                                </h4>
                                <div className="counters__label">
                                    {`${timeToString(timeElapsed.minutes)}:${timeToString(timeElapsed.seconds)}`}
                                </div>
                            </div>
                            <div>
                                <h4 className="data-label">
                                    Words written:
                                </h4>
                                <div className="counters__label">
                                    {wordcount(props.text)}
                                </div>
                            </div>
                        </div>
                        <p>If you're done, you can save your writing.</p>
                        <Button>Hello</Button>
                        <Button disabled><a href="google.com">This button is disabled.</a></Button>
                        <Button secondary>This is a secondary button!</Button>
                    </div>
                    <div className="article__sidebar">
                        <div className="linear-group">
                            <Link className="button" to="/">
                                <FontAwesomeIcon icon={ faRedo } />
                                Write again
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-divider"></div>
            <div className="page-section">
                <div className="writing-results">
                    <div className="writing-results__text">
                        <h3>{ props.title ? props.title : '' }</h3>
                        {
                            props.text
                            ? <p id="user-generated-text" className="written-text">{props.text}</p>
                            : <p className="background-text">You haven't written anything.</p> 
                        }
                    </div>
                    <aside className="writing-results__options">
                        <div className="linear-group--vertical">
                            <button className="button">
                                <FontAwesomeIcon icon={ faDownload } /> 
                                Download as file
                            </button>
                            <button
                                className="button"
                                id="button__copy-user-gen-text"
                                data-clipboard-target="#user-generated-text"
                                onClick={ () => { /* TODO: Trigger tooltip */ } }
                            >
                                <FontAwesomeIcon icon={ faCopy } />
                                Copy text
                            </button>
                        </div>
                    </aside>
                </div>
                
                
                {/*Alternative: <textarea id="user-gen-text" className="textbox written-text" readOnly value={ props.text ? props.text : "You haven't written anything." } />*/}
            </div>
        </div>   
    )
}

export default Results