/**
* A group of radio checkboxes represented as buttons.
* Will automatically handle event changes when a radio button is selected.
*
* Props: (* means required)
* @prop name*: string           name of group for HTML purposes.
*      Precondition: must be HTML-valid (i.e. no whitespace)
* @prop unitName: string        name of unit of values to be displayed
* @prop label: string           text to appear on form label
* @prop values*: array          values to be supplied to input group
* @prop eventHandler            function, event handler to be run on radio selection.
*       In the context of the parent component, this usually means
*       updating a state value when a radio button is selected.
*/

import * as React from 'react'

import RadioButton from './radio-button/RadioButton'

import './RadioButtonGroup.scss'

interface CompProps {
    name: string,
    label: string,
    values: Array<number>,
    // @param value: set to string type because radio button values are strings by default.
    handleChange: (value: string) => void
}

/**
 * 
 * @todo fully build out "custom" option in radio buttons
 * 
 */
const RadioButtonGroup: React.FC<CompProps> = ({name, label, values, handleChange}: CompProps) => {

    // @state active: the ID attribute of the currently active radio button
    const [valueSelected, setvalueSelected] = React.useState('')

    const formId = `${name}-form`

    return(
        <fieldset className="radio-button-group" id={formId} name={formId}>
            <legend className="input-label">
                {label}
            </legend>
            {/* {
                !active && 
                <div>Please select a value.</div>
            } */}
            {
                values.map((val: number) => {
                    const inputId = `${name}-radio__${val}`
                    return(
                        <RadioButton
                            key={inputId} 
                            name={name}
                            id={inputId}
                            value={val}
                            handleChange={handleChange}
                            isActive={valueSelected === inputId}
                            setActive={(): void => setvalueSelected(inputId)}
                        />
                    )
                })
            }
            {/* <div className="inline-block">
                <label htmlFor={formId + '-custom-value-input'} >or enter a custom value...</label>
                <input id={formId + '-custom-value-input'} type="text" className="text-input" placeholder="custom value..." />
            </div> */}
        </fieldset>
    )
}

export default RadioButtonGroup