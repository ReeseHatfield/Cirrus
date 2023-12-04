import React from 'react';
// @ts-ignore
import folderIcon from '../../assets/folder.svg';
// @ts-ignore
import fileIcon from '../../assets/file.svg';

import './File.css';

interface FileProps {
    name: string;
    isDirectory: boolean;
    index: number;
    onClick: (name: string, isDirectory: boolean) => void;
    onDoubleClick: (name: string, isDirectory: boolean) => void;
};

const File = ({ name, isDirectory, index, onClick, onDoubleClick }: FileProps) => {
    const pathArr = name.split('/');
    name = pathArr[pathArr.length - 1];

    return (
        <p key={index} 
            className="file" 
            onClick={() => onClick(name, isDirectory)} 
            onDoubleClick={() => onDoubleClick(name, isDirectory)}>
            {name} - {isDirectory ? <img src={folderIcon} alt="Folder" /> : <img src={fileIcon} alt="File" />}
        </p>
    );
}

export default File;
