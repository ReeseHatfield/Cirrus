import * as fs from 'fs';
import path, { dirname } from 'path';
import { File } from "./File";


const rootDirName = "/backend/cirrus";
const specialDirectories = ['.', '..'];

export class FileSystem {

    private workingDirectory: File;

    constructor(){
        this.workingDirectory = {name: rootDirName, isDirectory: true};
    }


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
