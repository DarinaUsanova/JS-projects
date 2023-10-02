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
  timeValue.innerHTML = `<span>Time :</span>${minutesValue}:${secondsValue}`;
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
        <div class="card-before">👻</div>
        <div class="card-after">
          <img src="${cardValues[i].image}" class="image" />
        </div>
      </div>
    `;
  }
  // Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  // Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        // flip the clicked card
        card.classList.add("flipped");
        // if it is the first card (!firstCard since firstCard is initially false)
        if (!firstCard) {
          // so current card will become firstCard
          firstCard = card;
          // current card's value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          // increment moves since user selected second card
          movesCounter();
          // secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue === secondCardValue) {
            // if both cards match, add matched class so these cards would be ignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            // set firstCard to false since next card would be first now
            firstCard = false;
            // winCount increment as user found a correct match
            winCount += 1;
            // check if winCount == half of cardValues
            if (winCount === Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won! Happy Helloween!</h2><h4>Moves : ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            // if the cards don't match
            // flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
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
stopButton.addEventListener("click", () => {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
});

// Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  matrixGenerator(cardValues);
};

initializer();


