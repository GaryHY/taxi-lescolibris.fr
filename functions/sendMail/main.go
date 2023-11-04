package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/smtp"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Content struct {
	Nom     string
	Prenom  string
	Email   string
	Message string
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	auth := smtp.PlainAuth(
		"",
		os.Getenv("EMAIL"),
		os.Getenv("GMAIL_PASSWORD"),
		"smtp.gmail.com",
	)

	var content Content
	error := json.Unmarshal([]byte(request.Body), &content)
	if error != nil {
		fmt.Println("Error when unmarshalling the json content from the request.")
	}

	headers := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";"

	subject := "Nouveau message de la part de - " + content.Nom + " " + content.Prenom + " : " + content.Email + "\n"
	text_content := "<h1>Message :</h1>" + "<p>" + content.Message + `</p>` + "\n\n" + `<p>Bonne reception, </p>` + `<p>L'equipe de blablabla</p>`
	msg := "Subject: " + subject + headers + "\n\n" + text_content

	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		content.Email,
		[]string{"gary.testmail.123@gmail.com"},
		[]byte(msg),
	)

	if err != nil {
		fmt.Println("Error when sending the email : ", err)
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
