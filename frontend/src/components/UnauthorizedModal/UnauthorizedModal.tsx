import React, { useState } from 'react'
import Modal from 'react-modal';

interface unauthorizedModalProps {
    isOpen: boolean;
}

export const UnauthorizedModal = ({ isOpen }: unauthorizedModalProps) => {
    const [_, setIsOpen] = useState(false);
    const closeModal = () => {setIsOpen(false)};
    
    return (
        <>
            <Modal
                onRequestClose={closeModal}
                isOpen={isOpen}
            >
                <div>
                    Unauthorized Username or Password
                </div>
                <button onClick={closeModal}></button>
            </Modal>
        </>
    )
}
