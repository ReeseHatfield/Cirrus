import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

interface uploadProps{
    backendPoint: string;
    sessionID: string;
}

const FileUpload = ({ backendPoint, sessionID }: uploadProps) => {

    const navigate = useNavigate()

    const handleUpload = async (event) => {
        const selectedFile = event.target.files[0]

        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(`${backendPoint}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert('File uploaded successfully: ' + JSON.stringify(data));
            } else {
                alert('File upload failed');
            }
        } catch (error) {
            console.error('Error during file upload:', error);
            alert('Error during file upload: ' + error.message);
        }

        window.location.reload();
    };

    return (

        <Button
            variant="contained"
            component="label"
            className="button"
        >
            Upload
            <input 
                type="file" 
                onChange={handleUpload} 
                style={{ display: 'none' }} // hide the input element, but leave as upload button
            />
        </Button>
    );
};

export default FileUpload;
