const express=require('express')
const router=express.Router()

const {getAllJobs,creatJob,getJob,updateJob,deleteJob}=require('../controllers/jobs') 



router.route('/').get(getAllJobs).post(creatJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)
 module.exports=router