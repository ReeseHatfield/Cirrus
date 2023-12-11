import React, { useState } from 'react';
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


    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [showMenu, setShowMenu] = useState(false);

    const handleContextMenu = (event) => {
        event.preventDefault(); // Prevent default right-click menu
        setMenuPosition({ x: event.pageX, y: event.pageY });
        setShowMenu(true);
    };

    const handleDelete = async () => {
        console.log(`Delete me!`);
        console.log(name)
        setShowMenu(false); // Hide the menu after sending the request
    };

    const handleClick = () => {
        setShowMenu(false);
    };

    return (
        <div onClick={handleClick} onContextMenu={handleContextMenu}>

            {showMenu && (
                <div
                    className="context-menu"
                    style={{
                        position: 'absolute',
                        top: `${menuPosition.y}px`,
                        left: `${menuPosition.x}px`
                    }}
                >
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}

            <p key={index} 
                className="file" 
                onClick={() => onClick(name, isDirectory)} 
                onDoubleClick={() => onDoubleClick(name, isDirectory)}>
                {name} - {isDirectory ? <img src={folderIcon} alt="Folder" /> : <img src={fileIcon} alt="File" />}
            </p>
        </div>
    );
}

export default File;
