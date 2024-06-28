

class InternalServerError extends Error {

  constructor() {
    super();
    this.status = 500;
    this.name = "Erro interno do servidor";
    this.message = "Sua solicitação não pode ser processada devido a um erro interno, por favor tente mais tarde.";
  }
}

module.exports = InternalServerError;
