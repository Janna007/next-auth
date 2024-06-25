import {connect} from '@/dbConfig/dbConnect'
import User from '@/models/userModel'
import {NextRequest,NextResponse}  from 'next/server'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'


connect()

export async function POST(request:NextRequest) {
    try {

        const reqBody= await request.json()
        const {username,email,password}=reqBody  

//check user exist
       const user= await User.findOne({email})

       if(user){
        return NextResponse.json({error :"User Already Exist"})
       }

//password hashing

       const salt=await bcrypt.genSalt(10)
       const hashedPassword=await bcrypt.hash(password,salt)

//create user
       const newUser=new User({
           username,
           email,
           password:hashedPassword
       })

       const savedUser=await newUser.save()
       console.log(savedUser)

//email verification of user
        
    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
    

    return NextResponse.json({
        message:"User Registered successfully",
        success:true,
        savedUser

    })



    } catch (error:any) {
        return NextResponse.json({error : error.message})
    }
}