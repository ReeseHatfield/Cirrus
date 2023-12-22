import React, { useCallback, useEffect } from 'react'


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
        <button type='button' onClick={cdRoot}>Home</button>
    )
}


export default Root;
