package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/smtp"

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
	// TODO: Utiliser des variables d'environnement pour tout ce qui est necessaire (mail, mot de passe de l'app etc).
	fmt.Println("New Updpate: removed the template and made a weak ass string for the content of the mail.")

	auth := smtp.PlainAuth(
		"",
		"gary.testmail.123@gmail.com",
		"wterjrwnxtfdqmcw",
		"smtp.gmail.com",
	)

	var content Content
	error := json.Unmarshal([]byte(request.Body), &content)
	if error != nil {
		fmt.Println("Error when unmarshalling the json content from the request.")
	}

	headers := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";"

	subject := "On teste la fonction d'envoi de mail.\n"
	text_content := `<h1>Nouveau message de la part de :` + content.Nom + " " + content.Prenom + " : @" + content.Email + "</h1>" + "<p>" + content.Message + `</p>\n\n\` + `<p>Bonne reception, </p>` + `<p>L'equipe de blablabla</p>`
	msg := "Subject: " + subject + headers + "\n\n" + text_content

	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		// "gary.testmail.123@gmail.com",
		content.Email,
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
	lambda.Start(handler)
}
