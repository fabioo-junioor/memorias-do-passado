const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

const num_pts = document.querySelector('.number-pts');
const num_error = document.querySelector('.number-error');
let total_pontos = 0;
let total_erros = 0;

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
        console.log('igual', total_pontos);
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

    }, 1500);
    
}
(function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 3);
        card.style.order = randomPosition;

    })
})()
cards.forEach((card) => {
    card.addEventListener('click', flipCard);

})