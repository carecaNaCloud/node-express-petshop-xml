class InvaliedFieldError extends Error {
  constructor (field) {
    super();
    this.status = 400
    this.name = "Campo Inválido",
    this.message = field
  }
}

module.exports = InvaliedFieldError;