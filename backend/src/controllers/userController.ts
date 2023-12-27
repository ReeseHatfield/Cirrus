import { Request, Response } from "express";
import StatusCodes from "../config/StatusCodes";
import hash from "../security/hasher"
const fs = require('fs');
import crypto from 'crypto';
import { error } from "console";

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
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "User Unauthorized"
            })
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
    console.log(`idToCheck: ${JSON.stringify(idToCheck)}`);
    console.log(`sessionID: ${global.sessionID}`);

    return idToCheck === global.sessionID;
}