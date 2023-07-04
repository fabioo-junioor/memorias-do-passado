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

localStorage.setItem('total_pontos', total_pontos);
localStorage.setItem('total_erros', total_erros);


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
            console.log(cartas[item].pergunta);
            console.log(cartas[item].resposta);
            console.log(cartas[item].descricao);
            console.log(cartas[item].referencia);
            return;
            
        }
    }
}
function checkFimPartida(){
    if(pts_fim === (total_cartas/2)){
        console.log("Fim de jogo ", total_pontos, total_erros);
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