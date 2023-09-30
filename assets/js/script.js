// User Story
// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers

// Acceptance Criteria
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

//DOCUMENT CONNECTIONS
var startButton = document.querySelector("#start-button");
var header = document.querySelector("header");
var checkScore = document.querySelector("#check-score");
var timeRemaining = document.getElementById("time-remaining");
var introContainer = document.querySelector("#intro-container");
var quizContainer = document.querySelector("#quiz-container");
var quizQuestion = document.querySelector("#quiz-question");
var answerList = document.querySelector("#answer-list");
var answerOption = document.querySelector("options");
var answer1 = document.querySelector("answer1");
var answer2 = document.querySelector("answer2");
var answer3 = document.querySelector("answer3");
var answer4 = document.querySelector("answer4");
var answer = document.querySelector("answer");
var inputScore = document.querySelector("#input-score");
var scoreHeader = document.querySelector("#score-header");
var yourScore = document.querySelector("#your-score");
var inputInitials = document.querySelector("#input-initials");
var submitButton = document.querySelector("#submit-button");
var highscores = document.getElementById("#highscores");
var yourRecord = document.querySelector("#your-record");
var returnButton = document.querySelector("#return-button");
var clearResults = document.querySelector("#clear-results");
//////////////////////////////////////////

// GLOBAL VARIABLES
var timeRemainingSecs = 15; // update to be more time when it's done
var questionNum = 0;
var total = 0;
var questionPlacement = 1;

// QUESTIONS
var questionArr = [
    {
        question: "",
        options: ["1. one", "2. two", "3. three", "4. four"],
        answer: "",
    },
    {
        question: "",
        options: ["1. one", "2. two", "3. three", "4. four"],
        answer: "",
    },
    {
        question: "",
        options: ["1. one", "2. two", "3. three", "4. four"],
        answer: "",
    },
    {
        question: "",
        options: ["1. one", "2. two", "3. three", "4. four"],
        answer: "",
    },
    {
        question: "",
        options: ["1. one", "2. two", "3. three", "4. four"],
        answer: "",
    },
]

// INITIATE THE QUIZ
function initiateQuiz() {
    introContainer.style.display = "none";
    quizContainer.style.display = "block";
    questionNum = 0;
    timer();
    displayQuestions(questionNum);
}

// TIMER ITERATION
function timer() {
    var timerIteration = setInterval(function() {
        timeRemainingSecs--;
        timeRemaining.textContent = `Time remaining: ${timeRemainingSecs}s`;

        if (timeRemainingSecs <= 0) {
            clearInterval(timerIteration);
            timeRemaining.textContent = `😢 Sorry! You're out of time.`
            scoreHeader.textContent = `That's all folks!`
            endGame();
        } else if (questionPlacement >= questionArr.length +1) {
            clearInterval(timerIteration);
            endGame();
            }
    }, 1000);
}

function displayQuestion (num) {
    quizQuestion.textContent = questionArr[num].question;
    answer1.textContent = questionArr[num].options[0];
    answer2.textContent = questionArr[num].options[1];
    answer3.textContent = questionArr[num].options[2];
    answer4.textContent = questionArr[num].options[3];
    questionNum = num;
}

function assessAnswer(e) {
    e.preventDefault();
    answer.style.display = "block";
    setTimeout (function() {
        answer.style.display = "none";
    }, 1000);

    if (questionArr[questionNum].answer == e.target.value) {
        answer.textContent = "Bingo! (Correct)";
        total += 1;

    } else {
        timeRemainingSecs -= 5;
        answer.textContent = "Sorry, that's wrong."
    }

    if (questionNum < questionArr.length -1) {
        displayQuestion(questionNum +1);
    } else {
        endGame();
    }
    questionPlacement++;
};

function endGame() {
    quizContainer.style.display = "none";
    timeRemaining.style.display = "none";
    inputScore.style.display = "block";
    console.log(inputScore);
    yourScore.textContent = `Your score is: ${total}`;
};

function retrieveResult() {
    var resultsList = localStorage.getItem("resultsList");
    if (resultsList !== null) {
        newList = JSON.parse(resultsList);
        return newList;
    } else {
        newList = [];
    }
    return newList;
};

function highScoresList() {
    yourRecord.innerHTML = "";
    yourRecord.style.display = "block";
    var highScoresResults = orderListSort();
    var topScores = highScoresResults.slice(0,10);
    for (let i = 0; i < topScores.length; i++) {
        var placement = topScores[i];
        var li = document.createElement("li");
        li.textContent = `${placement.user} - ${placement.score}`
        li.setAttribute("data-index", i);
        yourRecord.appendChild(li);
    }
};

function orderListSort() {
    var unorderedList = retrieveResult();
    if (retrieveResult == null) {
        return;
    } else {
        unorderedList.sort(function(a,b) {
            return b.score - a.score;
        })
        return unorderedList;
    }
};

function addScore(num) {
    var compiledScores = retrieveResult();
    compiledScores.push(num);
    localStorage.setItem("resultsList", JSON.stringify(compiledScores));
};

function individualScore() {
    var eachScore = {
        user: inputInitials.value,
        score: total
    }
    addScore(individualScore);
    highScoresList();
};

startButton.addEventListener("click", initiateQuiz);
answerOption.forEach(function(e) {
    e.addEventListener("click", assessAnswer)
});
submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    inputScore.style.display = "none";
    introContainer.style.display = "none";
    quizContainer.style.display = "none";
    highscores.style.display = "block";
    individualScore();
});
checkScore.addEventListener("click", function(e) {
    e.preventDefault();
    inputScore.style.display = "none";
    introContainer.style.display = "none";
    quizContainer.style.display = "none";
    highscores.style.display = "block";
    highScoresList();
});
returnButton.addEventListener("click", function(e) {
    inputScore.style.display = "none";
    introContainer.style.display = "block";
    quizContainer.style.display = "none";
    highscores.style.display = "none";
    location.reload();
});
clearResults.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    highScoresList();
});