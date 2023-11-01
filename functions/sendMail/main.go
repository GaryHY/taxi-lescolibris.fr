package main

import (
	"context"
	"fmt"
	"net/smtp"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	fmt.Println("This message will show up in the CLI console.")
	auth := smtp.PlainAuth(
		"gary.testmail.123@gmail.com",
		"gary.testmail.123@gmail.com",
		"nsmx rfvd tofc qrtf",
		"smtp.gmail.com",
	)

	msg := "Un test de message a faire pour le contenu du mail."

	// 587
	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"moi",
		[]string{"mon mail"},
		[]byte(msg),
	)

	if err != nil {
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
