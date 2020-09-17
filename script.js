//questions formatted as question, right answer, wrong answers
var questions = [

    ["What was Kirby named after?", 
    "a lawyer", 
    "a city", 
    "a vacuum", 
    "a developer"],

    ["Which Super Smash Bros. Game first featured King Dedede as a playable character?",
    "Super Smash Bros. Brawl",
    "Super Smash Bros. Melee",
    "Super Smash Bros. 64",
    "Super Smash Bros. for Wii U"],

    ["Who created Kirby?",
    "Masahiro Sakurai",
    "Shigeru Miyamoto",
    "Satoru Iwata",
    "Keiji Inafune"],

    ["Which Kirby game was the first remake of a previous title?",
    "Kirby: Nightmare in Dream Land",
    "Kirby Super Star Ultra",
    "Kirby's Return to Dream Land",
    "Kirby's Extra Epic Yarn"],

    ["Which was the first multiplayer Kirby game?",
    "Kirby's Dream Course",
    "Kirby Super Star",
    "Kirby Air Ride",
    "Kirby and the Amazing Mirror",]

];

//questions that have been used will go in here
var answeredQuestions = [];

//various query selectors for future use
var question = document.querySelector("#title-and-questions");
var description = document.querySelector("#description");
var start = document.querySelector("#start");
var answerList = document.querySelector("#answer-choices");
var time = document.querySelector("#time");
var rightWrong = document.querySelector("#right-wrong");
var enterScore = document.querySelector("#enter-score");
var scoreList = document.querySelector("#score-list");
var clear = document.querySelector("#clear");

//variables stored for later use
var questionNum = 1;
var timeLeft = questions.length * 15;
var highScores = [];
var initials;
var timer;

//retrieves score list from local storage if one exists
if (localStorage.getItem("scoreList") !== null) {
    highScores = JSON.parse(localStorage.getItem("scoreList"));
}

//different script is used if not on index
if (location.href.includes("high-scores")) {
    highScores = sort(highScores);

    for (var i = 0; i < highScores.length; i++) {

        var score = document.createElement("li")
        score.className = "scores";
        score.textContent = (i + 1) + ". " + highScores[i];
        scoreList.appendChild(score);

    }

    //behavior for "Clear" button on high score page
    clear.addEventListener("click", function() {

        scoreList.textContent = "";
        localStorage.removeItem("scoreList");
    })

//script used on main page/index
} else {

    //starts game if "Start" is clicked
    start.addEventListener("click", function() {

        startGame();

    })

    //checks which answer used clicked, moves onto next question if one of the choices is clicked, and displays "right" or "wrong" for about 1 second depending on the choice
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

            // ends game if unused questions bank runs out
            if (questions.length > 0) {
                newQuestion();

            // stops timer and asks for user input to store score
            } else {
                clearInterval(timer);
                inputScore();
            }

        } 

    })

    //checks when user hits submit, and saves score if something is present in input
    //since the hyphen is used to extract the score for sorting, hyphen is not allowed
    enterScore.addEventListener("click", function(event) {
        event.preventDefault();

        if (event.target.id === "#submit") {

            if (!initials.value || initials.value.includes("-")) {
                document.querySelector("#message").textContent = "Please enter valid initials."
            } else {

                highScores.push(initials.value + " - " + timeLeft);
                console.log(highScores);
                var storable = JSON.stringify(highScores);
                console.log(storable);
                localStorage.setItem("scoreList", storable);
                location.href = "high-scores.html";

            }

        }

    })
}

//starts game and timer
function startGame() {


    description.textContent = "";
    start.remove();
    question.style.textAlign = "left";
    time.textContent = "Time: "+ timeLeft;
    timer = setInterval(function() {

        time.textContent = "Time: "+ timeLeft;

        if (timeLeft < 1) {
            clearInterval(timer);
            inputScore();
        } else {
            timeLeft--;
        }

    }, 1000)

    newQuestion();

}

//changes page to display a random question with answers in random order
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

        var randInd = Math.floor(Math.random() * answerBank.length);
        answerBank[randInd].textContent = answerNum + ". " +answerBank[randInd].textContent;
        answerList.appendChild(answerBank[randInd]);
        answerBank.splice(randInd, 1);
        answerNum++;

    }

    //removes question displayed and places inside array of used questions
    answeredQuestions.unshift(questions.splice(randIndex, 1)[0]);

}

//changes page to ask for user input score
function inputScore() {

    timeLeft = parseInt(time.textContent.substr(6));
    answerList.textContent = "";
    initials = document.createElement("input");
    var submit = document.createElement("button");
    submit.id = "#submit";
    submit.className = "btn";
    submit.textContent = "Submit";
    initials.setAttribute("maxlength", "3");
    question.style.textAlign = "";
    question.textContent = "Game Over!";
    description.textContent = "Your final score is " + timeLeft;
    enterScore.textContent = "Enter initials: ";
    enterScore.appendChild(initials);
    enterScore.appendChild(submit);

}

//sorts array from highest to lowest score
function sort(arr) {

    if (arr.length <= 1) {
        return arr;
    }

    var mid = Math.floor(arr.length / 2)
    var left = arr.slice(0, mid);
    var right = arr.slice(mid);

    return merge(sort(left), sort(right))

}

//merge sort helper method
function merge(arr1, arr2) {

    var resultArr = [];
    var indexLeft = 0;
    var indexRight = 0;

    while (indexLeft < arr1.length && indexRight < arr2.length) {

        var value1 = parseInt(arr1[indexLeft].substring(arr1[indexLeft].indexOf("-") + 1));
        var value2 = parseInt(arr2[indexRight].substring(arr2[indexRight].indexOf("-") + 1));

        if (value1 > value2) {
            resultArr.push(arr1[indexLeft]);
            indexLeft++;
        } else {
            
            resultArr.push(arr2[indexRight]);
            indexRight++;

        }

    }
    
    return resultArr.concat(arr2.slice(indexRight)).concat(arr1.slice(indexLeft));

}

