const express= require("express");
const { signup, login, verifiedToken, getUser, refreshToken, Logout } = require("../controllers/userController");
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifiedToken,getUser);
// router.get("/refresh",refreshToken,verifiedToken,getUser);
router.get("/logout",verifiedToken,Logout)



module.exports=router;