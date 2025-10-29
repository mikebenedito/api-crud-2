

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
  users = users.filter(u => u.id != id);
  res.status(204).send();
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});