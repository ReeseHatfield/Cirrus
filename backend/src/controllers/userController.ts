import { Request, Response } from "express";
import StatusCodes from "./StatusCodes";
import hash from "../security/hasher"
const fs = require('fs');
import crypto from 'crypto';
import { error } from "console";

/**
 * `authenticateUser`: used to authenticate a user by comparing their provided username
 * and password with the stored credentials in a database.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body. In this code, it is used to send the authentication result back
 * to the client by
 * @returns a response object with a status code and a JSON object containing a message.
 */
export const authenticateUser = (req: Request, res: Response) => {
    // TODO: move into model
    try{
        const { username, password } = req.body;

        const dbPath = "../backend/src/security/database.json";
        let database = fs.readFileSync(dbPath, "utf-8");

        let users: any = JSON.parse(database);
        const index = users.findIndex((user: any) => user[username]);

        if (index === -1) {
            console.log("User not found.");
            return;
        }
        
        const userData = users[Object.keys(users)[index]];

        //really need to fix this line at some point
        const salt = JSON.parse(JSON.stringify(Object.values(userData)[0])).salt;
        const correctHashedPassword = JSON.parse(JSON.stringify(Object.values(userData)[0])).password;

        const tryHash = salt + password;

        const hashed: string = crypto.createHash('sha256').update(tryHash).digest('hex');

        const uuid: string = crypto.randomUUID(); 
        global.sessionID = uuid;

        if(correctHashedPassword === hashed){
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
    console.log(`idToCheck: ${idToCheck}`);
    console.log(`sessionID: ${global.sessionID}`);

    return idToCheck === global.sessionID;
}