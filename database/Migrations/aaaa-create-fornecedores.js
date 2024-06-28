const createFornecedores = require("../Tabelas/Fornecedores");

createFornecedores
  .sync({force: true})
  .then(() => console.log("Tabela fornecedores criada com sucesso"))
  .catch((erro) => console.log(erro));
