// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
const process = require('process')
const nodemailer = require("nodemailer");

// const fetch = require('node-fetch')

// const { EMAIL_TOKEN } = process.env
const handler = async (event) => {
  // const { formData } = JSON.parse(event.body).payload
  // console.log(`Voici les donnees: ${formData}`)
    console.log(event.body);
    const nom = event.body.nom;
    const prenom = event.body.prenom;
    const email = event.body.email;
    const message = event.body.message;
    console.log("le message est :", message);

    // console.log("\nOn va print l'event aussi pour voir", event);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gary.testmail.123@gmail.com",
            // TODO: protect that with env variable.
            pass : "nsmx rfvd tofc qrtf",
        }
    });

    const mailOptions = {
        from: nom + " " + prenom + " : @" + email,
        to: "gary.testmail.123@gmail.com",
        subject: "test du service de mail en fait.",
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("Something went wrong :", error);
            return {
                statusCode: 500,
                body: JSON.stringify({message: "Le mail n'a pas pu etre envoye avec succes"})
            }
        } else {
            console.log("Email sent :" + info.response);
            return {
                statusCode: 200,
                body: JSON.stringify({message: "Le mail est envoye avec succes"})
            }
        }
    });



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
