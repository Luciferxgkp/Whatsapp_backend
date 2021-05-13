
const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    senderId:{
        type:String,
        required:true
    },
    targetId:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('message',messageSchema);