import { Router } from "express";
import { uploadPfp, deletePfp  } from "../handlers/pfps";
import multer from "multer";

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.put('/:username', upload.single('file'), uploadPfp);


// don't really need to delete tbh
// already have flag in user to know if we need to 
// router.delete('/:username', deletePfp);



export default router;