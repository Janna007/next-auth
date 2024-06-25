import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import User from '@/models/userModel';

export async function sendEmail({email,emailType,userId}:any) {

    try {
  //hashed token

       const hashedToken= await bcrypt.hash(userId.toString(),10)

       if(emailType ==="VERIFY"){
        await User.findByIdAndUpdate(userId,{
          verifyToken:hashedToken,
          verifyTokenExpiry:Date.now() +3600000
         })
       }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,{
          forgotPasswordToken:hashedToken,
          forgotPasswordTokenExpiry:Date.now() +3600000
         })
       }
       

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions={
            from:'jannakondeth@gmail.com',
            to: email,
            subject: emailType=== "VERIFY" ? "Verify Your Email": "Reset Your Password", 
            html: "<b>Hello world?</b>", // html body
          }

         const mailResponse= await transporter.sendMail(mailOptions)
         return mailResponse

        
    } catch (error:any) {
        throw new Error(error.message)
    }
}