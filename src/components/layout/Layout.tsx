import * as React from 'react'

import './layout.scss'

interface Props {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
    return(
        <div className="layout">
            {children}
        </div>
    )
}

export default Layout