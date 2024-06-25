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
       
      var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
});

          const mailOptions={
            from:'jannakondeth5@gmail.com',
            to: email,
            subject: emailType=== "VERIFY" ? "Verify Your Email": "Reset Your Password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === "VERIFY" ? "Verify your email ":"Reset your password"}  or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, 
          }

         const mailResponse= await transport.sendMail(mailOptions)
         return mailResponse

        
    } catch (error:any) {
        throw new Error(error.message)
    }
}