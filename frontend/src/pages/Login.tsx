import React, { useState } from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import Modal from 'react-modal';

import Button from '@mui/material/Button';

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
            const response = await fetch(`${backEndPoint}/auth`, {
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

    //

    return (
        <>
            <h2>Login</h2>
            <Modal 
                isOpen={modelIsOpen}
                onRequestClose={closeModal}
            >
                Unauthorized Username or Password!
            </Modal>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" variant='contained'>Login</Button>
            </form>
        </>
    );
};

export default LoginPage;
