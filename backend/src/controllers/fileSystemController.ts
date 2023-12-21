import { Request, Response } from "express";
import { FileSystem } from "../models/FileSystem";
import { File } from "../models/File"; 
import StatusCodes from "../config/StatusCodes";
import { verifySessionID } from "./userController";
import { exec } from "child_process";

import path from 'path'; 
import * as nodeFS from 'fs';
import { stderr } from "process";



export const fs = new FileSystem();

/**
 * `getFilesInWorkingDir` retrieves the files in the working directory and sends the
 * response to the client, handling any errors that occur.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response containing the `responseFiles` array.
 */
export const getFilesInWorkingDir = (req: Request, res: Response) => {
    try{

        const sessionID = req.body.sessionID;
        if(!verifySessionID(sessionID)){
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

export const tree = (req: Request, res: Response) =>{
    try{
        
        exec('tree cirrus', (err, stdout, stderr) =>{

            if(err || stderr){
                console.log("Error running tree command");
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "Error running tree command",
                })
            }
            

            res.status(StatusCodes.OK).json({
                stdout
            })
        })
    }
    catch(error: any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error getting tree view",
            error: error.message
        });
    }
}


/**
 * `deleteFile` is a TypeScript function that handles the deletion of a file, verifying
 * the user's session ID and returning appropriate responses.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body. In this code snippet, it is used to send JSON responses with
 * status codes and error
 * @returns `deleteFile` returns a response object with a status code and a JSON object
 * containing a message.
 */
export const deleteFile = (req: Request, res: Response) => {
    try{

        console.log(JSON.stringify(req.body));
        const sessionID = req.body.sessionId;
        if(!verifySessionID(sessionID)){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to authenticate user"
            });
        }

        const filename: string = req.body.name;

        const success = fs.deleteFile(filename);
        if(success){
            res.status(StatusCodes.OK).json({
                message: 'Success'
            });
        }
        else{
            throw Error;
        }
        
    }
    catch(error: any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error deleting',
            error: error.message
        })
    }
}

/**
 * `makeDirectory` creates a directory with the specified name and returns the result, or
 * throws an error if there is a problem.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is an instance of the `Response` class, which provides methods for
 * sending the response data.
 */
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

/**
 * `getWorkingDir` retrieves the current working directory and sends it as a JSON
 * response, or returns an error message if there is an error.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is used to send the response data, set response headers, and control the
 * response status code.
 */
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

/**
 * `changeDirectory` takes a request and response object, checks the validity of the
 * request data, attempts to change the directory using the provided name and isDirectory values, and
 * sends an appropriate response based on the success or failure of the operation.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns a response object with a JSON payload. The payload contains a message indicating the
 * success or failure of the directory change operation. 
 */
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

/**
 * `uploadFile` handles the uploading of a file and returns a response with the uploaded
 * file information or an error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information about the request, such as the request headers, request body,
 * request method, and request URL.
 * @param {Response} res - The `res` parameter is an instance of the `Response` object from the
 * Express.js framework. It represents the HTTP response that will be sent back to the client.
 */
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

/**
 * `downloadFile` is used to download a file from the server, after verifying the user's
 * session ID.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request method, request URL, request
 * body, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting headers, sending data, and setting the status code.
 * @returns a response object with the appropriate status code and message.
 */
export const downloadFile = (req: Request, res: Response) => {
    const filename = req.params.filename;
    const workingDir = fs.getWorkingDir().name;
    const filePath = path.join(workingDir, filename);

    console.log("Body")
    console.log(req.body);

    const sessionID = req.body.sessionID;
    if(!verifySessionID(sessionID)){
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

