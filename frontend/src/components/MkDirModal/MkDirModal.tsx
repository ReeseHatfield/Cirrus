import React, { useState } from 'react'
import Modal from 'react-modal';
import { Button } from '@mui/material';


interface mkDirModalProps{
    backendPoint: string,
    fetchData: () => void
};

const MkDirModal = ({ backendPoint, fetchData }: mkDirModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dirName, setDirName] = useState('')

    const openModal = () => {setIsOpen(true)};
    const closeModal = () => {setIsOpen(false)};

    const handleInputChange = (e) => {
        setDirName(e.target.value);
    }

    const makeDirectory = () => {
        if(!dirName){
            alert("Please name the directory!");
            return;
        }

        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dirName: `${dirName}`})
        };

        const response = fetch(`${backendPoint}/api/mkdir`, reqOptions);
        console.log(`Directory made?=${response}`);

        closeModal();
        
        fetchData();
    }

    
    return (
        <>
            <Button 
                type='button'
                onClick={openModal}
                variant='contained'
                className='button'
            > New Folder
            </Button>
            <Modal

                isOpen={isOpen}
                onRequestClose={closeModal}
            >
                <div className='folder-modal'>
                    <input 
                        type="text" 
                        value={dirName} 
                        onChange={handleInputChange} 
                        placeholder="Enter new folder name" 
                    />
                    <button onClick={makeDirectory}>Add Folder</button>
                </div>
            </Modal>
        </>
    )
}

export default MkDirModal