
import { Router } from 'express';
import multer from 'multer';

import * as fileSystemController from "../controllers/fileSystemController";

// configure file upload storage to point to the current wd
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const workingDir = fileSystemController.fs.getWorkingDir().name;
        cb(null, workingDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // use the original file name
    },
});

const upload = multer({storage: storage});

export const router = Router();

router.get('/ls', fileSystemController.getFilesInWorkingDir);
router.get('/getWorkingDir', fileSystemController.getWorkingDir);
router.post('/cd', fileSystemController.changeDirectory);
router.post('/mkdir', fileSystemController.makeDirectory);
router.post('/upload', upload.single('file'), fileSystemController.uploadFile)

export default router;