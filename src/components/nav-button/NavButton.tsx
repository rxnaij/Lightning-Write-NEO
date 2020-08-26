/*
 * A specific Button use case for internal links around the app
 * without explicitly being a part of the header navigation.
 * 
 */ 

import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../button/button'

interface Props {
    children: React.ReactNode,
    enableConditions: [],
    to: string,
}

const NavButton: React.FC<Props> = (props: Props) => {

    const isDisabled = !(props.enableConditions && !props.enableConditions.every((condition: any) => condition))

    return(
        <Link
            to={props.to}
            onClick={(event) => {
                isDisabled && event.preventDefault()
            }}
        >
            <Button
                disabled={isDisabled}
            >
                {props.children}
            </Button>
        </Link>
    )
}

export default NavButton