const { StatusCodes } = require('http-status-codes')
const{UnauthenticatedError,BadRequestError,NotFoundError} =require('../errors')
const theJob= require('../models/Job')



const getAllJobs=async (req,res)=>{
    const jobs = await theJob.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs,count: jobs.length })
}
const creatJob=async (req,res)=>{
    const job= await theJob.create({...req.body,createdBy:req.user.userId})
    res.status(StatusCodes.CREATED).json({ job })

}
const getJob=async (req,res)=>{
    const{user:{userId},params:{id:jobId}}=req
    const job= await theJob.findOne({_id:jobId,createdBy:userId})
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})

}
const updateJob=async (req,res)=>{
    const{user:{userId},params:{id:jobId}}=req
    const job= await theJob.findByIdAndUpdate({_id:jobId,createdBy:userId},req.body,{ new: true, runValidators: true })
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const deleteJob=async (req,res)=>{
    const{user:{userId},params:{id:jobId}}=req
    const job= await theJob.findByIdAndRemove({_id:jobId,createdBy:userId})
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports={getAllJobs,creatJob,getJob,updateJob,deleteJob}