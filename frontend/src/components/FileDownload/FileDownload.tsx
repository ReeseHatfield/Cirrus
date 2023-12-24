import React, { useState } from 'react';


interface DownloadProps{
    backendPoint: string
}

const FileDownload = ({ backendPoint }: DownloadProps ) => {
    const [fileName, setFileName] = useState('');

    const handleInputChange = (e) => {
        setFileName(e.target.value);
    };

    const handleDownload = async () => {
        if (!fileName) {
            alert('Please enter a file name');
            return;
        }

        const response = await fetch(`${backendPoint}/api/download/${fileName}`);
        if (response.ok) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            alert('File not found or error downloading');
        }
    };

    return (
        <div>
            <input type="text" value={fileName} onChange={handleInputChange} placeholder="Enter file name" />
            <button onClick={handleDownload}>Download</button>
        </div>
    );
};

export default FileDownload;
