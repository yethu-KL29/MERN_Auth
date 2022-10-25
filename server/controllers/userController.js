const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const KEY ="loveu";
const signup = async(req,res,next)=>{
    const{name,email,password} = req.body
    let existingUser;
    try {
        existingUser=await User.findOne({email:email})
    } catch (error) {
        console.log("poda")
    }
    if(existingUser){
        console.log(email)
        return res.status(400).json({message:"user already existed"});
        
    }
   const hashedPass = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password:hashedPass
    })
    try{
        await user.save();
    }catch(e){
        console.log("error")
    }
    return res.status(201).json({message:user});
}



const login=async(req,res,next)=>{
    const {email,password} = req.body;
    let existingUser;
    try{
    existingUser = await User.findOne({email:email})
    }catch(e){
      
    }
    if(!existingUser){
        return res.status(400).json({message:"user not existed"});
    }
        const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    
    if(!isPasswordCorrect){
        return res.status(400).json({message:"password is incorrect"});
    }
    const token = jwt.sign({id:existingUser._id},KEY,{
        expiresIn:"1hr"
    })
    // console.log("generated token",token)
    // if(req.cookies[`${existingUser._id}`]){
    //     req.cookies[`${existingUser._id}`]=""
    // }
    res.cookie(String(existingUser._id),token,{
        path :"/",
        expires:new Date(Date.now()+1000*30000),
        httpOnly:true,
        sameSite:'lax'
    })
    return res.status(200).json({message:"successfull",user:existingUser,token});

   
};
   const verifiedToken=(req,res,next)=>{
    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1];
    console.log(token)
    if(!token){
        res.status(404).json({message:"no token found"})
    }
    jwt.verify(String(token),KEY,(err,user)=>{
        if(err){
         return   res.status(404).json({message:"invalid tokenfound"})

        }
        console.log(user.id)
        req.id = user.id;
    })
    next();
}

 const getUser=async(req,res,next)=>{
    const userId=req.id;
    let user;
    try{
    user = await User.findById(userId);
    }catch(e){
        console.log(e)
    }
    if(!user){
        return   res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({user});

 }
//  const refreshToken=(req,res,next)=>{
//     const cookie = req.headers.cookie;
//     const prevToken = cookie.split("=")[1];
//     if(!prevToken){
//         res.status(404).json({message:"no token found"})
//     }
//     jwt.verify(String(prevToken),KEY,(err,user)=>{
//         if(err){
//             console.log(err)
//          return   res.status(404).json({message:"Auth failed"})

//         }
//        res.clearCookie(`${user.id}`)
//        req.cookies[`${user.id}`]=""
//        const token = jwt.sign({id:user.id},KEY,{
//         expiresIn:"35s"
//     })
//     console.log("retoken",token)
//     res.cookie(String(user.id),token,{
//         path :"/",
//         expires:new Date(Date.now()+1000*30),
//         httpOnly:true,
//         sameSite:'lax'
//     })
//     req.id = user.id
//     next()
//     })
   
   
//  }
exports.signup=signup;
exports.login=login;
exports.verifiedToken=verifiedToken;
exports.getUser=getUser;
// exports.refreshToken=refreshToken