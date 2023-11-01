// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
const process = require('process')
const nodemailer = require("nodemailer");

// const fetch = require('node-fetch')

// const { EMAIL_TOKEN } = process.env
const handler = async (event) => {
  // const { formData } = JSON.parse(event.body).payload
   
    // console.log(event.body);
    const formData = JSON.parse(event.body);
    const nom = formData.nom;
    const prenom = formData.prenom;
    const email = formData.email;
    const message = formData.message;

    // console.log("\nOn va print l'event aussi pour voir", event);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: "gary.testmail.123@gmail.com",
            pass : "nsmx rfvd tofc qrtf",
        }
    });

    const mailOptions = {
        from: nom + " " + prenom + " : @" + email,
        to: "gary.testmail.123@gmail.com",
        subject: "test du service de mail en fait.",
        text: message,
    };

    // NOTE: Ce truc retourne une promesse qu'il faut gerer en fait et c'est peut etre ce qui bloquee le programme.
    console.log("push");

    // const mailRes = await transporter.sendMail(mailOptions, (error, info) => {
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            console.log("Je vais send le mail maintenant");

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
        return {
            statusCode: 200,
            body: JSON.stringify({message: "Ici je n'ai pas fait d'erreur"})
        }
    } catch(error){
        return {
            statusCode: 500,
            body: JSON.stringify({message: "erreur mon pote"})
        }
    }

    // return mailRes;



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
