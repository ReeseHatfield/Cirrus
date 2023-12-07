import React, { useCallback, useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload/FileUpload';
import FileDownload from '../components/FileDownload/FileDownload';
import Display from '../components/Display/Display';
import { useLocation } from 'react-router-dom';


interface homeProps {
    backEndPoint: string
}

export const Home = ({ backEndPoint }: homeProps) => {

    const { state } = useLocation();

    const sessionID = state;

    console.log(`session id (from backend): ${sessionID}`);

    //need to wrap this with a router at some point
    return (
        <>
            <div>
                <Display backendPoint={backEndPoint} sessionID={sessionID} />
            </div>
            <FileUpload backendPoint={backEndPoint} />
        </>
    );
};

export default Home;
