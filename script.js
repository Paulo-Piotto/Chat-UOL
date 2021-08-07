let mensagens = [];
let usuario;

function entrarUsuario(){
   usuario =  prompt("digite seu nome: ");

   const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants", {name: usuario});
   promise.then(enviaUsuario);

}

function enviaUsuario(resposta){
    atualizaMensagens();
    setInterval(atualizaMensagens, 3000);
    setInterval(mantemAtivo, 5000);
    
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
        
        if(mensagensServidor[i].type === "message" && mensagensServidor[i].to === "Todos"){
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

