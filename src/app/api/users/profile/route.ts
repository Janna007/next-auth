import {connect} from '@/dbConfig/dbConnect'
import User from '@/models/userModel'
import {NextRequest,NextResponse}  from 'next/server'
import getDataFromToken from '@/helpers/tokenVerification'


connect()


export async function GET(request :NextRequest){
      

  try {
     //token verification
         const userId=getDataFromToken(request)
         const user=await User.findById(userId).select("-password")
         if(!user){
            return NextResponse.json({error:"User Not Found !!"},{status:404})
         }

         return NextResponse.json({
            message:"USer Found",
            success:true,
            status:200,
            data:user
         })


  
  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }


}