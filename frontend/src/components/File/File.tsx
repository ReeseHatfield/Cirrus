import React from 'react';
// @ts-ignore
import folderIcon from '../../assets/folder.svg';
// @ts-ignore
import fileIcon from '../../assets/file.svg';

interface FileProps {
    name: string;
    isDirectory: boolean;
    index: number;
};

const File = ({ name, isDirectory, index }: FileProps) => {
    return (
        <p key={index}>
            {name} - {isDirectory ? <img src={folderIcon} alt="Folder" /> : <img src={fileIcon} alt="File"/>}
        </p>
    );
}

export default File;
