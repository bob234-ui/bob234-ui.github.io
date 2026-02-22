document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#submitBtn").addEventListener("click", gradeQuizz);
    shuffleQ1Choices();
    showAttemptsOnLoad();
});

let score = 0;

function setFeedback(titleId, feedbackId, imgId, state, message) {

    let title = document.getElementById(titleId);
    let feedback = document.getElementById(feedbackId);
    let img = document.getElementById(imgId);

    title.classList.remove("correct", "incorrect");
    title.classList.add(state);

    feedback.textContent = message;

    if (state === "correct") {
        img.src = "img/check.jpg";
    } else {
        img.src = "img/x.png";
    }
}

function shuffleQ1Choices() {

    let choices = ["Paris", "Bruxelles", "London", "Geneva"];

    for (let i = choices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = choices[i];
        choices[i] = choices[j];
        choices[j] = temp;
    }

    let div = document.getElementById("q1ChoicesDiv");
    div.innerHTML = "";

    for (let i = 0; i < choices.length; i++) {

        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "q1";
        radio.value = choices[i];

        let label = document.createElement("label");
        label.textContent = choices[i];
        label.prepend(radio);

        div.append(label);
    }
}

function guessCapital() {

    let selected = document.querySelector("input[name=q1]:checked");

    if (!selected) {
        setFeedback("q1title", "q1Feedback", "q1Img", "incorrect", "No answer selected.");
        return;
    }

    if (selected.value === "Paris") {
        score += 20;
        setFeedback("q1title", "q1Feedback", "q1Img", "correct", "Correct!");
    } else {
        setFeedback("q1title", "q1Feedback", "q1Img", "incorrect", "Incorrect (Answer: Paris).");
    }
}

function guessContinent() {

    let input = document.getElementById("q2").value.trim();

    if (input === "") {
        setFeedback("q2title", "q2Feedback", "q2Img", "incorrect", "No answer entered.");
        return;
    }

    if (input === "africa") {
        score += 20;
        setFeedback("q2title", "q2Feedback", "q2Img", "correct", "Correct!");
    } else {
        setFeedback("q2title", "q2Feedback", "q2Img", "incorrect", "Incorrect (Answer: africa).");
    }
}

function guessCSUMB() {

    let input = document.getElementById("selectInput").value;

    if (input === "California") {
        score += 20;
        setFeedback("q3title", "q3Feedback", "q3Img", "correct", "Correct!");
    } else {
        setFeedback("q3title", "q3Feedback", "q3Img", "incorrect", "Incorrect (Answer: California).");
    }
}

function guessNumberStates() {

    let raw = document.getElementById("numberInput").value;

    if (raw === "") {
        setFeedback("q4title", "q4Feedback", "q4Img", "incorrect", "No number entered.");
        return;
    }

    if (Number(raw) === 50) {
        score += 20;
        setFeedback("q4title", "q4Feedback", "q4Img", "correct", "Correct!");
    } else {
        setFeedback("q4title", "q4Feedback", "q4Img", "incorrect", "Incorrect (Answer: 50).");
    }
}

function guessArctic() {

    let west = document.getElementById("checkWest").checked;
    let north = document.getElementById("checkNorth").checked;
    let south = document.getElementById("checkSouth").checked;
    let east = document.getElementById("checkEast").checked;

    if (!west && !north && !south && !east) {
        setFeedback("q5title", "q5Feedback", "q5Img", "incorrect", "No option selected.");
        return;
    }

    if (north && !west && !south && !east) {
        score += 20;
        setFeedback("q5title", "q5Feedback", "q5Img", "correct", "Correct!");
    } else {
        setFeedback("q5title", "q5Feedback", "q5Img", "incorrect", "Incorrect (Answer: North only).");
    }
}

function updateAttempts() {

    let attempts = localStorage.getItem("quizAttempts");

    if (attempts === null) attempts = 0;
    else attempts = Number(attempts);

    attempts++;
    localStorage.setItem("quizAttempts", attempts);

    document.getElementById("attempts").textContent =
        "Total Times quiz taken: " + attempts;
}

function showAttemptsOnLoad() {

    let attempts = localStorage.getItem("quizAttempts");
    if (attempts === null) attempts = 0;

    document.getElementById("attempts").textContent =
        "Total Times quiz taken: " + attempts;
}

function gradeQuizz() {

    score = 0;

    guessCapital();
    guessContinent();
    guessCSUMB();
    guessNumberStates();
    guessArctic();

    document.getElementById("scoreNumber").textContent =
        "Score: " + score;

    if (score > 80) {
        document.getElementById("congrats").textContent =
            "Congratulations! You scored above 80!";
    } else {
        document.getElementById("congrats").textContent = "";
    }

    updateAttempts();
}