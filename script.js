var questions = [

    ["What was Kirby named after?", 
    "a lawyer", 
    "a city", 
    "a vacuum", 
    "a cartoonist"],

    ["Which Super Smash Bros. Game first featured King Dedede as a playable character?",
    "Super Smash Bros. Brawl",
    "Super Smash Bros. Melee",
    "Super Smash Bros. 64",
    "Super Smash Bros. for Wii U"],

    ["Who created Kirby?",
    "Masahiro Sakurai",
    "Shigeru Miyamoto",
    "Satoru Iwata",
    "Keiji Inafune"]

];

var answeredQuestions = [];

var question = document.querySelector("#title-and-questions");
var description = document.querySelector("#description");
var start = document.querySelector("#start");
var answerList = document.querySelector("#answer-choices");
var time = document.querySelector("#time");
var rightWrong = document.querySelector("#right-wrong");
var enterScore = document.querySelector("#enter-score");

var questionNum = 1;
var timeLeft = questions.length * 15;
var highScores = [];

if (localStorage.getItem("scoreList") !== null) {

    highScores = localStorage.getItem(scoreList);

}

start.addEventListener("click", function() {

    startGame();

})

answerList.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {

        var result = "Wrong!"

        if (event.target.id === "#correct") {

            result = "Correct!"

        } else {

            timeLeft -= 10;

        }

        rightWrong.innerHTML = "<hr>" + result;

        var waitTime = 1;
        var interval = setInterval (function() {

            if (waitTime < 1) {

                rightWrong.innerHTML = "";
                clearInterval(interval);

            }

            waitTime--

        }, 1000)

        answerList.innerHTML = "";

        if (questions.length > 0) {

            newQuestion();

        } else {

            inputScore();

            if (event.target.id === "#submit") {



            }

        }

    } 


})

enterScore.addEventListener("click", function(event) {
    
    event.preventDefault();

})

function startGame() {

    description.textContent = "";
    start.remove();
    question.style.textAlign = "left";

    newQuestion();

}

function newQuestion() {

    console.log(questions);
    console.log(answeredQuestions);

    var answerBank = [];
    var randIndex = Math.floor(Math.random() * questions.length);
    question.textContent = questions[randIndex][0];
    var correctAnswer = document.createElement("button");
    correctAnswer.className ="btn"
    correctAnswer.id = "#correct"
    correctAnswer.style.display = "block";
    correctAnswer.style.marginTop = "20px";
    correctAnswer.textContent = questions[randIndex][1];
    answerBank.push(correctAnswer);

    for (var i = 2; i < questions[randIndex].length; i++) {

        var wrongAnswer = document.createElement("button");
        wrongAnswer.className ="btn"
        wrongAnswer.id = "#wrong"
        wrongAnswer.style.display = "block";
        wrongAnswer.style.marginTop = "20px";
        wrongAnswer.textContent = questions[randIndex][i]
        answerBank.push(wrongAnswer);

    }

    var answerNum = 1;

    while (answerBank.length !== 0) {

        var randInd = Math.floor(Math.random() * answerBank.length);
        answerBank[randInd].textContent = answerNum + ". " +answerBank[randInd].textContent;
        answerList.appendChild(answerBank[randInd]);
        answerBank.splice(randInd, 1);
        answerNum++;

    }

    answeredQuestions.unshift(questions.splice(randIndex, 1)[0]);

}

function inputScore() {

    var name = document.createElement("input");
    var submit = document.createElement("button");
    submit.id = "#submit";
    submit.className = "btn";
    submit.textContent = "Submit";
    name.setAttribute("maxlength", "3");
    question.style.textAlign = "";
    question.textContent = "Game Over!";
    description.textContent = "Your final score is " + timeLeft;
    enterScore.textContent = "Enter initials: ";
    enterScore.appendChild(name);
    enterScore.appendChild(submit);

}