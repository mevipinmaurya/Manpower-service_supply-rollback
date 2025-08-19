import nodemailer from "nodemailer"
import dotenv from 'dotenv';

dotenv.config()

// Transporter create karo
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_APP_PASSWORD
    }
})

// console.log("Email user:", process.env.ADMIN_EMAIL);
// console.log("Email pass:", process.env.ADMIN_EMAIL_APP_PASSWORD );


// email bhejne ke liye function banao
const sendContactUsMail = async (customerEmail, customerName, number, message) => {

    // console.log(customerEmail, customerName, number, message)
    const subject = "New Contact Us Submission";

    const text = `
Hello Admin,

You have received a new contact request.

Customer Details:
--------------------------
Name    : ${customerName}
Email   : ${customerEmail}
Phone   : ${number}

Message:
--------------------------
${message}

Regards,  
Your Website Contact Form
    `;

    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject,
        text
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        // console.log("Email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

export {
    sendContactUsMail,
}
