const{UnauthenticatedError,BadRequestError} =require('../errors')
const { StatusCodes } = require('http-status-codes')
const User =require('../models/User')

const register=async (req,res)=>{
    const user =await User.create(req.body)
   const token= user.creatJwt()
   
   res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

}
const login=async (req,res)=>{
    const {email,password}=req.body
    const user =await User.findOne({email})
    if(!user){
        throw new BadRequestError("unauthentcated1 credinitial")
    }
    const isPasswordCorrect = await user.checkpassword(password)
    if(!isPasswordCorrect){
        throw new BadRequestError("unauthentcated2 credinitial")
    }
    const token= user.creatJwt()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

}

module.exports={register,login}