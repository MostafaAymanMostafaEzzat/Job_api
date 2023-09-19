const mongoose= require('mongoose')

const jobSchema= new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please enter the company'],
        malength:50
    },
    position:{
        type:String,
        required:[true,'please enter the position'],
        malength:100
    },
    status:{
        type:String,
        default:'pending',
        enum:['interview', 'declined', 'pending']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
       required: [true, 'Please provide user'],
        
    }
},{timestamps:true})

module.exports= mongoose.model('Jobs',jobSchema)