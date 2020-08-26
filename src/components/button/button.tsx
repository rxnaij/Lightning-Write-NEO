import * as React from 'react'

import './button.scss'

export interface AppProps {
    children: React.ReactNode,
    // Possible button states
    disabled?: boolean,
    active?: boolean,
    // Button variants
    outline?: boolean,
    secondary?: boolean,
    // Event listener callback function
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    // Activate button if certain conditions are met.
    // Otherwise, button remains disabled
    enableConditions?: [],
}

const Button: React.FC<AppProps> = (props: AppProps) => {

    // Button disabled state. Evaluates to true if:
    // the `disabled` prop is supplied, OR
    // any of the elements in the `enableConditions` prop contains a falsy value
    const disabledState = props.disabled || (props.enableConditions && !props.enableConditions.every((condition: any) => condition))

    return(
        <button
            className={`
                button
                ${disabledState ? 'button--disabled' : ''}
                ${props.active ? 'button--activated' : ''}
                ${props.secondary ? 'button--secondary' : ''}
                ${props.outline ? 'button--outline' : ''}
                `
            }
            onClick={(event): void => {
                if (props.onClick) {
                    event.preventDefault()
                    props.onClick(event)
                }
            }}
        >
            {props.children}
        </button>
    );
}

export default Button