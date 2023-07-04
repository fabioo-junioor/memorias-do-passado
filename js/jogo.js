import cartas from './dados.js';

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

const num_pts = document.querySelector('.number-pts');
const num_error = document.querySelector('.number-error');
let total_pontos = 0;
let total_erros = 0;
let pts_fim = 0;
const total_cartas = 4;


function flipCard(){
    if(lockBoard){
        return;

    }
    if(this === firstCard){
        return;

    }
    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;

    }
    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();

}
function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        num_pts.textContent = total_pontos += 1;
        pts_fim += 1;

        checkCod(parseInt(firstCard.dataset.card));
        checkFimPartida();
        disabledCards();
        return;

    }
    num_error.textContent = total_erros += 1;
    unflipCards();

}
function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        console.log('virou');

        resetBoard();

    }, 1500);
    
}
function checkCod(codigo){
    for(var item in cartas){
        if(cartas[item].codigo == codigo){
            /*
            console.log(cartas[item].pergunta);
            console.log(cartas[item].resposta);
            console.log(cartas[item].descricao);
            console.log(cartas[item].referencia);
            */
            const pergunta = document.querySelector(".descPergunta");
            const resposta = document.querySelector(".descResposta");
            const descricao = document.querySelector(".descDescricao");
            const referencia = document.querySelector(".descReferencia");

            pergunta.textContent = cartas[item].pergunta;
            resposta.textContent = cartas[item].resposta;
            descricao.textContent = cartas[item].descricao;
            referencia.textContent = cartas[item].referencia;
            
            $('#modalDesc').modal('show');
            return;
            
        }
    }
}
function checkFimPartida(){
    if(pts_fim === (total_cartas/2)){
        //console.log("Fim de jogo ", total_pontos, total_erros);

        const pontos = document.querySelector(".totalPontos");
        const erros = document.querySelector(".totalErros");
        pontos.textContent = total_pontos;
        erros.textContent = total_erros;

        $('#modalEstats').modal('show');
        return;

    }
}
function disabledCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

}
function resetBoard(){
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

}
(function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * total_cartas);
        card.style.order = randomPosition;

    })
})()
cards.forEach((card) => {
    card.addEventListener('click', flipCard);

})