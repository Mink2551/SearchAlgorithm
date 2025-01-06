const display_value = document.getElementById("display-value");
const display = document.getElementById("display");
const callUp = document.getElementById("up");
const callDown = document.getElementById("down");
const userInput = document.getElementById("userInput");
const callNext = document.getElementById("Next");
const callCorrect = document.getElementById("correct");

let min = 0;
let max = 0;
let change = 0;
let left = 0;
let fillTime = 0;
let guess = 0;  // To store the current guess value

callDown.disabled = true;
callNext.disabled = true;
callUp.disabled = true;
userInput.disabled = true;

display_value.value = `min\n V \n ${min} \n\nmax\n  V  \n\n ${max} \n\nchange\n V \n\n ${change} \n\nlefts\n  V  \n\n ${left} `;

const check_new_value = () => {
    display_value.value = `min\n V \n ${min} \n\nmax\n  V  \n\n ${max} \n\nchange\n V \n\n ${change} \n\nlefts\n  V  \n\n ${left} `;
};

const log2 = (n) => {
    return Math.log(n) / Math.log(2);
};

const makeTurn = (low, high) => {
    let n = high - low + 1;
    return Math.ceil(log2(n));
};

display.value = "Press Start...";

const game = () => {
    callCorrect.disabled = true;
    callCorrect.innerText = "Correct";
    fillValue();
};

const fillValue = () => {
    if (fillTime == 0) {
        display.value = "Enter the minimum number...";
        userInput.disabled = false;
        callNext.disabled = false;
        fillTime++;
    } else if (fillTime == 1) {
        if (!isNaN(userInput.value)) {
            display.value = "Enter the maximum number...";
            min = parseInt(userInput.value);
            fillTime++;
            check_new_value();
        } else {
            display.value = "Please enter a valid number for the minimum!";
        }
    } else if (fillTime == 2) {
        if (!isNaN(userInput.value)) {
            max = parseInt(userInput.value);
            fillTime++;
            change = makeTurn(min, max);
            left = makeTurn(min, max);; // Set left turns to total turns initially
            check_new_value();
            userInput.disabled = true
            startBinarySearch();
        } else {
            display.value = "Please enter a valid number";
        }
    } else if (fillTime == 3) {
        callDown.disabled = true;
        callNext.disabled = true;
        callUp.disabled = true;
        userInput.disabled = true;
        callCorrect.disabled = true

        display.value = `Finnaly! your number is ${guess}`;

        setTimeout(function() {
            location.reload()
        },2000)
    }
};

const startBinarySearch = () => {
    callCorrect.disabled = false
    guess = Math.floor((min + max) / 2); // Start with the middle value
    display.value = `Is your number ${guess}?`;
    callUp.disabled = false;
    callDown.disabled = false;
};

const updateGuess = (direction) => {
    // Adjust the guess based on user feedback
    if (direction === "down") {
        min = guess + 1; // Increase the lower bound
        display.value = `Too high! Is your number ${guess}?`;
    } else if (direction === "up") {
        max = guess - 1; // Decrease the upper bound
        display.value = `Too low! Is your number ${guess}?`;
    }

    left--; // Decrement remaining turns

    // Check if we have found the number
    if (min > max) {
        display.value = `Finnaly! your number is ${guess}`;
        callUp.disabled = true;
        callDown.disabled = true;
        return;
    }

    guess = Math.floor((min + max) / 2); // Calculate new guess
    display.value = `Is your number ${guess}?`;
    check_new_value();

    if (left <= 0) {
        display.value = "Out of turns! The number wasn't found!";
    }
};

// Event listeners for up/down buttons
callUp.addEventListener("click", () => updateGuess("up"));
callDown.addEventListener("click", () => updateGuess("down"));
