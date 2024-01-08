import React, { useState } from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import { Unauthorized } from '../../components/Unauthorized/Unauthorized';

import './Login.css';

import { TextField, Typography } from '@mui/material';

interface loginProps{
    backEndPoint: string
}

const LoginPage = ( {backEndPoint }: loginProps ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate: NavigateFunction = useNavigate();

    const [modelIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {setModalIsOpen(false)};
    const openModal = () => {setModalIsOpen(true)};
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${backEndPoint}/api/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                setModalIsOpen(true);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data);

            navigate('/home', { state: data.sessionID });

        } catch (error) {
            console.error('Login error', error);
        }
    };


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
            backgroundColor: 'rgba(0, 0, 0, 0.75)' // Optional, for semi-transparent overlay
        }
    };
    

    return (

        <>
            <div className="fullscreen-bg"></div>
            <div className='red-haze'></div>
            <div className='content'>
                <h2>Cirrus</h2>

                <Modal 
                    isOpen={modelIsOpen}
                    onRequestClose={closeModal}
                    style={modalStyles}
                >
                    <Unauthorized 
                        message='Unauthorized Username or Password'
                        buttonAction={closeModal}
                        buttonMessage='Back'
                    />
                </Modal>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div>
                        <Typography component="h2" variant="h5">
                            Username
                        </Typography>
                        <TextField
                            margin='normal'
                            type="text"
                            id="username"
                            variant='outlined'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography component="h2" variant="h5">
                            Password
                        </Typography>
                        <TextField
                            margin='normal'
                            variant='outlined'
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        className='mui-btn'
                        type="submit" 
                    >Login</button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
