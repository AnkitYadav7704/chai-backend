// require('dotenv').config({path: './env'})
import dummy from "./app.js"
import dotenv from "dotenv"
// import mongoose from "mongoose"
// import {DB_NAME} from "./constants";
import connectDB from "./db/index.js";
import express from "express";

dotenv.config({
    path:'./.env'
});

const app = express();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ",err);
})


app.use("/",dummy);


/*
import express from "express"
( async () => {
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("error: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    }catch(error){
        console.error("Error :",error)
        throw err
    }
})()
    */