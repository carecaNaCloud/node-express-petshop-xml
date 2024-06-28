const Table = require("./../database/Tabelas/Fornecedores");

class Fornecedor {
  constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
    this.id = id;
    this.empresa = empresa;
    this.email = email;
    this.categoria = categoria;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }
}

module.exports = Fornecedor;