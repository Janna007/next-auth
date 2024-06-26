import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const getDataFromToken=(request :NextRequest)=>{
       try {

        const token=request.cookies.get("token")?.value || ""

        if(!token){
            return NextResponse.json({error:"Inavlid Request"})
        }

        const decodedToken:any=jwt.verify(token,process.env.TOKEN_SECRET!)

        const userId=decodedToken.id
       
        return userId
        
       } catch (error:any) {
          throw new Error(error.message)
       }
}

export default getDataFromToken