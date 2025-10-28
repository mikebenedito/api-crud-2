

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let users = [
  { id: 1, name: 'Luan' },
  { id: 2, name: 'Maria' },
  { id: 3, name: 'Mike' }
];
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
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(u => u.id == id);
  res.json(user);
});

// push = post (enfia)
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// put = map (troca)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  users = users.map(u => u.id == id ? updatedUser : u);
  res.json(updatedUser);
});

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