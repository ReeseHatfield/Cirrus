import React, { useState } from 'react'
import Modal from 'react-modal';


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

        const response = fetch(`${backendPoint}/mkdir`, reqOptions);
        console.log(`Directory made?=${response}`);

        closeModal();
        
        fetchData();
    }

    
    return (
        <>
            <button onClick={openModal}>New Folder</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
            >
                <div>
                    <input 
                        type="text" 
                        value={dirName} 
                        onChange={handleInputChange} 
                        placeholder="Enter file name" 
                    />
                    <button onClick={makeDirectory}>Add Folder</button>
                </div>
            </Modal>
        </>
    )
}

export default MkDirModal