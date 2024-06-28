const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const fornecedores = {
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM("RAÇÃO", "BRINQUEDO"),
    allowNull: false,
  },
};

const options = {
  freezeTableName: true,
  createdAt: "dataCriacao",
  updatedAt: "dataAtualizacao",
  version: "versao",
};

module.exports = sequelize.define("fornecedores", fornecedores, options);
