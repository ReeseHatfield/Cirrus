import React from 'react';
import folderIcon from '../assets/folder.svg';

interface FileProps {
    name: string;
    isDirectory: boolean;
    index: number;
};

const File = ({ name, isDirectory, index }: FileProps) => {
    return (
        <p>
            {name} - {isDirectory ? <img src={folderIcon} alt="Folder" /> : 'File'}
        </p>
    );
}

export default File;
