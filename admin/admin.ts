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

/**
 * The function `adminConsole` creates a console interface that displays a menu and prompts the user
 * for input, executing different options based on the input.
 */
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

/**
 * The menu function displays a list of options for the user to choose from.
 */
function menu(){
    console.log("Options:");
    console.log("1: Add user");
    console.log("2: Remove user");
    // other features I might add later
    console.log("9: Exit");
}

/**
 * The function "exit" is used to terminate the current process with an exit code of 0.
 */
function exit(){
    process.exit(0);
}


/**
 * The function `addUser` adds a new user to a database by prompting for a username and password,
 * hashing the password, and storing the user information in a JSON file.
 * @returns N/A
 */
function addUser(){
    console.log("Adding user...");

    const username: string = readline.question("Username: ");
    const password: string = readline.question("Password: ");

    const result: string[] = hash(password);

    const hashedPassword: string = result[0];
    const salt: string = result[1];

    const json = {
        [username]: {
            password: hashedPassword,
            salt: salt
        }
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

/**
 * The function removes a user from a database by finding their username and deleting their entry.
 * @returns N/A.
 */
function removeUser() {
    console.log("Removing user...");

    const username: string = readline.question("Enter username to remove: ");

    let users: any = JSON.parse(database);

    
    if (!Array.isArray(users)) {
        console.error("Database is not formatted correctly. It should be an array.");
        return;
    }

    
    const index = users.findIndex((user: any) => user[username]);

    if (index === -1) {
        console.log("User not found.");
        return;
    }

    users.splice(index, 1);

    const usersJson = JSON.stringify(users);
    fs.writeFileSync(dbPath, usersJson, "utf-8");

    console.log(`User ${username} removed.`);
}



