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

// TODO: Parse the content of the html.

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	// TODO: Utiliser des variables d'environnement pour tout ce qui est necessaire.
	auth := smtp.PlainAuth(
		"gary.testmail.123@gmail.com",
		"gary.testmail.123@gmail.com",
		"nsmxrfvdtofcqrtf",
		"smtp.gmail.com",
	)

	var content Content
	error := json.Unmarshal([]byte(request.Body), &content)
	fmt.Println("Voyons le contenu de content", content)
	fmt.Println("Je veux voir si j'ai bien le nom : ", content.Nom)
	if error != nil {
		fmt.Println("On dirait bien que j'ai une erreur")
	}

	fmt.Println("Juste la requete : ", request)
	fmt.Println("Contenu du body de la requete :", request.Body)

	headers := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";"
	subject := "On teste la fonction d'envoi de mail\nThis is the body of the mail."
	body := "<h1>Je veux envoyer un nouveau mail en fait les gars</h1>"
	msg := "Subject: " + subject + headers + "\n\n" + body

	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"gary.testmail.123@gmail.com",
		[]string{"gary.testmail.123@gmail.com"},
		[]byte(msg),
	)

	if err != nil {
		fmt.Println("Le message d'erreur est le suivant :")
		fmt.Println(err)
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
