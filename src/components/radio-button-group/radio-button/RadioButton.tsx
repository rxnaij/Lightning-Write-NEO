import * as React from 'react'

interface RadioButtonProps {
    name: string,
    id: string,
    value: number,
    handleChange: (value: string) => void, // controls value in parent element.
    isActive: boolean,
    setActive: (id: string) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, id, value, handleChange, isActive, setActive }: RadioButtonProps) => {
    return(
        <>
            <label
                className={`radio-button-input__label button button--outline ${isActive ? 'button--outline--activated' : ''}`}
                htmlFor={id}
                onClick={() => setActive(id) /* When current radio button is selected, sets it as the active one */}
            >
                <input type="radio"
                    className="radio-button-input--neutralize"
                    name={name}
                    id={id}
                    value={value}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e.currentTarget.value) }
                    required
                />
                {value}
            </label>
            
        </>
    )
}

export default RadioButton