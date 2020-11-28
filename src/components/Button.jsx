import React from 'react'
import './Button.css'

const Button = props => {
    return (
        <button className={`
            button
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
            ${props.operation ? 'operation' : ''}
        `} onClick={() => props.click && props.click(props.label)}
        >
            {props.label}
        </button>
    )
}


export default Button
