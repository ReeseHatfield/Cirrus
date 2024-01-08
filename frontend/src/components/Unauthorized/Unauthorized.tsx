import React from 'react'

import './Unauthorized.css'

interface unauthorizedProps{
    message: string
    buttonAction: () => void
    buttonMessage: string
}

export const Unauthorized = ({ message, buttonAction, buttonMessage }: unauthorizedProps) => {

    return (
        <div className='unauthorized-container'>
            <h1>Error: Unauthorized Acesss Request</h1>
            <p>{message}</p>
            <p>Please sign in again</p>
            <button onClick={buttonAction}>{buttonMessage}</button>
        </div>
    )
}
