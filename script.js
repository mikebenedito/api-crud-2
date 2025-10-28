// GET

const container1 = document.getElementById("get-container"); //const que pega o elemento do HTML pelo ID

async function getUsuarios() { //função que faz o GET na API
  try { // o try "tenta" executar oque foi pedido
    const resposta = await fetch("http://localhost:3000/users"); // o fetch é usado para localizar o endereço da API em questão
    const dados = await resposta.json(); // transforma em objeto JS
    console.log(dados);

    // limpa os containers antes de preencher
    container1.innerHTML = "";

    // percorre todos os objetos do array
    for (let i = 0; i < dados.length; i++) {
      const post = document.createElement("div");
      //post.classList.add("usuario");
      post.textContent = `Id: ${dados[i].id}, nome: ${dados[i].name}.`;

      container1.appendChild(post);
    }

  } catch (erro) {
    console.error("Erro ao carregar formulário:", erro);
  }
}

getUsuarios()

// ---------------------------------  POST  ---------------------------------------

const bntPOST = document.getElementById("enviarPost");
const novoIdPost = document.getElementById("novoId");
const novoNomePost = document.getElementById("novoNome");

async function postUsuarios() {
  try {
    const id = novoIdPost.value.trim(); //Trim remove espaços em branco do iniciu e/ou fim do texto
    const name = novoNomePost.value.trim();

    const resposta = await fetch("http://localhost:3000/users", {
      method: "POST", // aqui informamos o metodo
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, name}), // aqui temos o corpo do objeto
    });
    const dados = await resposta.json();
    console.log("post criado", dados);

    getUsuarios();
  } catch (erro){
    console.error("Erro ao enviar post", erro);
  }
}

bntPOST.addEventListener("click", postUsuarios);



// -------------------- PUT -------------------------

const getContainer = document.getElementById("get-container2");

const btnPUT = document.getElementById("enviarPut");
const novoIdPut = document.getElementById("novoIdPut");
const novoNomePut = document.getElementById("novoNomePut");

async function putUsuarios() {
  try {
    const id = novoIdPut.value.trim();
    const name = novoNomePut.value.trim();

    const resposta = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, name}),
    });
    const dados = await resposta.json();
       
    console.log("post criado", dados);

    getUsuarios();
  } catch (erro){
    console.error("Erro ao enviar post", erro);
  }
}

btnPUT.addEventListener("click", putUsuarios);


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