package main

import (
	"context"
	"fmt"
	"net/smtp"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// "nsmx rfvd tofc qrtf",

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	fmt.Println("This message will show up in the CLI console.")
	auth := smtp.PlainAuth(
		"gary.testmail.123@gmail.com",
		"gary.testmail.123@gmail.com",
		"nsmxrfvdtofcqrtf",
		"smtp.gmail.com",
	)

	msg := "Subject: On teste la fonction d'envoi de mail\nThis is the body of the mail."

	// 587
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
		Body:            "Je teste de bosser avec golang parce que c'est ce que je prefere",
		IsBase64Encoded: false,
	}, nil
}

func main() {
	lambda.Start(handler)
}
