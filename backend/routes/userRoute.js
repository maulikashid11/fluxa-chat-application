import { Router } from "express";
import { getOtherUsers, getUser, login, logout, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../configs/multer.js";

const router = Router();

router.post('/register', upload.single("profilePhoto"), register);
router.post('/login', login);
router.get('/getuser', isAuthenticated, getUser);
router.get('/logout', isAuthenticated, logout);
router.get('/getotherusers', isAuthenticated, getOtherUsers);

export default router;