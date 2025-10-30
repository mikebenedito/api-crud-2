

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let users = [];

const PORT = 3000;

// Middleware para entender JSON
app.use(express.json());

// Rota inicial de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.get('/users', (req, res) => {
  res.json(users);
});

// find = get (encontra)
/*
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(u => u.id == id);
  res.json(user);
});
*/

// push = post (enfia/adiciona)
app.post('/users', (req, res) => {
  const { nome, cpf, telefone } = req.body;

  if (!nome || !cpf) {
    return res.status(400).json({ erro: "Nome e CPF são obrigatórios!"});
  }

  // telefone: só números e até 11 dígitos
  const telefonePadrao = telefone.replace(/\D/g, ""); // remove qualquer caractere não numérico
  if (telefonePadrao.length > 11) {
    return res.status(400).json({ erro: "Telefone inválido!" });
  }

  // cpf: só números e 11 dígitos
  const cpfPadrao = cpf.replace(/\D/g, "");
  if (cpfPadrao.length !== 11) {
    return res.status(400).json({ erro: "CPF inválido" });
  }

  // checar se CPF ou telefone já existem
  const cpfExistente = users.find((u) => u.cpf === cpfPadrao);
  if (cpfExistente) {
    return res.status(400).json({ erro: "CPF já cadastrado!" });
  }

  const telefoneExistente = users.find((u) => u.telefone === telefonePadrao);
  if (telefoneExistente) {
    return res.status(400).json({ erro: "Telefone já cadastrado!"});
  }

  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1; //gera id sequencial automaticamente
  const novoUser = {id, nome, cpf, telefone}
  users.push(novoUser);
  res.status(201).json(novoUser);
});

// put = map (troca)
/*
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  users = users.map(u => u.id == id ? updatedUser : u);
  res.json(updatedUser);
});
*/

//filter = delete (filtra oque eu não quero)
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!id){ // ! signfica não/not
    res.status(400).send("Usuário não encontrado!");
    return;
  }
  users = users.filter(u => u.id != id);
  res.status(204).send();
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});