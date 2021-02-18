// Import React packages
import React from 'react'
import { Link } from 'react-router-dom'

// Import app state
import { useAppState, useAppReducer } from "../AppContext";

// Import npm packages
// Helper packages
import wordcount from 'wordcount'
import ClipboardJS from 'clipboard'
// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCopy, faRedo, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'

// Import custom components and functions
import { handleDownloadToTxt } from '../functions/handleDownload'
import { displayMillisecondsAsTime } from '../functions/calculateTimeRemaining'
import Navbar from '../components/navbar/Navbar.tsx'
import Button from '../components/button/button.tsx'
import NavButton from '../components/nav-button/NavButton'
import Statistic from '../components/statistic/Statistic'
import Editor from '../components/editor/Editor'

// Import styles
import './Results.scss'

const OptionsSidebar = () => {
    const { writing } = useAppState()
    const { text, title } = writing
    const dispatch = useAppReducer()
    return(
        <div className="article__sidebar">
            <div>
                <label>Keep writing:</label>
                <Link to="/" onClick={() => dispatch({ type: 'RESET_ALL' })}>
                    <Button icon={<FontAwesomeIcon icon={faPlus} />}>
                        Start new
                    </Button>
                </Link>
                <Link to="/writing" onClick={() => dispatch({ type: 'RESET_TIMER' })}>
                    <Button icon={<FontAwesomeIcon icon={ faRedo } />}>
                        Continue writing
                    </Button>
                </Link>
            </div>
            <div>
                <label>Save your work:</label>
                <a href={handleDownloadToTxt(text)} download={title}>
                    <Button icon={<FontAwesomeIcon icon={ faDownload } /> }>
                        Download
                    </Button>
                </a>
                <Button
                    onClick={ () => { /** @todo: Trigger tooltip */ } }
                    icon={<FontAwesomeIcon icon={ faCopy } />}
                >
                    <div
                        id="button__copy-user-gen-text"
                        data-clipboard-target="#user-generated-text"
                    >
                        Copy to clipboard
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default function Results() {

    const { timer, writing } = useAppState()
    const dispatch = useAppReducer()

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
                            ? <Editor
                                id="user-generated-text"
                                value={writing.editorState}
                                onChange={ e => dispatch({ type: 'SET_EDITOR_STATE', payload: { value: e } }) }
                                readOnly
                            />
                            : <p className="background-text">You haven't written anything.</p> 
                        }
                    </div>
                    <OptionsSidebar />
                </div>
            </div>
        </div>   
    )
}
