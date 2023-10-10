// variables
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const audio = new Audio('mp3/936854.mp3');
const winAudio = new Audio('mp3/witch.mp3');
const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
const recordButton = document.getElementById("record");
const closeResultsButton = document.getElementById("close-results");
const recordPopup = document.getElementById("record-popup");
const table = document.getElementById("table");


let cards;
let interval;
let firstCard = false;
let secondCard = false;
let firstCardValue;
let delay;


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

// Audio play on start
document.addEventListener('DOMContentLoaded', function (){
  function playAudio(){
    audio.autoplay = true;
    audio.loop = true;
    audio.play();
  }
  startButton.addEventListener('click', playAudio);
});

// можно с одной переменной
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

// Save results for Local Storage
const saveGameResults = (time, moves) => {
  gameResults.push({time, moves});
  localStorage.setItem('gameResults', JSON.stringify(gameResults));
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
        <div class="card-before">👻</div>
        <div class="card-after">
          <img src="${cardValues[i].image}" class="image" />
        </div>
      </div>
    `;
  }

  const isEqualCards = () => {
    return firstCard.getAttribute("data-card-value") === secondCard.getAttribute("data-card-value")
  }

  const isEndOfTheGame = () => {
    return winCount === Math.floor(cardValues.length / 2)
  }

  const showWinMessage = () => {
    result.innerHTML = `<h2>You Won! Happy Halloween!</h2><h4>Moves : ${movesCount}</h4>`;
  }

  const resetCard = () => {
    firstCard = null;
    secondCard = null;
  }
  const clickHandler = (event) => {
    const card = event.target.closest(".card-container");

    // если карточка уже отыграна и найдена ее пара, то выходим из функции
    if (card.classList.contains("matched")) return;
    // если эта карточка уже перевернута, то тоже выходим из функции
    if (card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
    } else {
      movesCounter();
      secondCard = card;
      // если карточки равны
      if (isEqualCards()) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        winCount += 1;

        // если конец игры
        if (isEndOfTheGame()) {
          // отбражаем сообщение
          showWinMessage();
          record.style.display = "block";
          // останавливем игру после setTimeout на 191 строке
          setTimeout(stopGame, 1100);
          saveGameResults(`${minutes}:${seconds}`, movesCount);
        }

        // обнуляем карточки
        resetCard();
      } else {
        const [tempFirst, tempSecond] = [firstCard, secondCard];
        resetCard();
        setTimeout(() => {
          tempFirst.classList.remove("flipped");
          tempSecond.classList.remove("flipped");
        }, 900);
      }
    }

  }
  // Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  // Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", clickHandler);
  });
};

// Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  // controls and buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  // Start timer
  interval = setInterval(timeGenerator, 1000);
  // initial moves
  moves.innerHTML = `<span>Moves :</span> ${movesCount}`;
  initializer();
});

// Stop game
stopButton.addEventListener("click", stopGame);

function stopGame() {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
  audio.pause();
  winAudio.play();
}

//Fill table
const fillResultsTable = () => {
  const last10Results = gameResults.slice(-10);
  const table = document.getElementById('table');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  for (let i = 0; i < last10Results.length; i++) {
    const result = last10Results[i];
    const row = tbody.insertRow(i);
    const numberCell = row.insertCell(0);
    const timeCell = row.insertCell(1);
    const movesCell = row.insertCell(2);

    numberCell.textContent = i + 1;
    timeCell.textContent = result.time;
    movesCell.textContent = result.moves;
  }
};

//Show pop-up table
recordButton.addEventListener('click', () => {
  table.style.display = "block";
  closeResultsButton.style.display = "block";
  recordButton.style.display = "none";
});
closeResultsButton.addEventListener('click', () =>{
  table.style.display = "none";
  closeResultsButton.style.display = "none";
  recordButton.style.display = "block";
});


// Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  matrixGenerator(cardValues);

  if (gameResults.length) {
    recordButton.classList.remove('hide');
  }
};


initializer();
fillResultsTable();

