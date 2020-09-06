import * as React from 'react'

interface Props {
    children: React.ReactNode
}

export default function Navbar({children}: Props) {
    return (
        <nav className="main-nav">
            {children}
        </nav>
    )
}
