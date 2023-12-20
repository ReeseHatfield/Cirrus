import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        window.location.reload(false);
    };

    return (
        <div>
            <h3>File Upload</h3>
            <input type="file" onChange={handleUpload} />
        </div>
    );
};

export default FileUpload;
