const User = require("../model/user")

const signup = async(req,res,next)=>{
    const{name,email,password} = req.body
    let existingUser;
    try {
        existingUser=User.findOne({email:email})
    } catch (error) {
        console.log(error)
    }
    if(existingUser){
        return res.status(400).json({message:"user already existed"});
    }
    const user = new User({
        name,
        email,
        password,
    })
    try{
        await user.save();
    }catch(e){
        console.log("error")
    }
    return res.status(201).json({message:user});
}
exports.signup=signup;