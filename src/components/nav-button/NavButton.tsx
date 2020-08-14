import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    values: Array<boolean>
}

const NavButton: React.FC<Props> = (props: Props) => {

    const validated = props.values.every(value => value === true)

    return(
        <Link
            className={ `button${ 
                !(validated) 
                    ? `--disabled`
                    : `` } 
                align-end` }
            to={ `${ validated ? `/writing` : `` }` }
            onClick={
                event => {
                    !(validated) && event.preventDefault()
                }
            }
            
        >
            Start writing
        </Link>
    )
}

export default NavButton