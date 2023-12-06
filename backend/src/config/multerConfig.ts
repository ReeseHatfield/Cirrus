import multer from "multer";
import { fs } from '../controllers/fileSystemController';



/* The code is creating a storage configuration for multer, a middleware for handling file uploads in
Node.js. */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const workingDir = fs.getWorkingDir().name;
        cb(null, workingDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // use the original file name
    },
});

export default storage;