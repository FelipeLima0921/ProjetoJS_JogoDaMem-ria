const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
const flipSound = document.getElementById('flip-sound');
const matchSound = document.getElementById('match-sound');

const characters = [
    'carro', 
    'aviao',
    'caminhao',
    'energia',
    'moto',
    'navio',
    'onibus',
    'planeta',  
    'bike', 
];

let firstcard = null;
let secondcard = null;
let loop = null;
flipSound.volume = 0.5;
matchSound.volume= 1;

function playFlipSound() {
    flipSound.play();
}

function playMatchSound() {
    matchSound.play();
}

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 18) {
        clearInterval(loop);
        alert('Parabéns!!! Você ganhou um brinde!');
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
        playMatchSound();
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
        playFlipSound();
    } 
    else if (secondcard === null) {
        target.parentNode.classList.add('reveal-card');
        secondcard = target.parentNode;
        checkCards();
        playFlipSound();
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
    showallCards();
}

const showallCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => card.classList.add('reveal-card'));
    setTimeout(hideallCards, 3000);
}

const hideallCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => card.classList.remove('reveal-card'));
}

function reiniciarPagina(condicao) {
    if (condicao) {
        window.location.reload();
    }
}

const startTimer = () => {
    loop = setInterval(() => {
        const currentTime = parseInt(timer.innerHTML);
        if (currentTime > 0) {
            timer.innerHTML = currentTime - 1;
        } 
        else {
            reiniciarPagina(true);
        }
    }, 1000);
}

window.onload = () => {
    startTimer();
    loadGame();  
}
