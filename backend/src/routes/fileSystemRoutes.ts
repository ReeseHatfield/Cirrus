
import { Router } from 'express';
import multer from 'multer';

import * as fileSystemController from "../controllers/fileSystemController";
import storage from '../config/multerConfig';


const upload = multer({storage: storage});

export const router = Router();

router.get('/ls', fileSystemController.getFilesInWorkingDir);
router.get('/getWorkingDir', fileSystemController.getWorkingDir);
router.post('/cd', fileSystemController.changeDirectory);
router.post('/mkdir', fileSystemController.makeDirectory);
router.post('/upload', upload.single('file'), fileSystemController.uploadFile)
router.get('/download/:filename', fileSystemController.downloadFile);

export default router;