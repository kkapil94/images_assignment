import { Router } from "express";
import { isValidated } from "../middleware/isValidated.js";
import { addImage, getAllImages, getImage, incView } from "../apiController/imageController.js";
import singleUpload from "../middleware/multer.js";

const router = Router();

router.post("/add",isValidated,singleUpload,addImage)
router.post("/inc-view/:id",isValidated,incView)
router.get("/images",isValidated,getAllImages);
router.get("/image/:id",isValidated,getImage);

export default router