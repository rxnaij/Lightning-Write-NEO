/* 
* A group of radio checkboxes represented as buttons.
* Will automatically handle event changes when a radio button is selected.
*
* Props: (* means required)
* name*: string, name of group for HTML purposes.
*      Precondition: must be HTML-valid (i.e. no whitespace)
* unitName: string, name of unit of values to be displayed
* label: string, text to appear on form label
* values*: array, values to be supplied to input group
* eventHandler: function, event handler to be run on radio selection.
*       In the context of the parent component, this usually means
*       updating a state value when a radio button is selected.
*/

import * as React from 'react'

import Button from '../button/button'

import './RadioButtonGroup.scss'

type CompProps = {
    name: string,
    unitName: string,
    label: string,
    values: Array<number>,
    // @param value: set to string type because radio button values are strings by default.
    handleChange: (value: string) => void
}

const RadioButtonGroup: React.FC<CompProps> = ({name, unitName, label, values, handleChange}: CompProps) => {
    // @state active: the ID attribute of the currently active radio button
    const [active, setActive] = React.useState('')

    const formId = `${name}-form`
    return(
        <div className="input-container">
            <label className="input-label" htmlFor={formId} form={formId}>
                {label}
            </label>
            <form className="linear-group" id={formId} name={formId}>
                {
                    values.map((val: number) => {
                        const inputId = `${name}-radio__${val}`
                        return(
                            <div key={inputId}>
                                <input type="radio"
                                    className="radio-button-input--neutralize"
                                    name={name}
                                    id={inputId}
                                    value={val}
                                    onChange={e => handleChange(e.target.value) }
                                />
                                <label
                                    className={`button button--outline ${active === inputId ? 'button--outline--activated' : ''}`}
                                    htmlFor={inputId}
                                    onClick={(): void => setActive(inputId) /* When current radio button is selected, sets it as the active one */}
                                >
                                    {val} {unitName}
                                </label>
                            </div>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default RadioButtonGroup