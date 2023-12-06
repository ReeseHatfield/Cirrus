const readline = require('readline-sync');
const fs = require('fs');

import hash from "../backend/src/security/hasher";

const dbPath = "../backend/src/security/database.json";
let database = fs.readFileSync(dbPath, "utf-8");

const options: any = {
    1: addUser,
    2: removeUser,
    9: exit
};

function adminConsole(){

    while(true){
        menu();
        const input = readline.question("Input: ");
        try{
            options[input]();
        } catch (err){
            console.log("Invalid input \n");
        }
        
    }
    
}

adminConsole();

function menu(){
    console.log("Options:");
    console.log("1: Add user");
    console.log("2: Remove user");
    // other features I might add later
    console.log("9: Exit");
}

function exit(){
    process.exit(0);
}


function addUser(){
    console.log("Adding user...");

    const username: string = readline.question("Username: ");
    const password: string = readline.question("Password: ");

    const hashedPassword: string = hash(password);

    const json = {
        [username]: hashedPassword
    };

    const users: any = JSON.parse(database);

    // Check if users is an array
    if (!Array.isArray(users)) {
        console.error("Database is not formatted correctly. It should be an array.");
        return;
    }

    users.push(json);

    const usersJson = JSON.stringify(users);

    fs.writeFileSync(dbPath, usersJson, "utf-8");
}

function removeUser() {
    console.log("Removing user...");

    const username: string = readline.question("Enter username to remove: ");

    let users: any = JSON.parse(database);

    // Check if users is an array
    if (!Array.isArray(users)) {
        console.error("Database is not formatted correctly. It should be an array.");
        return;
    }

    // Find the index of the user to be removed
    const index = users.findIndex((user: any) => user[username]);

    if (index === -1) {
        console.log("User not found.");
        return;
    }

    // Remove the user from the array
    users.splice(index, 1);

    // Update the database
    const usersJson = JSON.stringify(users);
    fs.writeFileSync(dbPath, usersJson, "utf-8");

    console.log(`User ${username} removed.`);
}



