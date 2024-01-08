import { Request, Response } from "express";
import StatusCodes from "../config/StatusCodes";
import hash from "../security/hasher"
const fs = require('fs');
import crypto from 'crypto';
import { createClient } from "redis";

export const authenticateUser = async (req: Request, res: Response) => {
    
    const client = await createClient({
        url: 'redis://host.docker.internal:6379'
    }).on('error', err => console.log("Redis Client Error")).connect();


    try{
        const { username, password } = req.body;

        console.log(`Username: ${username}, Password: ${password}`);

        const value: string | null = await client.get(username);

        if(value == null){
            console.log("User not found.");
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "User Unauthorized"
            })
            return;
        }

        const [correctHash, salt ]= value.split(',');

        console.log(correctHash);
        console.log(salt);

        const tryHash = salt + password;
        
        const hashed: string = crypto.createHash('sha256').update(tryHash).digest('hex');

        const uuid: string = crypto.randomUUID(); 
        global.sessionID = uuid;

        if(correctHash === hashed){
            res.status(StatusCodes.OK).json({
                message: "User authenticated",
                sessionID: sessionID
            });
        }
        else{
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "User Unauthorized"
            })
        }

    }
    catch(error: any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to autheniticate user",
            error: error.message
        })
    }
}

export const verifySessionID = (idToCheck: string) => {
    console.log(`idToCheck: ${JSON.stringify(idToCheck)}`);
    console.log(`sessionID: ${global.sessionID}`);

    return idToCheck === global.sessionID;
}