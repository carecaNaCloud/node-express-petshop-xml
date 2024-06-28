const Table = require("./../../database/Tabelas/Fornecedores");
const Fornecedor = require("./../../model/Fornecedor");
const InternalServerError = require("./../Errors/InternalServerError");
const InvaliedFieldError = require("./../Errors/InvaliedFieldError");

class FornecedorDto {
  constructor({ id, empresa, email, categoria }) {
    (this.id = id), (this.empresa = empresa), (this.email = email), (this.categoria = categoria);
  }

  static async findAll() {
    try {
      const result = await Table.findAll();
      return result.map(({ dataValues }) => new FornecedorDto(dataValues));
    } catch {
      throw new InternalServerError();
    }
  }

  static async findOne(id) {
    try {
      const { dataValues } = await Table.findByPk(id);
      return new FornecedorDto(dataValues);
    } catch (error) {
      throw new InvaliedFieldError("Identificador inválido");
    }
  }

  static async create(form) {
      // Validate fields
    (() => {
      const fields = ["empresa", "email", "categoria"];
      fields.forEach((field) => {
        const formField = form[field];
        if (!formField || /^\s*$/.test(formField)) {
          throw new InvaliedFieldError(`O campo ${field} está vazio.`);
        } else if (typeof formField !== "string") {
          throw new InvaliedFieldError(`O campo ${field} precisa ser um texto.`);
        }
      });
    })();
      // Persist
    try {
      await Table.create(form);
      return new FornecedorDto(form);
    } catch {
      throw new InternalServerError;
    }
  }

  static async update(id, form) {
    try {
      const idPath = parseInt(id);
      const fornecedor = await Table.findByPk(idPath);
      fornecedor.update({
        empresa: form.empresa ? form.empresa : fornecedor.dataValues.empresa,
        email: form.email ? form.email : fornecedor.dataValues.email,
        categoria: form.categoria ? form.categoria : fornecedor.dataValues.categoria,
      });
      await fornecedor.save();
      return new FornecedorDto(fornecedor);
    } catch {
      throw new InvaliedFieldError("Identificador inválido!");
    }
  }

  static async delete(pathId) {
    const id = parseInt(pathId);
    try {
      const fornecedor = await Table.findByPk(id);
      await fornecedor.destroy();
    } catch {
      throw new Error("Fornecedor não encontrado");
    }
  }
}

module.exports = FornecedorDto;
