// event listeners
document.querySelector("#guessBtn").addEventListener("click", guess);

// Global variables
let numberToGuess = Math.floor(Math.random() * 99) + 1; // generates random number between 0 and 99
let numberOfGuesses = 0;

function guess()
{
    let userGuess = document.querySelector("#userGuess").value;
    // ".value" is only for input element
    // userGuess = Number(userGuess); // converts string to number
    numberOfGuesses++;
    if (typeof(userGuess) == 'number')
    {
        document.querySelector("#checkGuess").textContent = "Input needs to be a number";
    }
    else
    {
        // 1. document.querySelector("#userGuesses").textContent += userGuess + " ";    
        if(userGuess > numberToGuess)
        {
            document.querySelector("#checkGuess").textContent = "Input is higher than number";
            document.querySelector("#checkGuess").style.color = "red";
            document.querySelector("#userGuesses").textContent += `${userGuess} `;
        }
        else if(userGuess < numberToGuess)
        {
            document.querySelector("#checkGuess").textContent = "Input is lower than number";
            document.querySelector("#checkGuess").style.color = "red";
            document.querySelector("#userGuesses").textContent += `${userGuess} `;
        }
        else
        {
            document.querySelector("#checkGuess").textContent = "You have guessed the number";
            document.querySelector("#checkGuess").style.color = "green";
            document.querySelector("#userGuesses").textContent += `${userGuess} `;
            alert("You have guessed the number !!! Good job !");
        }

    }

    if(numberOfGuesses == 7)
    {
        alert("You didn't guess the number !!! Good luck next time !");
    }
}