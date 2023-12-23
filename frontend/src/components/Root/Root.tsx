import React, { useCallback, useEffect } from 'react'
import { Button } from '@mui/material';

interface rootProps {
    backendPoint: string;
    fetchData: () => void;
}

const Root = ({ backendPoint, fetchData }: rootProps) => {

    const cdRoot = useCallback( async () => {
        const reqOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }

        fetch(`${backendPoint}/cdRoot`, reqOptions)
            .then(() => {
                fetchData();
            })
            
    }, [])

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <Button 
            type='button' 
            onClick={cdRoot}
            variant='contained'
            className='button'
        >Home
        </Button>
    )
}


export default Root;
