import multer from "multer";
import { fs } from '../controllers/fileSystemController';


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