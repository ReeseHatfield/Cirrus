import * as fs from 'fs';
import path, { dirname } from 'path';
import { File } from "./File";


const rootDirName = "/backend/cirrus";
const specialDirectories = ['.', '..'];

export class FileSystem {

    private workingDirectory: File;

    /**
     * The constructor initializes the working directory with a root directory name.
     */
    constructor(){
        this.workingDirectory = {name: rootDirName, isDirectory: true};
    }


    /**
     * The function changes the working directory to the root directory and returns true if successful,
     * otherwise it returns false and logs an error message.
     * @returns a boolean value. If the directory is successfully changed to the root directory, it
     * will return true. If there is an error, it will return false.
     */
    changeDirToRoot(): boolean {
        try{
            this.workingDirectory = { name: rootDirName, isDirectory: true };
            return true;
        }
        catch(err: any){
            console.error("Error changing directory");
            return false;
        }
    }

    /**
     * `getFilesInWorkingDir` retrieves all files and directories in the current working
     * directory and returns them as an array of `File` objects.
     * @returns `getFilesInWorkingDir()` returns an array of `File` objects.
     */
    getFilesInWorkingDir(): File[] {

        console.log(`wd: ${JSON.stringify(this.workingDirectory)}`);
        let allFilesInDir: File[] = [];
        try {
        
            const files: string[] = fs.readdirSync(this.workingDirectory.name);

            files.forEach(element => {
                const fullPath = path.join(this.workingDirectory.name, element);
                const isDirectory = fs.statSync(fullPath).isDirectory();

                allFilesInDir.push({ name: fullPath, isDirectory: isDirectory }); // Store fullPath for accurate directory comparison
            });
        } catch (err) {
            console.error("Error reading the directory", err);
            return [{ name: "ERROR", isDirectory: false }];
        }

        return allFilesInDir;
    }


    /**
     * "getWorkingDir" returns the working directory as a File object.
     * @returns The working directory as a File object.
     */
    getWorkingDir(): File {
        return this.workingDirectory;
    }

    deleteFile(filename: string): boolean {

        try{
            const fullPath = path.join(this.workingDirectory.name, filename);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                fs.rmSync(fullPath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(fullPath);
            }

            return true;
        }
        catch(err: any){
            return false;
        }
        
    }



    /**
     *  changeDirectory: hanges the current working directory to a specified
     * directory, while performing security checks and handling errors.
     * @param {File} f - The parameter `f` is of type `File`, which represents a file or directory.
     * @returns `changeDirectory` returns a boolean value.
     */
    changeDirectory(f: File): boolean {
        let newPath;
    
        if (f.name === "..") {
            if (this.workingDirectory.name !== rootDirName) {
                newPath = path.dirname(this.workingDirectory.name);
            } else {
                console.log("Already at the root directory, cannot move up further.");
                return false;
            }
        } else {

            newPath = path.join(this.workingDirectory.name, f.name);
    
            if (!newPath.startsWith(this.workingDirectory.name)) {
                console.error("Security Alert: Attempted path traversal attack.");
                return false;
            }
        }
    
        try {
            const stat = fs.statSync(newPath);
            if (stat.isDirectory()) {
                this.workingDirectory = { name: newPath, isDirectory: true };
                console.log(`Changed directory to ${newPath}`);
                return true;
            } else {
                console.log("Cannot change directory: the path is not a directory.");
                return false;
            }
        } catch (err) {
            console.error(`Cannot change directory: the path does not exist or is not accessible. Error: ${err}`);
            return false;
        }
    }
    
    /**
     * creates a new directory with the given name in the current working directory,
     * unless the name is already taken or is a special directory.
     * @param {string} newDirName - The newDirName parameter is a string that represents the name of
     * the new directory that you want to create.
     * @returns a boolean value. It returns true if the directory is successfully created, and false if
     * it is not.
     */
    makeDirectory(newDirName: string): boolean {
        if(specialDirectories.includes(newDirName)){
            console.log("Cannot create '.' or '..'")
            return false;
        }

        const fullPath = path.join(this.workingDirectory.name, newDirName);

        if(fs.existsSync(fullPath)){
            console.log(`Cannot create directory because directory already named ${newDirName} exists`);
            return false;
        }

        fs.mkdirSync(fullPath, { recursive: true });
        return true;

    }
    
}
