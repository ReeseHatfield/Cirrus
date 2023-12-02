import React, { useState, useEffect, useCallback } from 'react';
import FileDisplay from '../Directory/Directory';

interface displayProps{
    backendPoint: string;
}

const Display  = ({ backendPoint }: displayProps ) => {

    const [data, setData] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [inputText, setInputText] = useState("");



    const fetchData = () => {
        fetch(`${backendPoint}/ls`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); 
        })
        .then(text => {
            setData(text);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    };

    const sendReq = useCallback(() => {
        if (isSending) return;

        setIsSending(true);

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputText })
        };

        fetch(`${backendPoint}/cd`, requestOptions)
            .then(() => {
                fetchData(); // Fetch data again after sending request
            })
            .catch(error => {
                console.error('Fetch error:', error);
            })
            .finally(() => {
                setIsSending(false);
            });
        
    }, [isSending, inputText, fetchData]);


    useEffect(() => {
        fetchData();
    }, []);


    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };


    return (
    <>
        <div><FileDisplay data={data}/></div>
        <input type="button" disabled={isSending} onClick={sendReq} value="Send Request" />
        <input type="text" value={inputText} onChange={handleTextChange} />
    </>)
}

export default Display;