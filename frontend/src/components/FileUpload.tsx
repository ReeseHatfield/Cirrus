import React, { useState } from 'react';

interface uploadProps{
    backendPoint: string
}

const FileUpload = ({ backendPoint }: uploadProps) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
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
    };

    return (
        <div>
            <h3>File Upload</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button>
        </div>
    );
};

export default FileUpload;
