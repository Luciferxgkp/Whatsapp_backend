const express=require('express');
const router=express.Router();
const {signup,signin,uploadProfile}=require('../controller/auth');
const multer=require('multer');
const path=require('path');
const shortid=require('shortid');
const {requireSignin}=require('../common-middleware/index')

const { validatesignupRequest ,isRequestValidated, validatesigninRequest} = require('../validation/auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+'-'+file.originalname)
    }
  })
const upload=multer({storage});
router.post('/signin',validatesigninRequest,isRequestValidated,signin);
router.post('/signup',signup);
router.patch('/signup',upload.single('profilePicture'),uploadProfile);

//router.post('/profile',requireSignin,(req,res)=>{
//    res.status(200).json({user:'profile'})
//})

module.exports=router;