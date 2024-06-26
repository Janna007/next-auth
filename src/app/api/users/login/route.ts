import {connect} from '@/dbConfig/dbConnect'
import User from '@/models/userModel'
import {NextRequest,NextResponse}  from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect()


export async function POST(request:NextRequest){
     try {

        const reqBody=await request.json()
        const {email,password}=reqBody
          
//checking user exist or not
        const user=await User.findOne({email})
       if(!user){
         return NextResponse.json({error:"Invalid credentials!!Try Again"},{status:500})
       }

//password checking

      const validPassword =await bcrypt.compare(password,user.password)

      if(!validPassword){
         return NextResponse.json({error:"Invalid credentials!!Try Again"},{status:500})
      }


      const tokenData={
         id:user._id,
         username:user.username,
         email:user.email

      }

      const token= jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

      const response=NextResponse.json({
         message:"Logged In Successfully",
         success:true
      })

      response.cookies.set("token",token,{
         httpOnly:true
      })


      return response
  
     } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
     }
}