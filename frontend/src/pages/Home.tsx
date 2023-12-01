import React, { useCallback, useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload';
import FileDownload from '../components/FileDownload';
import DisplayWrapper from '../components/DisplayWrapper';

const BACK_END_POINT = "http://localhost:3001";

export const Home = () => {

    //need to wrap this with a router at some point
    return (
        <>
            <div>
                <DisplayWrapper backendPoint={BACK_END_POINT} />
            </div>
            <FileUpload backendPoint={BACK_END_POINT} />
            <FileDownload backendPoint={BACK_END_POINT} />
        </>
    );
};

export default Home;
