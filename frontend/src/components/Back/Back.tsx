import React, { useCallback, useEffect } from 'react'
import { Button } from '@mui/material';

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


        fetch(`${backendPoint}/api/cd`, reqOptions)
            .then(() => {
                fetchData();
            })
    }, [])

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Button 
            type="button" 
            onClick={cdParent}
            variant='contained'
            className='button'
        > Back </Button>
    )
}


export default Back;
