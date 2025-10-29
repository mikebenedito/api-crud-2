// GET

const container1 = document.getElementById("lista"); //const que pega o elemento do HTML pelo ID

async function mostrarUsuarios() { //função que faz o GET na API
  try { // o try "tenta" executar oque foi pedido
    const resposta = await fetch("http://localhost:3000/users"); // o fetch é usado para localizar o endereço da API em questão
    const dados = await resposta.json(); // transforma em objeto JS
    console.log(dados);

    // limpa os containers antes de preencher
    container1.innerHTML = "";

    // percorre todos os objetos do array
    for (let i = 0; i < dados.length; i++) {
      const post = document.createElement("h1");
      //post.classList.add("usuario");
      post.textContent = `Id: ${dados[i].id}, Nome: ${dados[i].nome}, CPF: ${dados[i].cpf}, Telefone: ${dados[i].telefone}.`;

      container1.appendChild(post);
    }

  } catch (erro) {
    console.error("Erro ao carregar formulário:", erro);
  }
}


// ---------------------------------  POST  ---------------------------------------

const bntPOST = document.getElementById("enviarPOST");

async function adicionaUsuario() {
  try {
    const nome = document.getElementById("novoNome").value;
    const telefone = document.getElementById("novoTelefone").value;
    const cpf = document.getElementById("novoCpf").value;
  

    const resposta = await fetch("http://localhost:3000/users", {
      method: "POST", // aqui informamos o metodo
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({nome, telefone, cpf}), // aqui temos o corpo do objeto
    });
    const dados = await resposta.json();
    console.log("Usuário criado", dados);

    mostrarUsuarios();

  } catch (erro){
    console.error("Erro ao criar usuário", erro);
  }
}

bntPOST.addEventListener("click", adicionaUsuario);



// ----------------- DELETE -----------------------------------------------

const idDelete = document.getElementById("idDelete");
const bntDel = document.getElementById("btnDELETE");

async function deletarPost() {
  try {
    const id = idDelete.value.trim();

    const resposta = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE"
    });

    if (resposta.ok){
      console.log("Post deletado com sucesso");

    } else {
      console.log("Falha ao deletor o post");
    }

    getUsuarios();
  } catch (erro) {
    console.log("Erro ao deletar post", erro);
  }
}

bntDel.addEventListener("click", deletarPost);