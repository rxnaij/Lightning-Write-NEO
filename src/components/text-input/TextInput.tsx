import React from 'react'
import './TextInput.scss'

interface TextInputProps {
    name: string,
    className?: string,
    id?: string,
    placeholder?: string,

    label: string,

    // Controllers
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<TextInputProps> = ({name, className, id, placeholder, label, value, onChange}: TextInputProps) => {

    return (
        <div className="input-container">
            <label className="input-label" htmlFor={name}>{label}</label>
            <input
                className="text-input mw-100"
                type="text"
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
        
    )
}

export default TextInput