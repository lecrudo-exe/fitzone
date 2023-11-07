const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/itensfit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  senha: { type: String, required: true },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/cadastrousuario", async (req, res) => {
  try {
    const { nome, senha } = req.body;
    const usuario = new Usuario({
      nome: nome,
      senha: senha,
    });

    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro de usuário realizado com sucesso", UsuarioId: newUsuario._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor", details: error.message });
  }
});

const ItensFitSchema = new mongoose.Schema({
  id_produtoacademia: { type: Number, required: true },
  descricao: { type: String },
  marca: { type: String },
  quantidade: { type: Number },
  fabricacao: { type: String },
});

const Itens = mongoose.model("ItensFit", ItensFitSchema);

app.post("/cadastroitensfit", async (req, res) => {
  try {
    const { id_produtoacademia, descricao, marca, quantidade, fabricacao } = req.body;
    const itens = new Itens({
      id_produtoacademia: id_produtoacademia,
      descricao: descricao,
      marca: marca,
      quantidade: quantidade,
      fabricacao: fabricacao,
    });

    const newItens = await itens.save();
    res.json({ error: null, msg: "Cadastro de itens realizado com sucesso", ItensId: newItens._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor", details: error.message });
  }
});

app.get("/", async (req, res) => {
  res.json({ message: "API em execução" });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
