// exports.handler = async function(_, _){
exports.handler = async function(event, context){
    const express = require("express");
    const app = express();

    const nodemailer = require("nodemailer");

    const PORT = process.env.PORT || 5000;
    console.log("La valeur de port est : ", PORT);

    // middleware
    app.use(express.static("public"));
    app.use(express.json());

    // NOTE: What is that for ?
    // app.get("/", (req, res) => {
    //    res.sendFile(__dirname + "/public/contactform.html"); 
    // })

    app.post("/", (req, res) => {
        console.log(req.body);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "gary.testmail.123@gmail.com",
                // TODO: protect that with env variable.
                pass : "nsmx rfvd tofc qrtf",
            }
        });

        const nom = req.body.nom.charAt(0).toUpperCase() + req.body.nom.slice(1);
        const prenom = req.body.prenom.charAt(0).toUpperCase() + req.body.prenom.slice(1);

        // TODO: formatter le texte pour rendre cela un peu plus mignon.
        const mailOptions = {
            from: req.body.email,
            to: "gary.testmail.123@gmail.com",
            subject: `Nouveau message provenant du site Transport Les Colibris.`,
            //         text: `Vous avez recu le message suivant de ${nom} ${prenom} - : ${req.body.email}
            //
            // "${req.body.message}"
            //
            // Cordialement,
            // Votre serveur de gestion mail
            // `,
            html: `<h1>Vous avez recu le message suivant de ${nom} ${prenom} - : ${req.body.email}</h1>

<p>"${req.body.message}"</p>

<p>Cordialement,</p>
<p>Votre serveur de gestion mail</p>
`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("Something went wrong :", error);
                res.send("error");
            } else {
                console.log("Email sent :" + info.response);
                res.send("success");
            }
        });
    })

    // NOTE: Je n'ai pas besoin de ce truc.
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    })

    return {
        statusCode: 200,
        body: JSON.stringify("hello world")
    }

}
