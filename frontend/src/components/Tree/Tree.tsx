import React, { useState, useEffect } from 'react'

interface treeProps {
    backendPoint: string;
}

export const Tree = ({ backendPoint }: treeProps) => {

    const [treeData, setTreeData] = useState("")


    useEffect(() =>{
        fetch(`${backendPoint}/tree`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
    
            if(!response.ok){
                throw new Error("Network response not ok");
            }
    
            return response.text();
    
        })
        .then(text => {
            setTreeData(text);
        })
        .catch((err => {
            console.error('Fetch error:', err);
        }))
    },[])


    

    return (
        <div>{treeData}</div>
    )
}
