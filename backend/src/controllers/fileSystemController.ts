import { Request, Response } from "express";
import { FileSystem } from "../models/FileSystem";
import { File } from "../models/File";  

const StatusCodes = {
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
};

const fs = new FileSystem();

export const getFilesInWorkingDir = (req: Request, res: Response) => {
    try{
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
