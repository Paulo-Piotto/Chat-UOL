let mensagens = [];

const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages");

promise.then(pegarMensagens);

function pegarMensagens(resposta){
    let mensagensServidor = resposta.data;
    for(let i=0; i < mensagensServidor.length; i++){
        mensagens[i] = mensagensServidor[i];
    }
    console.log(mensagensServidor);
    renderizarMensagens(mensagensServidor);
}


function renderizarMensagens(mensagensServidor){
    const areaDeMensagens = document.querySelector("main");
    areaDeMensagens.innerHTML = "";

    for(let i=0; i<mensagensServidor.length; i++){

        if(mensagensServidor[i].type === "message" && mensagensServidor[i].to === "Todos"){
            areaDeMensagens.innerHTML += `<div class="container">
                            <p><span class="hora"> (${mensagensServidor[i].time})</span><span class="usuario">${mensagensServidor[i].from}</span> Para <span class="destinatario">${mensagensServidor[i].to}</span>: ${mensagensServidor[i].text}</p>
                            </div>`
        }else if(mensagensServidor[i].type === "status"){
            areaDeMensagens.innerHTML += `<div class="container status">
                                          <p><span class="hora">(${mensagensServidor[i].time})</span><span class="usuario">${mensagensServidor[i].from}</span> ${mensagensServidor[i].text}</p>
                                          </div>`
        }

        
    }
    
}

