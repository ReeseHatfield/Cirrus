import React, { useCallback, useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload/FileUpload';
import FileDownload from '../components/FileDownload/FileDownload';
import Display from '../components/Display/Display';

const BACK_END_POINT = "http://localhost:3001";

export const Home = () => {

    //need to wrap this with a router at some point
    return (
        <>
            <div>
                <Display backendPoint={BACK_END_POINT} />
            </div>
            <FileUpload backendPoint={BACK_END_POINT} />
            {/* <FileDownload backendPoint={BACK_END_POINT} /> */}
        </>
    );
};

export default Home;
