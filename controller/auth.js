const User=require('../Models/user');
const jwt=require('jsonwebtoken');
const path=require('path');

exports.signup=(req,res)=>{
    User.findOne({
        email:req.body.email
    }).exec((error,user)=>{
        if(user)return res.status(400).json({
            message:'User already registered'
        });
        const {
            firstName,
            lastName,
            email,
            password,
            contactNumber,
            username,
        }=req.body;

        
        const _user=new User({
            firstName,
            lastName,
            email,
            password,
            username,
            contactNumber,
        });
        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    error
                });
            }
            if(data){
                return res.status(201).json({
                    message:'User Created Successfully...'
                })
            }
        })
    })
}

exports.signin=(req,res)=>{
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token=jwt.sign({_id:user._id},'MERNSECRET',{expiresIn:'1h'});
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    contactNumber,
                    username,
                    fullName,
                    profilePicture,
                    
                }=user;
                res.status(200).json({
                    token,
                    user:{
                        _id,firstName,lastName,email,fullName,profilePicture,contactNumber,username
                    }
                });

            }else{
                return res.status(400).json({
                    message:'Invalid Password'
                })
            }
        }else{
            return res.status(500).json({message:'Something went wrong'});
        }
    });
}
exports.uploadProfile=async (req,res)=>{
    await User.findOneAndUpdate(
        { email : req.body.email },
        {
            $set:{
                profilePicture: req.file.filename,
            },
        },
        {new:true},
        (error,user)=>{
            if(error) return res.status(400).send(error);
            console.log(user)
            const response={
                message:"Image upload successfully",
                user:user
            };
            return res.status(200).send(response);
        }
    );
}

