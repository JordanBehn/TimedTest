var questionDiv = document.querySelector("#question");
var numCorrect = document.querySelector("#num-correct");
var minutesLeft = document.querySelector("#minutes");
var secondsLeft = document.querySelector("#seconds");
var startButton = document.querySelector("#start-button");
var quizdiv = document.querySelector(".quiz");
var savedInitials = document.querySelector("#saved-initials");
var savedScore = document.querySelector("#saved-score");

var secondsElapsed = 0;
var totalSeconds = 120;
var score = 0;
var questions = [{
            q: "Inside which HTML element do we put the JavaScript?",
            answers: ["<script>", "<code>", "<javascript>"],
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
    //console logs

//render last round score and initials
savedInitials.textContent = localStorage.getItem("initials")
savedScore.textContent = localStorage.getItem("score")

//on start button click, start the time, render the quiz, remove start button
startButton.addEventListener("click", function() {
    interval = setInterval(function() {
        secondsElapsed++;
        renderTime();
    }, 1000);
    startButton.remove();
    runQuiz();
})

//formats remaining minutes
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
//formats remaining seconds
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
//Updates every second, displays the time remaining. At zero time remaining ends quiz
function renderTime() {
    minutesLeft.textContent = getFormattedMinutes();
    secondsLeft.textContent = getFormattedSeconds();
    if (secondsElapsed >= totalSeconds) {
        endQuiz();
    }
}
i = 0
    //runQuiz() asks the first question from the array questions. Answer choices are created as buttons
function runQuiz() {
    if (i >= questions.length) {
        endQuiz()
    } else {
        questionDiv.innerText = questions[i].q
        for (j = 0; j < questions[i].answers.length; j++) {
            var ansButton = document.createElement("button")
                //ansButton.className = "btn-primary btn-block text-left"
            ansButton.innerText = questions[i].answers[j]
            ansButton.className = "answer-button"
            ansButton.setAttribute("index", j)
                //on click, check answer and go to next question
            ansButton.addEventListener("click", function() {
                userAnswer = this.getAttribute("index");
                console.log(userAnswer)
                console.log(questions[i].correctIndex)

                if (questions[i].correctIndex == userAnswer) { score = score + 1 } else {}

                numCorrect.textContent = "Score: " + score;
                i++;
                runQuiz();
            })
            ansButton.style.alignContent = "space-between";
            ansButton.style.margin = "10px";
            questionDiv.appendChild(ansButton)
        }
    }
}

//write questions[i].q

//make buttons for questions[i].answers[all]
//compare value of button pressed to questions[i].correctIndex
//if wrong, subtract 10 seconds
//if right, add 1 to score
//go to next question
//}

//ends timer, saves initials and score, creates button to restart quiz
function endQuiz() {
    //display correct information, stop timer, save scores and initials
    clearInterval(interval);
    numCorrect.textContent = "Final Score: " + score;
    questionDiv.remove();
    var initials = prompt("Nice score! Enter your intials?")
    localStorage.setItem("initials", initials)
    localStorage.setItem("score", score)
    savedInitials.textContent = localStorage.getItem("initials")
    savedScore.textContent = localStorage.getItem("score")
        //create restart button that reloads page if clicked
    var restartBtn = document.createElement("button");
    restartBtn.innerHTML = "Try again?";
    quizdiv.appendChild(restartBtn);
    restartBtn.addEventListener("click", function() { location.reload() })
}