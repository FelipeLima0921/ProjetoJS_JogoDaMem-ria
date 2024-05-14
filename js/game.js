const grid = document.querySelector('.grid');

const characters = [
    'carro', 
    'aviao',
    'caminhao',
    'energia',
    'moto',
    'navio',
    'onibus',
    'planeta',   
];

let firstcard = null;
let secondcard = null;
let loop = null;

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 16) {
        clearInterval(loop);
        alert('Parabéns!!! Você completou o game!');
    }
}

const checkCards = () => {
    const firstObject = firstcard.getAttribute('data-object');
    const secondObject = secondcard.getAttribute('data-object');
    if (firstObject === secondObject) {
        firstcard.classList.add('disabled-card');
        secondcard.classList.add('disabled-card');
        firstcard = null;
        secondcard = null;
        checkEndGame();
    } 
    else {
        setTimeout(() => {
            firstcard.classList.remove('reveal-card');
            secondcard.classList.remove('reveal-card');
            firstcard = null;
            secondcard = null;
        }, 1000);
    }
}

const revealCard = ({target}) => {
    if (target.parentNode.classList.contains('reveal-card')) {
        return;
    }
    if (firstcard === null) {
        target.parentNode.classList.add('reveal-card');
        firstcard = target.parentNode;
    } 
    else if (secondcard === null) {
        target.parentNode.classList.add('reveal-card');
        secondcard = target.parentNode;
        checkCards();
    }
}

const createCard = (character) => {
    const card = document.createElement('div');
    card.className = 'card';
    const front = document.createElement('div');
    front.className = 'face front';
    const back = document.createElement('div');
    back.className = 'face back';
    front.style.backgroundImage = `url('../images/${character}.png')`;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-object', character);
    return card;
}

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

window.onload = () => {
    loadGame();    
}
