import React, { useState, useEffect, useCallback } from 'react';
import Directory from '../Directory/Directory';
import Back from '../Back/Back';

interface displayProps {
    backendPoint: string;
    sessionID: string
}

const Display = ({ backendPoint, sessionID }: displayProps) => {
    const [data, setData] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [selectedFile, setSelectedFile] = useState<{ name: string, isDirectory: boolean } | null>(null);

    const fetchData = useCallback(() => {
        fetch(`${backendPoint}/ls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionID })
        }).then(response => {

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
    }, [backendPoint]);

    useEffect(() => {
        fetchData();
    }, []);

    const changeDirectory = useCallback((directoryName: string) => {
        if (isSending) return;

        setIsSending(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: directoryName })
        };

        fetch(`${backendPoint}/cd`, requestOptions)
            .then(() => {
                fetchData(); // Fetch data again after changing directory
            })
            .catch(error => {
                console.error('Fetch error:', error);
            })
            .finally(() => {
                setIsSending(false);
            });
    }, [isSending, backendPoint, fetchData]);

    const handleFileClick = (name: string, isDirectory: boolean) => {
        setSelectedFile({ name, isDirectory });
    };

    const handleFileDoubleClick = async (name: string, isDirectory: boolean) => {
        if (isDirectory) {
            changeDirectory(name);
        } else {
            // Download file logic
            const response = await fetch(`${backendPoint}/download/${name}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sessionID })
            });

            console.log(response);
            if (response.ok) {
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = name;
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                alert('File not found or error downloading');
            }
        }
    };

    return (
        <>
            <Back backendPoint={backendPoint} fetchData={fetchData} />
            <div>
                <Directory
                    sessionID={sessionID}
                    data={data} 
                    onFileClick={handleFileClick} 
                    onFileDoubleClick={handleFileDoubleClick} 
                />
            </div>
        </>
    );
}

export default Display;
