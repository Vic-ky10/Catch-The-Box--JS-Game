// Dom Element

const box = document.querySelector("#box");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const highScoreDisplay = document.querySelector("#highScore");
const levelButtons = document.querySelectorAll(".level");

const clickSound = new Audio(
  "https://www.soundjay.com/button/sounds/button-16.mp3",
);

// GAME STATE VARIABLES

let score = 0;
let timeLeft = 30;
let gameInterval;
let moveInterval;
let speed = 1000;
let isPaused = false;
let combo = 0;
let multiplier = 1;

// high score
let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreDisplay.textContent = highScore;

// difficulty selection

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    speed = Number(button.dataset.speed); // Convert to number
    alert("Difficulty Selected!");
  });
});

// MOVE BOX FUNCTION

function moveBox() {
  const size = Math.floor(Math.random() * 40) + 30;

  box.style.width = size + "px";
  box.style.height = size + "px";

  const maxX = 500 - size;
  const maxY = 300 - size;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  box.style.left = randomX + "px";
  box.style.top = randomY + "px";

  // Random color
  const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
  box.style.background = randomColor;

  combo = 0;
  multiplier = 1;
}

box.addEventListener("click", () => {
  if (timeLeft > 0 && !isPaused) {
    clickSound.play();

    combo++;

    if (combo % 5 === 0) {
      multiplier++;
    }

    score += multiplier;
    scoreDisplay.textContent = score;

    moveBox();
  }
});

startBtn.addEventListener(
  "click",

  function showScreen() {
    clearInterval(gameInterval);
    clearInterval(moveInterval);

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    score = 0;
    timeLeft = 30;
    combo = 0;
    multiplier = 1;
    isPaused = false;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    moveBox();

    moveInterval = setInterval(moveBox, speed);

    gameInterval = setInterval(() => {
      if (!isPaused) {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
          endGame();
        }
      }
    }, 1000);
  },
);

// Pause || Resume

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
});

function endGame() {
  clearInterval(gameInterval);
  clearInterval(moveInterval);

  document.getElementById("gameArea").style.display = "none";
  document.getElementById("gameOverScreen").style.display = "block";
  document.getElementById("finalScore").textContent =
    "Your Final Score: " + score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = highScore;
  }
}
