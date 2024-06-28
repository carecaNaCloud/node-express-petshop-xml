const {serializedFormats : supportedFormats} = require('./../../Serializador');

class SerializerError extends Error {
  constructor(contentType) {
    super();
    this.name = "DataType not supported";
    this.message = `O tipo de dado ${contentType} solicitado pela requisição não é suportado pela API`;
    this.status = 406;
    this.supportedFormats = supportedFormats
  }
}


module.exports = SerializerError;