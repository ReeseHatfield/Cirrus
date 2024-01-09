import React, { useCallback, useEffect, useState } from 'react';
import FileUpload from '../../components/FileUpload/FileUpload';
import Display from '../../components/Display/Display';
import { useLocation } from 'react-router-dom';


interface homeProps {
    backEndPoint: string
}

export const Home = ({ backEndPoint }: homeProps) => {

    const { state } = useLocation();

    const sessionID = state;

    return (
        <>
            <div className="fullscreen-bg"></div>
            <div className='content'>
                <Display backendPoint={backEndPoint} sessionID={sessionID} />
            </div>
        </>
    );
};

export default Home;
