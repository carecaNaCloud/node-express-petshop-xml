const express = require("express");
const Fornecedor = require("./FornecedorDTO");
const {SerializadorFornecedor} = require('./../../Serializador');
const route = express.Router();

route.get("/", async (request, response, next) => {
  try {
    const listaDeFornecedores = await Fornecedor.findAll(); 
    const contentType = ((response.get('Content-Type')).split(";"))[0]
    const serializador = new SerializadorFornecedor(contentType);
    const listaDeFornecedoresSerializada = serializador.serializar(listaDeFornecedores);
    response.status(200).send(listaDeFornecedoresSerializada);
  } catch (error) {
    next(error);
  }
});

route.get("/:id", async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    const fornecedor = await Fornecedor.findOne(id);
    const contentType = ((response.get('Content-Type')).split(";"))[0]
    const serializador = new SerializadorFornecedor(contentType);
    console.log(serializador.serializar(fornecedor))
    response.status(200).send(serializador.serializar(fornecedor));
  } catch (error) {
    next(error);
  }
});

route.post("/", async (request, response, next) => {
  try {
    const fornecedor = await Fornecedor.create(request.body);
    response.status(201).send(fornecedor);
  } catch (error) {
    next(error);
  }
});

route.patch("/:id", async (request, response, next) => {
  try {
    const fornecedor = await Fornecedor.update(request.params.id, request.body);
    response.status(200).send(fornecedor);
  } catch (error) {
    next(error);
  }
});

route.delete("/:id", async (request, response, next) => {
  try {
    await Fornecedor.delete(request.params.id);
    response.status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = route;
