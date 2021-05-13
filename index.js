const express=require('express');
const http=require('http');
const mongoose = require('mongoose');
const app=express();
const path=require('path')
const { Socket } = require('dgram');
const port =process.env.PORT || 3000;
const server=http.createServer(app);
const io=require("socket.io")(server);
const authRoutes=require('./routes/auth');
const cors =require('cors');


mongoose.connect(
    `mongodb+srv://Lucifer:Lucifer@cluster0.uuldk.mongodb.net/Whatsapp-clone?retryWrites=true&w=majority`,
    {
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false
    }
).then(()=>{
    console.log('Database Created');
}).catch((error)=>{
    console.log(error);
});

app.use('/public',express.static(path.join(__dirname,'uploads')));

app.use(express.json());
app.use(cors());
var clients={};

app.use('/api',authRoutes);

io.on("connection",(Socket)=>{
    console.log("Connected");
    console.log(Socket.id,"has joined");
    Socket.on("signin",(id)=>{
        console.log(id);
        clients[id]=Socket;
        console.log(clients);
    });
    Socket.on("message",(msg)=>{
        console.log(msg);
        let targetId=msg.targetId;
        if(clients[targetId])
            clients[targetId].emit("message",msg);
    })
});

server.listen(port,"0.0.0.0",()=>{
    console.log(`server started at ${port}`);
})