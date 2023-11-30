import React, { useCallback, useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload';
import FileDownload from '../components/FileDownload';
import FileDisplay from '../components/FileDisplay';

const BACK_END_POINT = "http://localhost:3001";

export const Home = () => {


    return (
        <>
        <div>
            <FileDisplay backendPoint={BACK_END_POINT} />
        </div>
        <FileUpload backendPoint={BACK_END_POINT} />
        <FileDownload backendPoint={BACK_END_POINT} />
        </>
    );
};

export default Home;
