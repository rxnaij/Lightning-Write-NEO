// Import React packages
import React from 'react'
import { Link } from 'react-router-dom'

// Import app state
import { useAppState } from "../AppContext";

// Import npm packages
// Helper packages
import wordcount from 'wordcount'
import ClipboardJS from 'clipboard'
// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCopy, faRedo, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Import custom components and functions
import { toMinutes, toSeconds, timeToString } from '../functions/calculateTimeRemaining'
import Navbar from '../components/navbar/Navbar'
import Button from '../components/button/button'

// Import styles
import './Results.scss'

const Results = () => {

    const { timer, writing } = useAppState()

    // eslint-disable-next-line
    const clipboard = new ClipboardJS('#button__copy-user-gen-text')

    return(
        <div id="Results">
            <Navbar>
                <Link to="/">
                    <span><FontAwesomeIcon icon={faArrowLeft} /> Back to home</span>
                </Link>
            </Navbar>
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
                                    {timeToString(toMinutes(timer.elapsed)) + ':' + timeToString(toSeconds(timer.elapsed))}
                                </div>
                            </div>
                            <div>
                                <h4 className="data-label">
                                    Words written:
                                </h4>
                                <div className="counters__label">
                                    {wordcount(writing.text)}
                                </div>
                            </div>
                        </div>
                        <p>If you're done, you can save your writing.</p>
                    </div>
                    <div className="article__sidebar">
                        <div className="linear-group">
                            <Link to="/">
                                <Button>
                                    <FontAwesomeIcon icon={ faRedo } />
                                    Write again
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-divider"></div>
            <div className="page-section">
                <div className="writing-results">
                    <div className="writing-results__text">
                        <h3>{ writing.title ? writing.title : '' }</h3>
                        {
                            writing.text
                            ? <p id="user-generated-text" className="written-text">{writing.text}</p>
                            : <p className="background-text">You haven't written anything.</p> 
                        }
                    </div>
                    <aside className="writing-results__options">
                        <div className="linear-group--vertical">
                            <Button>
                                <FontAwesomeIcon icon={ faDownload } /> 
                                Download as file
                            </Button>
                            <Button
                                onClick={ () => { /** @todo: Trigger tooltip */ } }
                            >
                                <div
                                    id="button__copy-user-gen-text"
                                    data-clipboard-target="#user-generated-text"
                                >
                                    <FontAwesomeIcon icon={ faCopy } />
                                    Copy text
                                </div>
                            </Button>
                        </div>
                    </aside>
                </div>
                
                
                {/*Alternative: <textarea id="user-gen-text" className="textbox written-text" readOnly value={ props.text ? props.text : "You haven't written anything." } />*/}
            </div>
        </div>   
    )
}

export default Results