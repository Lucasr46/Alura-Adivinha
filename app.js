let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = geraNumeroAleatorio()
let tentativas = 1

function insereTexto(elemento, texto){
    let campo = document.querySelector(elemento);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',
    {rate: 1.2});
}

exibeMensagensIniciais();

function exibeMensagensIniciais(){
    insereTexto('h1', 'Jogo do número secreto')
    insereTexto('p', 'Escolha um número entre 1 e 10')
}

function geraNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = []
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return geraNumeroAleatorio()
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function verificarChute(){
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        insereTexto('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        insereTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').disabled = true;
        document.getElementById('input_chute').disabled = true;
    }

    else{
        if( chute > numeroSecreto){
        insereTexto('h1','Errou!');
        insereTexto('p', 'Seu chute foi alto!');
        }
        else {
            insereTexto('h1','Errou!');
            insereTexto('p', 'Seu chute foi baixo!');
        }

    tentativas++;
    limparCampo();
    }
        
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    numeroSecreto = geraNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibeMensagensIniciais();
    document.getElementById('reiniciar').setAttribute('disabled', '')
    document.getElementById('chutar').removeAttribute('disabled')
    document.getElementById('input_chute').removeAttribute('disabled')
}