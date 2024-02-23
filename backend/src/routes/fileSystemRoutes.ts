
import { Router } from 'express';
import multer from 'multer';

import * as fileSystemController from "../controllers/fileSystemController";
import * as userController from "../controllers/userController";
import storage from '../config/multerConfig';

/**
 *  'createRouter' generates a router with all required endpoints
 *  It also configs the router for multer for file up/download
 * @returns Generated router
 */
const createRouter = () => {
    const router = Router();

    const upload = multer({storage: storage});

    router.post('/ls', fileSystemController.getFilesInWorkingDir);
    router.get('/getWorkingDir', fileSystemController.getWorkingDir);
    router.post('/cd', fileSystemController.changeDirectory);
    router.post('/mkdir', fileSystemController.makeDirectory);
    router.post('/rm', fileSystemController.deleteFile);
    router.get('/tree', fileSystemController.tree);
    router.post('/upload', upload.single('file'), fileSystemController.uploadFile)
    router.post('/download/:filename', fileSystemController.downloadFile);
    router.post('/auth', userController.authenticateUser);
    router.get('/cdRoot', fileSystemController.changeDirectoryToRoot);

    return router;
}


const router = createRouter();
export default router;

