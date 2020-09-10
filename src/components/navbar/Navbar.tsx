import * as React from 'react'

import './navbar.scss'

interface Props {
    children: React.ReactNode
}

export default function Navbar({children}: Props) {
    return (
        <nav className="navbar">
            {children}
        </nav>
    )
}
