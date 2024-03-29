import React, { useState, useEffect } from 'react';
import File from '../File/File';
import { Typography, colors } from '@mui/material';

interface listProps {
    data: string;
    onFileClick: (fileName: string, isDirectory: boolean) => void;
    onFileDoubleClick: (fileName: string, isDirectory: boolean) => void;
    backEndPoint: string
    sessionID: string
}

const Directory = ({ data, onFileClick, onFileDoubleClick, backEndPoint, sessionID, }: listProps) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        try {
            // Check if data is not empty and is a valid JSON string
            if (data && typeof data === 'string' && data.trim().length > 0) {
                const jsonData = JSON.parse(data);
                if (jsonData && jsonData.responseFiles) {
                    setFiles(jsonData.responseFiles);
                }
            }
        } catch (error) {
            console.error("Error parsing JSON data:", error);
        }
    }, [data]); 

    console.log(files);

    return (
        <>
            {/* TODO: make this get request ot the wd */}
            <h2 style={{color: 'white'}}>File List</h2>
            <ul>
                {
                files.filter((file: any) => file.name !== '/backend/cirrus/.gitRootPlaceholder').map((file: any, index) => (
                    <File 
                        key={index}
                        sessionId={sessionID}
                        backendPoint={backEndPoint}
                        name={file.name} 
                        isDirectory={file.isDirectory} 
                        index={index}
                        onClick={onFileClick}
                        onDoubleClick={onFileDoubleClick}
                        sessionID={sessionID}
                    />
                ))}
            </ul>
        </>
    );
}

export default Directory;
