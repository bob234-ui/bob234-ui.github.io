// ----- DOM -----
const betInput = document.getElementById("betInput");
const newBtn = document.getElementById("newBtn");
const hitBtn = document.getElementById("hitBtn");
const standBtn = document.getElementById("standBtn");

const bankText = document.getElementById("bankText");
const betText = document.getElementById("betText");

const dealerCardsDiv = document.getElementById("dealerCards");
const playerCardsDiv = document.getElementById("playerCards");

const dealerValueText = document.getElementById("dealerValue");
const playerValueText = document.getElementById("playerValue");

const statusEl = document.getElementById("status");
const statusImg = document.getElementById("statusImg");

// ----- State -----
let bank = 100;
let bet = 0;

let deck = [];
let dealer = [];
let player = [];

let playing = false;

// ----- Event listeners (2+) -----
newBtn.addEventListener("click", newGame);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);

// init UI
updateBank();
updateBet();
setStatus("Enter a bet and click New Game.", "neutral");
clearStatusImg();

// ----- Game -----
function newGame() {
  bet = Number(betInput.value);

  if (!Number.isFinite(bet) || bet <= 0) {
    setStatus("Enter a valid bet (1 or more).", "neutral");
    clearStatusImg();
    return;
  }

  if (bet > bank) {
    setStatus("Bet is higher than your bank.", "neutral");
    clearStatusImg();
    return;
  }

  playing = true;
  dealer = [];
  player = [];

  deck = makeDeck();
  shuffle(deck);

  // deal 2 each
  player.push(draw());
  dealer.push(draw());
  player.push(draw());
  dealer.push(draw());

  hitBtn.disabled = false;
  standBtn.disabled = false;

  updateBet();
  setStatus("Your turn: Hit or Stand.", "neutral");
  clearStatusImg();
  render(false);

  if (handValue(player) === 21) {
    endRound();
  }
}

function hit() {
  if (!playing) return;

  player.push(draw());
  render(false);

  if (handValue(player) > 21) {
    endRound();
  }
}

function stand() {
  if (!playing) return;
  endRound();
}

function endRound() {
  // dealer hits until 17+
  while (handValue(dealer) < 17) {
    dealer.push(draw());
  }

  playing = false;
  hitBtn.disabled = true;
  standBtn.disabled = true;

  render(true);

  const p = handValue(player);
  const d = handValue(dealer);

  if (p > 21) {
    bank -= bet;
    setStatus("You busted. You lose " + bet + ".", "lose");
    showLoseImg();
  } else if (d > 21) {
    bank += bet;
    setStatus("Dealer busted. You win " + bet + "!", "win");
    showWinImg();
  } else if (p > d) {
    bank += bet;
    setStatus("You win! +" + bet, "win");
    showWinImg();
  } else if (p < d) {
    bank -= bet;
    setStatus("You lose. -" + bet, "lose");
    showLoseImg();
  } else {
    setStatus("Push (tie).", "push");
    clearStatusImg(); // optional: no image for tie
  }

  if (bank < 0) bank = 0;
  updateBank();

  if (bank === 0) {
    setStatus("Bank is 0. Refresh to restart.", "lose");
    showLoseImg();
  }
}

// ----- Deck / Array / Loops -----
function makeDeck() {
  const suits = ["S", "H", "C", "D"];
  const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

  const d = [];
  for (let s = 0; s < suits.length; s++) {
    for (let r = 0; r < ranks.length; r++) {
      d.push({ suit: suits[s], rank: ranks[r] });
    }
  }
  return d;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

function draw() {
  return deck.pop();
}

// ----- Hand value -----
function handValue(hand) {
  let total = 0;
  let aces = 0;

  for (let i = 0; i < hand.length; i++) {
    const r = hand[i].rank;

    if (r === "A") {
      aces++;
      total += 11;
    } else if (r === "K" || r === "Q" || r === "J") {
      total += 10;
    } else {
      total += Number(r);
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

function render(showDealerAll) {

  if (showDealerAll) {
    dealerCardsDiv.textContent = handToText(dealer);
    dealerValueText.textContent = "Value: " + handValue(dealer);
  } else {

    dealerCardsDiv.textContent = "[hidden] " + handToText(dealer.slice(1));
    dealerValueText.textContent = "Value: ??";
  }

  playerCardsDiv.textContent = handToText(player);
  playerValueText.textContent = "Value: " + handValue(player);
}

function handToText(hand) {
  let out = "";
  for (let i = 0; i < hand.length; i++) {
    out += hand[i].rank + hand[i].suit;
    if (i !== hand.length - 1) out += "  ";
  }
  return out;
}

function setStatus(text, mode) {
  statusEl.textContent = text;
  statusEl.classList.remove("neutral", "win", "lose", "push");
  statusEl.classList.add(mode);
}

function updateBank() {
  bankText.textContent = "Bank: " + bank;
}
function updateBet() {
  betText.textContent = "Current Bet: " + bet;
}

function showWinImg() {
  statusImg.src = "img/check.png";
}
function showLoseImg() {
  statusImg.src = "img/x.png";
}
function clearStatusImg() {
  statusImg.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
}
