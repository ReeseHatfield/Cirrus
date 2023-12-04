import React, { useCallback, useEffect } from 'react'

interface backProps {
    backendPoint: string;
    fetchData: () => void;
}

const Back = ( {backendPoint, fetchData}: backProps) => {

    const cdParent = useCallback(() =>{

        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: ".."})
        };


        fetch(`${backendPoint}/cd`, reqOptions)
            .then(() => {
                fetchData(); 
            })
    }, [fetchData, backendPoint])
    


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <input type="button" onClick={cdParent} value={"Back"}/>
    )
}


export default Back;
