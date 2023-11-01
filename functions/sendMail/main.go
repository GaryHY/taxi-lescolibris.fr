package main

import (
	"context"
	"fmt"
	"net/smtp"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	auth := smtp.PlainAuth(
		"gary.testmail.123@gmail.com",
		"gary.testmail.123@gmail.com",
		"nsmxrfvdtofcqrtf",
		"smtp.gmail.com",
	)

	fmt.Println("Query string parameters of the request", request.QueryStringParameters)
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
