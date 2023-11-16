import React, { useState } from 'react';

const FileUpload = () => {
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
            const response = await fetch('http://localhost:3001/upload', {
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
