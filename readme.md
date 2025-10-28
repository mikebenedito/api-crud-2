🧩 1. Criar o projeto dentro do VS Code
Abra o VS Code


No menu superior, clique em File → Open Folder...


Escolha (ou crie) uma pasta chamada api-crud


Com a pasta aberta no VS Code, abra o Terminal interno


Atalho: Ctrl + ' (aspas simples)


Ou menu: Terminal → New Terminal



⚙️ 2. Iniciar o projeto Node
No terminal do VS Code (embaixo da tela):
npm init -y

🧠 Conceito:
 Isso cria o arquivo package.json, que é o "manual" do projeto — ele guarda nome, versão e as bibliotecas que você vai instalar.

📦 3. Instalar o Express
Ainda no terminal:
npm install express

🧠 Conceito:
 O Express é uma biblioteca que ajuda o Node.js a lidar com requisições HTTP, ou seja, a criar rotas e respostas de forma simples.

🧠 4. Criar o arquivo principal do servidor
No painel lateral do VS Code (Explorer), clique com o botão direito → New File


Nomeie o arquivo como:

 server.js


Cole o código abaixo:


const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para entender JSON
app.use(express.json());

// Rota inicial de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

🧠 Conceito:
app.get() cria uma rota (um endereço da API).


res.send() envia uma resposta ao navegador.


app.listen() “liga” o servidor na porta 3000.



▶️ 5. Rodar o servidor
No terminal do VS Code:
node server.js

Se aparecer:
Servidor rodando em http://localhost:3000

👉 Abra o navegador e acesse http://localhost:3000
 Você verá: “API funcionando!”
🧠 Conceito:
 O Node agora está escutando requisições HTTP — ele virou um servidor web.

📋 6. Criar uma lista de dados simulada
No topo do server.js, logo após o const app = express();, adicione:
let users = [
  { id: 1, name: 'Luan' },
  { id: 2, name: 'Maria' }
];

🧠 Conceito:
 Esse users é o nosso banco de dados falso, guardado em memória.

🔍 7. Rota GET – Ler usuários
Adicione abaixo da rota /:
app.get('/users', (req, res) => {
  res.json(users);
});

🧠 Conceito:
 O método GET é usado pra ler dados.
 res.json() envia a resposta no formato JSON.

➕ 8. Rota POST – Criar usuário
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

🧠 Conceito:
POST cria novos registros.


req.body lê o corpo da requisição (os dados enviados).


status(201) = criado com sucesso.



✏️ 9. Rota PUT – Atualizar usuário
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  users = users.map(u => u.id == id ? updatedUser : u);
  res.json(updatedUser);
});

🧠 Conceito:
PUT atualiza algo existente.


:id vem da URL (req.params.id).


map() percorre o array e substitui o item certo.



❌ 10. Rota DELETE – Remover usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id != id);
  res.status(204).send();
});

🧠 Conceito:
DELETE apaga registros.


filter() cria um novo array sem o item removido.


204 = sucesso, sem resposta de conteúdo.

