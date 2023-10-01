// variables
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;
let firstCardValue;

// Items array
const items = [
  { name: "first", image: "img/first.jpeg" },
  { name: "second", image: "img/second.jpeg" },
  { name: "third", image: "img/third.jpeg" },
  { name: "fourth", image: "img/fourth.jpeg" },
  { name: "fifth", image: "img/fifth.jpeg" },
  { name: "sixth", image: "img/sixth.jpeg" },
  { name: "seventh", image: "img/seventh.jpeg" },
  { name: "eight", image: "img/eighth.jpeg" },
  { name: "ninth", image: "img/ninth.jpeg" },
  { name: "tenth", image: "img/tenth.jpeg" },
  { name: "eleventh", image: "img/eleventh.jpeg" },
];

// Initial time
let seconds = 0;
let minutes = 0;

// Initial moves and win count
let movesCount = 0;
let winCount = 0;

// Timer
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  // time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

// Calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

// Pick random objects from the items array
const generateRandom = (size = 4) => {
  // temp array
  let tempArray = [...items];
  // initializes cardValues array
  let cardValues = [];
  // size (4*4)
  size = (size * size) / 2;
  // random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    // once selected, remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  // simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
          <img src="${cardValues[i].image}" class="image" />
        </div>
      </div>
    `;
  }
  
// Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  matrixGenerator(cardValues);
};

initializer();


