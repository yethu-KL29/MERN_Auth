const express= require("express");
const { signup, login, verifiedToken } = require("../controllers/userController");
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifiedToken);



module.exports=router;