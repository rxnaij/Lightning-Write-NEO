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
*/

import React from 'react'

const RadioButtonGroup = ({name, unitName, label, values, handleChange}) => {
    const formId = `${name}-form`
    return(
        <div className="input-container">
            <label className="input-label" htmlFor={formId} form={formId}>
                {label}
            </label>
            <form className="linear-group" id={formId} name={formId}>
                {
                    values.map(val => {
                        const inputId = `${name}-radio__${val}`
                        return(
                            <div key={inputId}>  
                                <input type="radio"
                                    className="radio-button-input"
                                    name={name}
                                    id={inputId}
                                    value={val}
                                    onChange={e => handleChange(e.target.value) } 
                                />
                                <label className="button"
                                    htmlFor={inputId}
                                    key={`labelFor-${inputId}`}
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