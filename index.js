const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fornecedoresController = require("./controller/fornecedores");
const SerializerError = require("./controller/Errors/SerializerError");
const { serializedFormats, Serializador } = require("./Serializador");
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((request, response, next) => {
  let requestedFormat = request.get("Accept");
  if (requestedFormat == "*/*") {
    requestedFormat = "application/json";
  }
  if (!serializedFormats.includes(requestedFormat)) {
    throw new SerializerError();
  }
  response.set('Content-Type', requestedFormat)
  next();
});

app.use("/fornecedores", fornecedoresController);

app.use((error, request, response, next) => {
  console.log(error.stack);

  if ((!error) instanceof SerializerError) {
    response.status(error.status).send(
      JSON.stringify({
        error: error.name,
        message: error.message,
      })
    );
  } else {
    response.status(error.status).send(
      JSON.stringify({
        error: error.name,
        message: error.message,
        supportedFormats: error.supportedFormats,
      })
    );
  }

  next(error);
});

app.listen(port, () => {
  console.log(`API listenning port ${port}`);
});
