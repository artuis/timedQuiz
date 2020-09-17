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


var timeLeft = questions.length * 10;
var question = document.querySelector("#title-and-questions");
var description = document.querySelector("#description");
var start = document.querySelector("#start");
var answerList = document.querySelector("#answer-choices");

var questionNum = 1;

start.addEventListener("click", function() {

    startGame();

})

answerList.addEventListener("click", function(event) {

    if (questions.length < 1) {

        displayScore();

    } else {



    }

})

function startGame() {

    description.remove();
    start.remove();
    question.style.textAlign = "left";

    newQuestion();

}

function newQuestion() {

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

        var randIndex = Math.floor(Math.random() * answerBank.length);
        answerBank[randIndex].textContent = answerNum + ". " +answerBank[randIndex].textContent;
        answerList.appendChild(answerBank[randIndex]);
        answerBank.splice(randIndex, 1);
        answerNum++;

    }

    answeredQuestions.unshift(questions.splice(randIndex, 1));

}

function displayScore() {

}