// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Global variables
let randomNumber;
let attempts = 0;

// NEW: totals
let wins = 0;
let losses = 0;

const MAX_ATTEMPTS = 7;

initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  console.log("RandomNumber: " + randomNumber);

  attempts = 0;

  // Hide Reset, show Guess
  document.querySelector("#resetBtn").style.display = "none";
  document.querySelector("#guessBtn").style.display = "inline";

  // Clear input + feedback
  const playerGuess = document.querySelector("#playerGuess");
  playerGuess.value = "";
  playerGuess.focus();

  const feedback = document.querySelector("#feedback");
  feedback.textContent = "";
  feedback.style.color = "";

  // Clear previous guesses
  document.querySelector("#guesses").textContent = "";

  // Update UI stats
  updateAttemptsLeft();
  updateWinLoss();
}

function checkGuess() {
  const feedback = document.querySelector("#feedback");
  const input = document.querySelector("#playerGuess").value.trim();

  // Basic validation: empty or not a number
  if (input === "" || isNaN(input)) {
    feedback.textContent = "Please enter a valid number.";
    feedback.style.color = "red";
    return;
  }

  const guess = Number(input);

  if (guess < 1 || guess > 99) {
    feedback.textContent = "Please enter a number between 1 and 99.";
    feedback.style.color = "red";
    return;
  }

  attempts++;
  updateAttemptsLeft();

  // Show guess in previous guesses list
  document.querySelector("#guesses").textContent += guess + " ";

  // Compare
  if (guess === randomNumber) {
    feedback.textContent = "You guessed it! You won!";
    feedback.style.color = "darkgreen";

    wins++;
    updateWinLoss();
    gameOver();
    return;
  }

  // Not correct
  if (attempts >= MAX_ATTEMPTS) {
    feedback.textContent = "Sorry, you lost! The number was " + randomNumber + ".";
    feedback.style.color = "red";

    losses++;
    updateWinLoss();
    gameOver();
    return;
  }

  if (guess > randomNumber) {
    feedback.textContent = "Guess was too high.";
    feedback.style.color = "orange";
  } else {
    feedback.textContent = "Guess was too low.";
    feedback.style.color = "orange";
  }

  // Clear box for next guess
  document.querySelector("#playerGuess").value = "";
  document.querySelector("#playerGuess").focus();
}

function gameOver() {
  document.querySelector("#guessBtn").style.display = "none";
  document.querySelector("#resetBtn").style.display = "inline";
}

function updateAttemptsLeft() {
  const left = Math.max(0, MAX_ATTEMPTS - attempts);
  document.querySelector("#attemptsLeft").textContent = left;
}

function updateWinLoss() {
  document.querySelector("#wins").textContent = wins;
  document.querySelector("#losses").textContent = losses;
}
