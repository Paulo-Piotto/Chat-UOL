let mensagens = [];
let usuario;

function entrarUsuario(){
   usuario =  document.querySelector(".usuario").value;
   const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants", {name: usuario});
   promise.then(enviaUsuario);
   promise.catch(erroDeEntrada);
   let carregar = document.querySelector(".nome-loading");
   carregar.innerHTML = `<img src="assets/loading.gif">`

}

function enviaUsuario(resposta){
    let telaDeEntrada = document.querySelector(".tela-de-entrada");
    telaDeEntrada.classList.add("some");
    let principal = document.querySelector(".conteudo");
    principal.classList.remove("some");
    atualizaMensagens();
    setInterval(atualizaMensagens, 3000);
    setInterval(mantemAtivo, 5000);
    
}

function erroDeEntrada(){
    alert("esse usuário já está logado, entre com outro nome...")
    window.location.reload();
}

function mantemAtivo(){
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status", {name: usuario});
}

function atualizaMensagens(){
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages");

    promise.then(pegarMensagens);
}


function pegarMensagens(resposta){
    let mensagensServidor = resposta.data;
    for(let i=0; i < mensagensServidor.length; i++){
        mensagens[i] = mensagensServidor[i];
    }
    renderizarMensagens(mensagensServidor);
}


function renderizarMensagens(mensagensServidor){
    const areaDeMensagens = document.querySelector("main");
    areaDeMensagens.innerHTML = "";
    let ultimaMensagem;

    for(let i=0; i<mensagensServidor.length; i++){
      ultimaMensagem = document.querySelector(".ultima");
        if(ultimaMensagem !== null){
            ultimaMensagem.classList.remove("ultima");
            
        }
        
        if(mensagensServidor[i].type === "message"){
            areaDeMensagens.innerHTML += `<div class="container ultima">
                            <p><span class="hora"> (${mensagensServidor[i].time})</span><span class="usuario">${mensagensServidor[i].from}</span> Para <span class="destinatario">${mensagensServidor[i].to}</span>: ${mensagensServidor[i].text}</p>
                            </div>`
        }else if(mensagensServidor[i].type === "status"){
            areaDeMensagens.innerHTML += `<div class="container status ultima">
                                          <p><span class="hora">(${mensagensServidor[i].time})</span><span class="usuario">${mensagensServidor[i].from}</span> ${mensagensServidor[i].text}</p>
                                          </div>`
        }


    }
    ultimaMensagem = document.querySelector(".ultima");
    ultimaMensagem.scrollIntoView();    
}

function enviarMensagem(){
    let texto = document.querySelector("footer input");
    let mensagem = {
        from: usuario,
        to: "Todos",
        text: texto.value,
        type: "message"
    }
    let promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages", mensagem);
    promise.then(atualizaMensagens);
    promise.catch(entrarUsuario);
    texto.value = "";
}

function enter(event){
    let tecla = event.key;
    if(tecla === "Enter"){
        enviarMensagem()
    }
}