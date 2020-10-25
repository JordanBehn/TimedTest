var questiondiv = document.querySelector("#question");
var numCorrect = document.querySelector("#num-correct");
var minutesLeft = document.querySelector("#minutes");
var secondsLeft = document.querySelector("#seconds");
var startButton = document.querySelector("#start-button");
var secondsElapsed = 0;
var totalSeconds = 10;
var score = 5;
var questions = [{
        q: "Inside which HTML element do we put the JavaScript?",
        answers: ["<script>", "<code>", "<javascript"],
        correctIndex: 0
    },
    {
        q: "How do you create a function in JavaScript",
        answers: ["function:myFunction()", "function myFunction()", "function = myFunction()"],
        correctIndex: 1
    },
    {
        q: "How do you call a function named \"myFunction\"?",
        answers: ["call myFunction()", "myFunction()", "function myFunction()"],
        correctIndex: 1
    },
    {
        q: "How can you add a comment in JavaScript",
        answers: ["//", "<!>", "**"],
        correctIndex: 0
    },
    {
        q: "How would you generate a random integer between 0 and 9",
        answers: ["Math.random(9)", "Math random * 9", "Math.random()*9"],
        correctIndex: 2
    },
]
console.log(questions)
console.log(questions[2].answers[1])

renderTime()
renderQuestion();
startTimer()

function getFormattedMinutes() {
    //
    var secondsLeft = totalSeconds - secondsElapsed;

    var minutesLeft = Math.floor(secondsLeft / 60);

    var formattedMinutes;

    if (minutesLeft < 10) {
        formattedMinutes = "0" + minutesLeft;
    } else {
        formattedMinutes = minutesLeft;
    }

    return formattedMinutes;
}

function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;

    var formattedSeconds;

    if (secondsLeft < 10) {
        formattedSeconds = "0" + secondsLeft;
    } else {
        formattedSeconds = secondsLeft;
    }

    return formattedSeconds;
}

function renderTime() {

    minutesLeft.textContent = getFormattedMinutes();
    secondsLeft.textContent = getFormattedSeconds();
    if (secondsElapsed >= totalSeconds) {
        clearInterval(interval);
        numCorrect.textContent = "Final Score: " + score;
        //resets timer and goes to score page when time is up
    }
}

function startTimer() {
    interval = setInterval(function() {
        secondsElapsed++;
        renderTime();
    }, 1000);
}


function renderQuestion() {};