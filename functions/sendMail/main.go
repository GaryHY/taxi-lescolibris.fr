package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	fmt.Println("This message will show up in the CLI console.")
	fmt.Println("I want to make that thing work.")

	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "text/plain"},
		Body:            "Je teste de bosser avec golang parce que c'est ce que je prefere",
		IsBase64Encoded: false,
	}, nil
}

func main() {
	fmt.Println("En fait je veux faire du golang moi")
	lambda.Start(handler)
}