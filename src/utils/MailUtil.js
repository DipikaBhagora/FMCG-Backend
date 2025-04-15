require('dotenv').config();

//to,from,subject,text
const mailer = require('nodemailer') //sending mail
 
//fn
const sendingMail = async(to,subject,text) =>{
    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.user,
            pass:process.env.pass
        }
    })

    const mailOptions = {
        from:process.env.from,
        to: to,
        subject:subject,
        //text: text
        html: "<h1>"+text+"</h1>"
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
}

module.exports = {
    sendingMail
}

// sendingMail("@gmail.com","test mail","this is a test mail") 
//sending dummy mail through cmd 