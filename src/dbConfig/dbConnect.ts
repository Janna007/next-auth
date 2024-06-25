import mongoose from "mongoose";

export async function connect (){
        try {
            mongoose.connect(process.env.MONGO_URL!)
            const connection=mongoose.connection

            connection.on('connect',()=>{
                 console.log("MongoDB connected")
            })

            connection.on('error',(err)=>{
                console.log('connection failed with DB',err)
                process.exit()
            })
            
        } catch (error) {
            console.log('MongoDB connection failed !! Try Again!')
            console.log(error)
        }
}