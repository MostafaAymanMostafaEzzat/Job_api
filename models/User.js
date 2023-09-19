const mongoose =require('mongoose')
const{UnauthenticatedError,BadRequestError} =require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter the name'],
        maxlength:30,
        minlength:3
    },
    email:{
        type:String,
        required:[true,'please enter the email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique:true
    },
    password:{
        type: String,
        required:[true,'please enter the password'],
        minlength: 6,
        
    }
})
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
  })
  

userSchema.methods.creatJwt = function (){
    return jwt.sign({userId:this._id, name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFTIME})

}
userSchema.methods.checkpassword =async function (canditatePassword){
    try{
   const isMatch = await bcrypt.compare(canditatePassword,this.password)
   return isMatch}catch (error) {
    throw new BadRequestError('please enter the correct password')
   }


}


module.exports= mongoose.model('users',userSchema)