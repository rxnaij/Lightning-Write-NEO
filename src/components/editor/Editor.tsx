/**
 * Rich text editor to use for writing.
 */

import * as React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import "draft-js/dist/Draft.css";
import "./Editor.scss"

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
    label: "",
    fn: (e: React.MouseEvent) => void
}

export default function MyEditor({ value, onChange, setText, readOnly }: EditorProps) {
    // State of editor contents
    const editor = React.useRef<Editor>(null)

    React.useEffect(() => {
        const words = value.getCurrentContent().getPlainText()
        console.log(typeof words)
        setText && setText(words)
    }, [value])

    function focusEditor() {
        if (editor && editor.current !== null) editor.current.focus();
    }

    const handleKeyCommand = (command: string, value: EditorState) => {
        const newState = RichUtils.handleKeyCommand(value, command)
        if (newState) {
            onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    // Text rendering options to render
    /** @todo: decide which options to add */
    const options: EditorOption[] = [
        {
            name: "Bold",
            label: "",
            fn: () => onChange(RichUtils.toggleInlineStyle(value, 'BOLD')),
        },
        {
            name: "Italic",
            label: "",
            fn: () => onChange(RichUtils.toggleInlineStyle(value, 'ITALIC'))
        },
        {
            name: "H1",
            label: "",
            fn: () => onChange(RichUtils.toggleBlockType(value, 'header-one'))
        },
    ]

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
                !readOnly && options.map(option => (
                    <button key={`editor-option--${option.name}`} onMouseDown={option.fn}>
                        {option.name}
                    </button>
                ))
            }
            <Editor
                ref={editor}
                editorState={value}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
                placeholder="Write something!"
                readOnly={readOnly}
            />
        </div>
    )
}