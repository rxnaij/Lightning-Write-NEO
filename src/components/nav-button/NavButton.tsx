/*
 * A specific Button use case for internal links around the app
 * without explicitly being a part of the header navigation.
 */ 

import React from 'react'
import { Link } from 'react-router-dom'

import Button, { ButtonProps } from '../button/button'

interface NavButtonProps {
    to: string,
}

const NavButton = (props: NavButtonProps & ButtonProps) => {

    const { to, ...otherProps } = props

    return(
        <Link to={to}>
            <Button {...otherProps} />
        </Link>
    )
}

export default NavButton