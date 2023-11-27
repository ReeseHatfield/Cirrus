import React, { useCallback, useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload';
import FileDownload from '../components/FileDownload';

const BACK_END_POINT = "http://localhost:3001";

export const Home = () => {
    const [data, setData] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);
    const [inputText, setInputText] = useState("");

    const fetchData = () => {
        fetch(`${BACK_END_POINT}/ls`)
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

        fetch(`${BACK_END_POINT}/cd`, requestOptions)
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

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        {data ? <div>{data}</div> : <div>Loading...</div>}
        <input type="button" disabled={isSending} onClick={sendReq} value="Send Request" />
        <input type="text" value={inputText} onChange={handleTextChange} />
        <FileUpload />
        <FileDownload />
        </>
    );
};

export default Home;
