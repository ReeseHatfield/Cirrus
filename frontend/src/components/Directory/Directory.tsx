import React, { useState, useEffect } from 'react';
import File from '../File/File';

interface listProps {
    data: string;
    onFileClick: (fileName: string, isDirectory: boolean) => void;
    onFileDoubleClick: (fileName: string, isDirectory: boolean) => void;
}

const Directory = ({ data, onFileClick, onFileDoubleClick }: listProps) => {
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

    return (
        <>
            <h2>File List</h2>
            <ul>
                {files.map((file: any, index) => (
                    <File 
                        key={index}
                        name={file.name} 
                        isDirectory={file.isDirectory} 
                        index={index}
                        onClick={onFileClick}
                        onDoubleClick={onFileDoubleClick}
                    />
                ))}
            </ul>
        </>
    );
}

export default Directory;
