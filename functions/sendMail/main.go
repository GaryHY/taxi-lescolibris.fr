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

	fmt.Println("Contenu du body de la requete :", request.Body)

	msg := "Subject: On teste la fonction d'envoi de mail\nThis is the body of the mail."

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
