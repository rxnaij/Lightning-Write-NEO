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
import { displayMillisecondsAsTime } from '../functions/calculateTimeRemaining'
import Navbar from '../components/navbar/Navbar'
import Button from '../components/button/button'
import Statistic from '../components/statistic/Statistic'

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
            <div className="page-section flex">
                <div className="article">
                    <div className="article__main internal-padding">
                        <h1>Nice work!</h1>
                        <p>Here are your results:</p>
                        <div className="linear-group">
                            <Statistic title="Time elapsed:" value={displayMillisecondsAsTime(timer.elapsed)} />
                            <Statistic title="Words written:" value={wordcount(writing.text)} />
                        </div>
                        <h3>{ writing.title ? writing.title : '' }</h3>
                        {
                            writing.text
                            ? <textarea id="user-generated-text" className="textbox" placeholder="You haven't written anything." readOnly value={writing.text} rows={10} />
                            : <p className="background-text">You haven't written anything.</p> 
                        }
                    </div>
                    <div className="article__sidebar">
                        <Link to="/">
                            <Button icon={<FontAwesomeIcon icon={ faRedo } />}>
                                Write again
                            </Button>
                        </Link>
                        <Button icon={<FontAwesomeIcon icon={ faDownload } /> }>
                            Download as file
                        </Button>
                        <Button
                            onClick={ () => { /** @todo: Trigger tooltip */ } }
                            icon={<FontAwesomeIcon icon={ faCopy } />}
                        >
                            <div
                                id="button__copy-user-gen-text"
                                data-clipboard-target="#user-generated-text"
                            >
                                Copy text
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Results