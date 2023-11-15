
import { Router } from 'express';

import * as fileSystemController from "../controllers/fileSystemController";


export const router = Router();

router.get('/ls', fileSystemController.getFilesInWorkingDir);
router.get('/getWorkingDir', fileSystemController.getWorkingDir);
router.post('/cd', fileSystemController.changeDirectory);
router.post('/mkdir', fileSystemController.makeDirectory);

export default router;