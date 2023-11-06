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
  nome: { type: String },
  email: { type: String, required: true },
  endereco: { type: String },
  numero: { type: Number },
  cep: { type: String, required: true },
  nascimento: { type: Date, required: true },
});

const ItensFitSchema = new mongoose.Schema({
  descricao: { type: String },
  marca: { type: String },
  quantidade: { type: Number },
  fabricacao: { type: Date, required: true },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
const ItensFit = mongoose.model("ItensFit", ItensFitSchema);

app.post("/cadastrousuario", async (req, res) => {
  const { nome, email, endereco, numero, cep, nascimento } = req.body;

  if (!nome || !email || !endereco || !numero || !cep || !nascimento) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  const emailExiste = await Usuario.findOne({ email: email });
  if (emailExiste) {
    return res.status(400).json({ error: "O email informado já existe" });
  }

  const usuario = new Usuario({
    nome,
    email,
    endereco,
    numero,
    cep,
    nascimento,
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/", async (req, res) => {
  res.json({ message: "API em execução" });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});