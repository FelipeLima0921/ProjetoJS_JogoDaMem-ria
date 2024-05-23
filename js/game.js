const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
const matchSound = document.getElementById('match-sound');
const gameSound = document.getElementById('game-sound');

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
matchSound.volume = 0.5;
gameSound.volume = 0.25;

function playGameSound() {
    gameSound.play();
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
        const timeElapsed = 45 - parseInt(timer.innerHTML);
        alert('Parabéns!!! Você ganhou um brinde!');
        saveTime(timeElapsed);
        updateRanking();
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
    showallCards();
    playGameSound();
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

const saveTime = (time) => {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.push(time);
    ranking.sort((a, b) => a - b);
    if (ranking.length > 10) {
        ranking.pop();
    }
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

const getRanking = () => {
    return JSON.parse(localStorage.getItem('ranking')) || [];
}

const updateRanking = () => {
    let ranking = getRanking();
    let rankingTable = `<table>
        <tr>
            <th>Posição</th>
            <th>Tempo</th>
        </tr>`;
    ranking.forEach((time, index) => {
        rankingTable += `<tr>
            <td>${index + 1}</td>
            <td>${time.toFixed(2)}</td>
        </tr>`;
    });
    rankingTable += `</table>`;
    document.getElementById('ranking').innerHTML = rankingTable;
}

const resetRanking = () => {
    localStorage.removeItem('ranking');
    updateRanking();
    alert('Ranking resetado com sucesso!');
}

window.onload = () => {
    startTimer();
    loadGame();  
    updateRanking();
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetRanking);
}
