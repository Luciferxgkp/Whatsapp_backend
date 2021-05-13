const mongoose=require('mongoose');
const targetSchema=new mongoose.Schema({
    sourceId:{
        type:String,
        required:true
    }
    targetId:{
        type:String,
        required:true
    }
    messages:[
        {message:type }
    ]
});
module.exports = mongoose.model('target',targetSchema);