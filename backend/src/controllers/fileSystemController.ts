import { Request, Response } from "express";
import { FileSystem } from "../models/FileSystem";
import { File } from "../models/File"; 
import StatusCodes from "./StatusCodes";
import { verifySessionID } from "./userController";
import path from 'path'; 
import * as nodeFS from 'fs';
import { log } from "console";


export const fs = new FileSystem();

export const getFilesInWorkingDir = (req: Request, res: Response) => {
    try{

        const sessionID = req.body.sessionID;
        if(!verifySessionID(sessionID)){
            console.log("FAILED HERE");
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to authenticate user"
        });
    }

        const responseFiles = fs.getFilesInWorkingDir();
        res.json({ responseFiles });
    }
    catch(error: any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: 'Error retrieving files', 
            error: error.message 
        });
    }
}

export const makeDirectory = (req: Request, res: Response) => {

    try{
        const dirName = req.body.dirName;
        const result = fs.makeDirectory(dirName);
        res.json({ result });
    } catch(error: any){
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error creating directory",
            error: error.message
        });
    }
}

export const getWorkingDir = (req: Request, res: Response) => {
    try{
        const wd = fs.getWorkingDir();
        res.json({ wd });
    }
    catch(error: any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error retrieving working directory',
            error: error.message
        });
    }
}

export const changeDirectory = (req: Request, res: Response) => {

    const { name, isDirectory } = req.body as File;

    if(typeof name !== 'string' && typeof isDirectory !== 'boolean'){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad request data"
        });
    }

    try{
        const success = fs.changeDirectory({ name, isDirectory});

        if(success){
            //note: this could still mean that they cd .. from root
            res.json({
                message: 'Directory changed sucessfully'
            });
        } else{
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Failed to change directory',
            })
        }
    }
    catch(error: any){
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error changing directory",
            error: error.message
        });
    }

}

//File upload and download do not directly modify the FileSystem Wrapper

export const uploadFile = (req: Request, res: Response) => {
    try {
        // req.file contains the uploaded file info
        const uploadedFile = req.file;

        res.json({ message: 'File uploaded successfully', file: uploadedFile });
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error uploading file',
            error: error.message
        });
    }
};

export const downloadFile = (req: Request, res: Response) => {
    const filename = req.params.filename;
    const workingDir = fs.getWorkingDir().name;
    const filePath = path.join(workingDir, filename);

    console.log("Body")
    console.log(req.body);

    const sessionID = req.body.sessionID;
    if(!verifySessionID(sessionID)){
        console.log("FAILED HERE");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to authenticate user"
        });
    }

    // check if the file exists in the working directory
    if (nodeFS.existsSync(filePath)) {
        res.download(filePath, filename, (err) => {
            if (err) {
                if (res.headersSent) {
                    console.error('Headers already sent to the client, cannot send another response');
                } else {
                    console.error(err);
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                        .send('Error occurred during file download');
                }
            }
        });
    } else {
        return res.status(StatusCodes.NOT_FOUND).send('File not found');
    }

};

