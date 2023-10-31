// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
const process = require('process')
const nodemailer = require("nodemailer");

// const fetch = require('node-fetch')

// const { EMAIL_TOKEN } = process.env
const handler = async (event) => {
  // const { email } = JSON.parse(event.body).payload
  // console.log(`Received a submission: ${email}`)

    // console.log("On va print l'event aussi pour voir", event);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gary.testmail.123@gmail.com",
            // TODO: protect that with env variable.
            pass : "nsmx rfvd tofc qrtf",
        }
    });

    const mailOptions = {
        from: "moi",
        to: "gary.testmail.123@gmail.com",
        subject: "test du service de mail en fait.",
        text: "Un texte pour tester de send des mails en fait.",
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("Something went wrong :", error);
            // res.send("error");
        } else {
            console.log("Email sent :" + info.response);
            // res.send("success");
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify({message: "Le mail est envoye avec succes"})
    }


  // try {
  //   const response = await fetch('https://api.buttondown.email/v1/subscribers', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Token ${EMAIL_TOKEN}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email }),
  //   })
  //   const data = await response.json()
  //   console.log(`Submitted to Buttondown:\n ${data}`)
  // } catch (error) {
  //   return { statusCode: 422, body: String(error) }
  // }
  
}

module.exports = { handler }


// exports.handler = async function(event, context){
//     console.log("lancement de la serverless function")
//     return {
//         statusCode: 200,
//         body: JSON.stringify({message: "Je viens en paix"})
//     } 
// }
