const express= require("express");
const { signup, login, verifiedToken, getUser } = require("../controllers/userController");
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifiedToken,getUser);



module.exports=router;