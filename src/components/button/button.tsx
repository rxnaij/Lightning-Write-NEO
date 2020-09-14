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

    // Icon component
    icon?: React.ReactNode
    collapse?: 'sm'
}

const Button: React.FC<AppProps> = ({disabled, enableConditions, active, secondary, outline, onClick, icon, collapse, children}: AppProps) => {

    // Button disabled state. Evaluates to true if:
    // the `disabled` prop is supplied, OR
    // any of the elements in the `enableConditions` prop contains a falsy value
    const disabledState = disabled || (enableConditions && !enableConditions.every((condition: any) => condition))

    return(
        <button
            className={`
                button
                ${disabledState ? 'button--disabled' : ''}
                ${active ? 'button--activated' : ''}
                ${secondary ? 'button--secondary' : ''}
                ${outline ? 'button--outline' : ''}
                `
            }
            onClick={(event): void => {
                if (onClick) {
                    event.preventDefault()
                    onClick(event)
                }
            }}
        >
            {
                icon && 
                <span
                    className={`
                        icon
                        ${collapse ? 'collapse--' + collapse : ''}
                    `}
                    role="img"
                >
                        {icon}
                </span>
            }
            {children}
        </button>
    );
}

export default Button