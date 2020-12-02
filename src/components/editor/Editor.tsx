/**
 * Rich text editor to use for writing.
 */

import * as React from 'react'
import { Editor, EditorState, RichUtils, ContentBlock } from 'draft-js'
import "draft-js/dist/Draft.css";
import "./Editor.scss"
import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faHeading } from '@fortawesome/free-solid-svg-icons'

/**
 * Component props handle the app state.
 */
interface EditorProps {
    value: EditorState,
    onChange: (state: EditorState) => void,
    setText?: (words: string) => void,
    readOnly?: boolean,
}

interface EditorOption {
    name: string,
    icon: JSX.Element,
    fn: (e: React.MouseEvent) => void,
    isActive: boolean|null
}

export default function MyEditor({ value, onChange, setText, readOnly }: EditorProps) {
    // State of editor contents
    const editor = React.useRef<Editor>(null)

    // Sends plaintext value of content to parent component
    React.useEffect(() => {
        const words = value.getCurrentContent().getPlainText()
        setText && setText(words)
    }, [value])

    /** @todo  Focus fix for editor (WIP) */
    function focusEditor() {
        if (editor && editor.current !== null) editor.current.focus();
    }

    // Handles key commands entered in the editor (like ctrl+B for bolding)
    const handleKeyCommand = (command: string, value: EditorState) => {
        const newState = RichUtils.handleKeyCommand(value, command)
        if (newState) {
            onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    // Text styling options
    const options: EditorOption[] = [
        {
            name: "Bold",
            icon: <FontAwesomeIcon icon={faBold} />,
            fn: () => onChange(RichUtils.toggleInlineStyle(value, 'BOLD')),
            isActive: false
        },
        {
            name: "Italic",
            icon: <FontAwesomeIcon icon={faItalic} />,
            fn: () => onChange(RichUtils.toggleInlineStyle(value, 'ITALIC')),
            isActive: false
        },
        {
            name: "H1",
            icon: <FontAwesomeIcon icon={faHeading} />,
            fn: () => onChange(RichUtils.toggleBlockType(value, 'header-one')),
            isActive: false
        },
    ]

    /** 
     * Handles styling of block-level elements in the text.
     * Returns a CSS class corresponding to the selected type.
     */ 
    const blockStyler = (contentBlock: ContentBlock): string => {
        const type = contentBlock.getType()
        switch (type) {
            case 'paragraph':
                return 'editor-text--p'
            case 'header-one':
                return 'editor-text--header-one'
            default:
                return 'editor-text--p'
        }
    }

    return(
        <div
            className="editor"
            onClick={focusEditor}
        >
            {
                /** 
                 * @todo: return focus to editor after button is clicked. Currently, onClick handlers
                 * steal focus from the editor, so they don't work. onMouseDown is kind of hacky.
                 */
                !readOnly && 
                <fieldset className="editor__options-bar">{
                    options.map(option => (
                        <button
                            key={`editor-option--${option.name}`} 
                            onMouseDown={option.fn} 
                            className={classNames(
                                "editor__option", 
                                value.getCurrentInlineStyle().find(k => k === option.name.toUpperCase()) && "editor__option--is-active" // For inline styles: highlights button if that style is present in the current selection
                            )}
                        >
                            {option.icon}
                        </button>
                    ))
                }</fieldset>
            }
            <Editor
                ref={editor}
                editorState={value}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
                blockStyleFn={blockStyler}
                placeholder="Write something!"
                readOnly={readOnly}
            />
        </div>
    )
}