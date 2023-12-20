import { Button } from '@mui/material';
import React, { useCallback, useEffect } from 'react'

interface backProps {
    backendPoint: string;
    fetchData: () => void;
}

const Back = ({ backendPoint, fetchData }: backProps) => {

    const cdParent = useCallback(() => {

        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: ".." })
        };


        fetch(`${backendPoint}/cd`, reqOptions)
            .then(() => {
                fetchData();
            })
    }, [])

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <button type="button" onClick={cdParent}> Back </button>
    )
}


export default Back;
