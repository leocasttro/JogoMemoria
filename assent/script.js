const cards = document.querySelectorAll('.memoria-card');

let cardVirada = false;
let tabuleiroBloq = false;
let primeiroCard, segundoCard;

function flipCard(){
    if (tabuleiroBloq) return;
    if (this === primeiroCard) return;

    this.classList.add('flip');

    if (!cardVirada) {
        cardVirada = true;
        primeiroCard = this;

        return;
    }

    segundoCard = this;
    cardsCompativeis();
}

function cardsCompativeis(){
    let compativel = primeiroCard.dataset.framework === segundoCard.dataset.framework;

    compativel ? desativarCards() : unflipCards();
}


function desativarCards(){
    primeiroCard.removeEventListener('click', flipCard);
    segundoCard.removeEventListener('click', flipCard);

    resetTabuleiro();
}

function unflipCards(){
    tabuleiroBloq = true;

    setTimeout(() => {
        primeiroCard.classList.remove('flip');
        segundoCard.classList.remove('flip');
        
        resetTabuleiro();
    }, 1500);
}

function resetTabuleiro() {
    [cardVirada, tabuleiroBloq] = [false, false];
    [primeiroCard, segundoCard] = [null, null];
}

(function embaralhar(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

