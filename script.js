// ---------------------------------  POST  ---------------------------------------

const bntPOST = document.getElementById("enviarPOST"); // botão, pega elemento no documento html

async function adicionaUsuario() {
  try {
    const nome = document.getElementById("novoNome").value;
    const telefone = document.getElementById("novoTelefone").value;
    const cpf = document.getElementById("novoCpf").value;
  

    const resposta = await fetch("http://localhost:3000/users", { // o fetch busca na api
      method: "POST", // aqui informamos o metodo
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({nome, telefone, cpf}), // aqui temos o corpo do objeto
    });
    const dados = await resposta.json(); // resposta/promise

    if (dados.erro){
      throw new Error(dados.erro);
    }

    console.log("Usuário cadastrado com sucesso!", dados);

    mostrarUsuarios(); // roda a função get para mostrar e atualizar a lista

  } catch (erro){
    console.error("Erro ao enviar usuário!", erro);
    window.alert(erro); // abre um alerta pro usuario com o erro da back
  }
}

bntPOST.addEventListener("click", adicionaUsuario); // roda a fução atraves do click

// ----------------------------------- GET -------------------------------------------

const container = document.getElementById("lista"); //const que pega o elemento do HTML pelo ID

async function mostrarUsuarios() { //função que faz o GET na API
  try { // o try "tenta" executar oque foi pedido
    const resposta = await fetch("http://localhost:3000/users"); // o fetch é usado para localizar o endereço da API em questão
    const dados = await resposta.json(); // transforma em objeto JS
    console.log(dados);

    container.innerHTML = "";  // limpa os containers antes de preencher

    for (let i = 0; i < dados.length; i++) {  // percorre todos os objetos do array
      const post = document.createElement("h1"); // cria um h1 no html
      post.classList.add("usuario"); // adiciona a class "usuario" ao elemento criado
      post.textContent = `Id: ${dados[i].id}, Nome: ${dados[i].nome}, CPF: ${dados[i].cpf}, Telefone: ${dados[i].telefone}.`;

      const btnDelete = document.createElement("button"); // cria o botão "delete"
      btnDelete.textContent = "X";
      btnDelete.addEventListener("click", () => deletarUsuario(dados[i].id)); // roda a função no click

      post.appendChild(btnDelete); // o appendChild insere os elementos
      container.appendChild(post);
    }

  } catch (erro) { // pega o erro
    console.error("Erro ao carregar usuário!", erro);
    window.alert(erro);
  }
}

// -------------------------------- DELETE --------------------------------

async function deletarUsuario(id){
  try{
      const confirmar = confirm("Tem certeza que deseja excluir este usuário?"); // abre caixa de confirmação
        if (!confirmar) return;

        const resposta = await fetch(`http://localhost:3000/users/${id}`, { //localiza o fetch pelo id
          method: "DELETE",
      });

  mostrarUsuarios(); // chama a função do get para atualizar lista

  } catch (erro) {
    console.error("Erro ao excluir usuário!", erro);
    window.alert(erro);
  }
}