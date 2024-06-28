SerializerError = require("./controller/Errors/SerializerError") 
const jsontoxml = require('jsontoxml');

class Serializador {
  json (dados) {
    return JSON.stringify(dados);
  }

  xml (dados) {
    if (Array.isArray(dados)) {
      const novaLista = dados.map((fornecedor) => {
        return {
          Fornecedor: fornecedor
        }
      });
      return jsontoxml({Fornecedores: novaLista});
    } else {
      return jsontoxml({Fornecedor: dados});
    }
  }

  serializar(dados) {
    try {
      if (this.contentType === 'application/json' || this.contentType === 'json') {
        return this.json(dados);
      }
      if (this.contentType === 'application/xml' || this.contentType === 'xml') {
        return this.xml(dados);
      }
    } catch {
      throw new SerializerError(this.contentType)
    }
  }
}

class SerializadorFornecedor extends Serializador {
  constructor(contentType) {
    super();
    this.contentType = contentType;
    this.tag = 'Fornecedor';
  }

  
}

module.exports = {
  Serializador: Serializador,
  SerializadorFornecedor: SerializadorFornecedor,
  serializedFormats: ['application/json', 'json', 'application/xml', 'xml']
}