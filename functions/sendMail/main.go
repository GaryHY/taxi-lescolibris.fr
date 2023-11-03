package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/smtp"
	"text/template"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Content struct {
	Nom     string
	Prenom  string
	Email   string
	Message string
}

// TODO: Parse the content of the html from the file so that I get something more personalized.
func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	// TODO: Put that part in a function for readability.

	// GET the html template for the response
	// TODO: Changer l'argument de ParseFiles en une env variable
	var body bytes.Buffer
	// t, template_err := template.ParseFiles("./template.html")
	t, template_err := template.ParseFiles("https://transports-lescolibris.netlify.app/.netlify/functions/sendMail/template.html")

	if template_err != nil {
		fmt.Println("The template could not be parsed, nessage error : ", template_err)
	}

	t.Execute(&body, struct{ Name string }{Name: "Gary"})

	auth := smtp.PlainAuth(
		"",
		"gary.testmail.123@gmail.com",
		"wterjrwnxtfdqmcw",
		"smtp.gmail.com",
	)

	// TODO: Utiliser des variables d'environnement pour tout ce qui est necessaire (mail, mot de passe de l'app etc).
	fmt.Println("New Updpate: change the template path to see if I can get the file.")

	var content Content
	error := json.Unmarshal([]byte(request.Body), &content)
	if error != nil {
		fmt.Println("erreur when unmarshalling the json content from the request.")
	}

	headers := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";"

	// NOTE: Ce que j'avais avant
	// subject := "On teste la fonction d'envoi de mail\nThis is the body of the mail."
	// body := "<h1>Je veux envoyer un nouveau mail en fait les gars</h1>"
	// msg := "Subject: " + subject + headers + "\n\n" + body

	subject := "On teste la fonction d'envoi de mail.\n"
	// Old before the use of templates.
	// text_content := `<h1>Je veux envoyer un nouveau mail en fait les gars " + content.Nom + " </h1>`
	// msg := "Subject: " + subject + headers + "\n\n" + text_content
	msg := "Subject: " + subject + headers + "\n\n" + body.String()

	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"gary.testmail.123@gmail.com",
		[]string{"gary.testmail.123@gmail.com"},
		[]byte(msg),
	)

	if err != nil {
		fmt.Println("Le message d'erreur est le suivant : \n", err)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "text/plain"},
		Body:            "Operation finie",
		IsBase64Encoded: false,
	}, nil
}

func main() {
	fmt.Println("Je veux devenir un monstre de code parce que c'est ce qui me ramener de l'argent.")
	lambda.Start(handler)
}
