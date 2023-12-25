import React, { useState, useCallback } from 'react';
// @ts-ignore
import folderIcon from '../../assets/folder.svg';
// @ts-ignore
import fileIcon from '../../assets/file.svg';

import { useNavigate } from 'react-router-dom';

import './File.css';


interface FileProps {
    name: string;
    isDirectory: boolean;
    index: number;
    sessionId: string;
    backendPoint: string;
    onClick: (name: string, isDirectory: boolean) => void;
    onDoubleClick: (name: string, isDirectory: boolean) => void;
    sessionID: string
};

const File = ({ name, isDirectory, index,sessionId, backendPoint, onClick, onDoubleClick, sessionID }: FileProps) => {
    const pathArr = name.split('/');
    name = pathArr[pathArr.length - 1];

    const navigate = useNavigate();


    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [showMenu, setShowMenu] = useState(false);

    const handleContextMenu = (event) => {
        event.preventDefault(); // prevent default right-click menu
        setMenuPosition({ x: event.pageX, y: event.pageY });
        setShowMenu(true);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${backendPoint}/api/rm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId, name }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error sending POST request:', error);
        }

        setShowMenu(false); // hide menu

        window.location.reload();

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
