import * as React from 'react'

import './button.scss'

type AppProps = {
    children: React.ReactNode,
    // Possible button states
    disabled: boolean,
    secondary: boolean,
    to: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const Button: React.FC<AppProps> = (props: AppProps) => {

    return(
        <button className={`
            button
            ${props.disabled ? 'button--disabled' : ''}
            ${props.secondary ? 'button--secondary' : ''}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button