const fs = require('fs');
import path from 'path';

export type File = {
    name: string,
    isDirectory: boolean
};

export class FileSystem {

    private workingDirectory: File;

    constructor(){
        this.workingDirectory = {name: "/backend/reese", isDirectory: true};
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


    getWorkingDir(): File{
        return this.workingDirectory;
    }

    changeDirectory(f: File): boolean {
        let newPath;
    
        if (f.name === "..") {
            // Move up one directory level, but check if it's already the root
            if (this.workingDirectory.name !== "/") {
                newPath = path.dirname(this.workingDirectory.name);
            } else {
                console.log("Already at the root directory, cannot move up further.");
                return false;
            }
        } else {
            // Resolve the new path normally
            newPath = path.join(this.workingDirectory.name, f.name);
    
            // Security Check: Prevent path traversal outside the intended directory structure
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
    
    
    
    
    
}
