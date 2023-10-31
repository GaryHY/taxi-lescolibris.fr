exports.handler = async function(event, context){
    console.log("lancement de la serverless function")
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Je viens en paix"})
    } 
}
