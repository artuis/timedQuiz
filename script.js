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
var scoreList = document.querySelector("#score-list");
var clear = document.querySelector("#clear");

var questionNum = 1;
var timeLeft = questions.length * 15;
var highScores = [];
var initials;
var timer;

if (localStorage.getItem("scoreList") !== null) {

    highScores = JSON.parse(localStorage.getItem("scoreList"));

}

if (location.href.includes("high-scores")) {

    highScores = sort(highScores);

    for (var i = 0; i < highScores.length; i++) {

        var score = document.createElement("li")
        score.className = "scores";
        score.textContent = (i + 1) + ". " + highScores[i];
        scoreList.appendChild(score);

    }

    clear.addEventListener("click", function() {

        scoreList.textContent = "";
        localStorage.removeItem("scoreList");

    })


} else {

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

                clearInterval(timer);
                inputScore();


            }

        } 

    })

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

    answeredQuestions.unshift(questions.splice(randIndex, 1)[0]);

}

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

function sort(arr) {

    if (arr.length <= 1) {

        return arr;

    }

    var mid = Math.floor(arr.length / 2)
    var left = arr.slice(0, mid);
    var right = arr.slice(mid);

    return merge(sort(left), sort(right))

}

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

