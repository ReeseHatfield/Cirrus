import React, { useState, useEffect, useCallback,  } from 'react';
import Directory from '../Directory/Directory';
import Back from '../Back/Back';
import { useNavigate } from 'react-router-dom';
import MkDirModal from '../MkDirModal/MkDirModal';
import Root from '../Root/Root';
import Tree from '../Tree/Tree';
import FileUpload from '../FileUpload/FileUpload';
import Modal from 'react-modal';
import Unauthorized from '../Unauthorized/Unauthorized';

import './Display.css'

interface displayProps {
    backendPoint: string;
    sessionID: string
}

const Display = ({ backendPoint, sessionID }: displayProps) => {
    const [data, setData] = useState<string>("");
    const navigate = useNavigate()
    const [isSending, setIsSending] = useState(false);
    const [selectedFile, setSelectedFile] = useState<{ name: string, isDirectory: boolean } | null>(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    const fetchData = useCallback(() => {
        fetch(`${backendPoint}/api/ls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionID })
        }).then(response => {

            if(response.status === 500){
                setModalIsOpen(true);
                // navigate('/login');
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.text();

        })
        .then(text => {
            setData(text);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }, []);

    const changeDirectory = useCallback((directoryName: string) => {
        if (isSending) return;

        setIsSending(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: directoryName })
        };

        fetch(`${backendPoint}/api/cd`, requestOptions)
            .then(() => {
                fetchData(); // Fetch data again after changing directory
            })
            .catch(error => {
                console.error('Fetch error:', error);
            })
            .finally(() => {
                setIsSending(false);
            });
    }, []);

    const handleFileClick = (name: string, isDirectory: boolean) => {
        setSelectedFile({ name, isDirectory });
    };

    const handleFileDoubleClick = async (name: string, isDirectory: boolean) => {
        if (isDirectory) {
            changeDirectory(name);
        } else {
            // Download file logic
            const response = await fetch(`${backendPoint}/api/download/${name}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sessionID })
            });

            console.log(response);
            if (response.ok) {
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = name;
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                alert('File not found or error downloading');
            }
        }
    };


    return ( 
        <div className='display'>
            <div className="modal">{getModalOverlay(modalIsOpen, closeModal, () => {navigate('/login')})}</div>
            <Tree backendPoint={backendPoint}></Tree>
            <div>
                <span className='bar'>
                    <Back backendPoint={backendPoint} fetchData={fetchData} />
                    <Root backendPoint={backendPoint} fetchData={fetchData} />
                </span>
                <div>
                    <Directory
                        sessionID={sessionID}
                        backEndPoint={backendPoint}
                        data={data} 
                        onFileClick={handleFileClick} 
                        onFileDoubleClick={handleFileDoubleClick} 
                    />
                </div>
                <span className='bar'>    
                    <MkDirModal backendPoint={backendPoint} fetchData={fetchData}></MkDirModal>
                    <FileUpload backendPoint={backendPoint} sessionID={sessionID} />
                </span>
            </div>
        </div>
    );
}



const getModalOverlay = (isOpen, closeModalFunc, btnAction) => {
    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '500px', 
            maxHeight: '5000px',
            padding: '20px', 
            border: '1px solid #ccc',
            borderRadius: '4px', 
        },
        overlay: {
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
    };

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={closeModalFunc}
            style={modalStyles}
        >
            <Unauthorized 
                message='Unauthorized Username or Password'
                buttonAction={btnAction}
                buttonMessage='Back'
            />
        </Modal>
    )
}

export default Display;
