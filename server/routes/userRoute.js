import { Router } from "express";
import { getUser, login, register, searchUser} from "../apiController/userController.js";
import { isValidated } from "../middleware/isValidated.js";
import singleUpload from "../middleware/multer.js";

const router = Router();

router.get("/",isValidated,searchUser)
router.get("/get-user",isValidated,getUser)
router.post("/register",singleUpload,register)
router.post("/login",login)
export default router 