import * as React from 'react'
import './layout.scss'


interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="layout">
            {children}
            <footer className="footer">
                <p><a href="https://github.com/rxnaij/lightning-write-NEO">github</a> · made with &lt;3 by @rxnaij © 2020</p>
            </footer>
        </div>
    )
}

export default Layout