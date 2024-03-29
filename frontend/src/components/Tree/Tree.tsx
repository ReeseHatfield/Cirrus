import React, { useState, useEffect, Fragment } from 'react'

import './Tree.css'

interface treeProps {
    backendPoint: string;
}

export const Tree = ({ backendPoint }: treeProps) => {

    const [treeData, setTreeData] = useState("")


    useEffect(() =>{
        fetch(`${backendPoint}/api/tree`, {
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
            // get stdout from response
            setTreeData(JSON.parse(text)["stdout"]);
        })
        .catch((err => {
            console.error('Fetch error:', err);
        }))
    },[])



    const paragraphs = treeData.split('\n').map((line, index) => (
        <Fragment key={index}>
            {line}
            <br/>
        </Fragment>
    ));
    
    return <div className='tree'>{paragraphs}</div>;


}


export default Tree
