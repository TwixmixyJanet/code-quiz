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

// ~~~~~~~~~ DOM CONNECTIONS ~~~~~~~~~
/////////////////////////////////////////////////////
// .getElementById: Because this element is a timer, it's recommended to use getElementById because it's performance is generally regarded as faster
var timeRemaining = document.getElementById("time-remaining");
// .querySelector: Mostly used direct querySelector and created as many IDs I needed in the HTML to implement the JS where needed.
var startButton = document.querySelector("#start-button");
var header = document.querySelector("header");
var checkScore = document.querySelector("#check-score");
var introContainer = document.querySelector("#intro-container");
var quizContainer = document.querySelector("#quiz-container");
var quizQuestion = document.querySelector("#quiz-question");
var answerList = document.querySelector("#answer-list");
// .querySelectorAll utilized so I could select all of the elements with a class of ".options"
var answerOption = document.querySelectorAll(".options");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var answer = document.querySelector("#answer");
var inputScore = document.querySelector("#input-score");
var scoreHeader = document.querySelector("#score-header");
var yourScore = document.querySelector("#your-score");
var inputInitials = document.querySelector("#input-initials");
var submitButton = document.querySelector("#submit-button");
var highscores = document.querySelector("#highscores");
var yourRecord = document.querySelector("#your-record");
var returnButton = document.querySelector("#return-button");
var clearResults = document.querySelector("#clear-results");
/////////////////////////////////////////////////////

// ~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~
/////////////////////////////////////////////////////
// Time on the clock when the quiz begins
var timeRemainingSecs = 60; 
// Number of which question is being pulled from the array
var questionNum = 0;
// total score at end of quiz
var total = 0;
// Which question we are on
var questionPlacement = 1;

// QUESTIONS for the quiz, the array they are being pulled from.
var questionArr = [
    {
        question: "Which one of these is a cat?",
        options: ["1. 'MEOW'🐱", "2. 'BARK'🐶", "3. 'MOO'🐮", "4. 'TWEET'🐦"],
        answer: "1"
    },
    {
        question: "How many seconds was this quiz when it began?",
        options: ["1. 12,000", "2. 60", "3. 3", "4. -40"],
        answer: "2"
    },
    {
        question: "What is an iPhone?",
        options: ["1. CAT", "2. DOG", "3. A smartphone made by Apple that combines a computer, iPod, digital camera, and cellular phone into one device.", "4. COW"],
        answer: "3"
    },
    {
        question: "Why is there a leap day?",
        options: ["1. Because jumping is fun!", "2. Sometimes there are conclusions and you just have to leap to them.", "3. FROG", "4. The Earth's orbit around the sun actually takes around 365.25 days - there is an extra one-fourth day. Thus, to align the calendar year and the solar year, we decided to add one day every four years. This is because 0.25 days taken four times (for four years) would add up to a full day."],
        answer: "4"
    },
    {
        question: "How many ways are there to pet a cat?",
        options: ["1. ♾️", "2. No way!", "3. Don't bite me, kitty!", "4. With consent"],
        answer: "4"
    }
];
/////////////////////////////////////////////////////

// ~~~~~~~~~ FUNCTIONS ~~~~~~~~~
/////////////////////////////////////////////////////

// INITIATE THE QUIZ
function initiateQuiz() {
    introContainer.style.display = "none";
    quizContainer.style.display = "block";
    questionNum = 0;
    timer();
    displayQuestion(questionNum);
}

// TIMER ITERATION
// setInterval method is being called with a function to decrement the time. timer function also communicates with the DOM to display remaining seconds and it updates every second. If the time remaining reaches zero, the timer is cleared and it executes the endGame function. Same occurs when all the questions are answered before the time runs out.
function timer() {
    var timerIteration = setInterval(function() {
        timeRemainingSecs--;
        // using backtick comments so I don't have to concatinate
        timeRemaining.textContent = `Time remaining: ${timeRemainingSecs}s`;

        if (timeRemainingSecs <= 0) {
            clearInterval(timerIteration);
            scoreHeader.textContent = `That's all folks!`
            endGame();
        } else if (questionPlacement >= questionArr.length +1) {
            clearInterval(timerIteration);
            endGame();
            }
    }, 1000);
};

// INIIATE QUESTIONS
// Function to populate the questions/answers to the DOM, set up with an index argument to pass through the questions array. This function keeps track of which question we are on.
function displayQuestion (num) {
    quizQuestion.textContent = questionArr[num].question;
    answer1.textContent = questionArr[num].options[0];
    answer2.textContent = questionArr[num].options[1];
    answer3.textContent = questionArr[num].options[2];
    answer4.textContent = questionArr[num].options[3];
    questionNum = num;
}

// CONFIRM ANSWER
function assessAnswer(e) {
    console.log("did assessanswer run?")
    // e.preventDefault implemented to prevent the default action of clicking on a button. 
    e.preventDefault();
    // displays if the user got the previous answer correct or not, then the setTimeout removes it after a second.
    answer.style.display = "block";
    setTimeout (function() {
        answer.style.display = "none";
    }, 1000);

    // This is SUPPOSED to go into the array and find the answer for the corresponding question and check to see if the person clicked the correct one.
    if (questionArr[questionNum].answer) {
        console.log("did if question CORRECT run?")
        answer.textContent = "Bingo! (Correct)";
        total = timeRemainingSecs;

    // otherwise, the question is wrong and it reduces the time by 5 seconds and lets the user know it's wrong by displaying text.    
    } else {
        console.log("did if question WRONG run?")
        timeRemainingSecs -= 5;
        answer.textContent = "Sorry, that's wrong."
    }

    // The above is broken right now, BUT...
    // So long as the question we are on is less than the length of the array, then it will display the next question.
    if (questionNum < questionArr.length -1) {
        displayQuestion(questionNum +1);
    } else {
        // Otherwise it'll end the game
        endGame();
    }
    // Increments to the next question
    questionPlacement++;
};

// END THE GAME
function endGame() {
    // change the displays so other sections disappear and inputScore appears. Displays score total after game is complete.
    quizContainer.style.display = "none";
    timeRemaining.style.display = "none";
    inputScore.style.display = "block";
    // console.log(inputScore);
    yourScore.textContent = `Your score is: ${total}`;
};

// SORT SCORES
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

// HIGH SCORES
// 
function highScoresList() {
    // writes directly into the <p> element of the highscores section
    yourRecord.innerHTML = "";
    yourRecord.style.display = "block";
    // calls on the orderSortList to sort the highscore results, then slices the top 10 to display.
    var highScoresResults = orderListSort();
    var topScores = highScoresResults.slice(0,10);
    // Iterative loop to list the scores according to their placement from the sort function. Creates and appends element to display.
    for (let i = 0; i < topScores.length; i++) {
        var placement = topScores[i];
        var li = document.createElement("li");
        li.textContent = `${placement.user} - ${placement.score}`
        li.setAttribute("data-index", i);
        yourRecord.appendChild(li);
        // QUESTION: This automatically places them into an UL, is there a way to do this into an OL?
        // instead on the HTML I just force it to be placed into an OL.
    }
};

// ADD SCORES
// Start by retrieving the score results, then push(add) the new score, then store the results.
function addScore(num) {
    var compiledScores = retrieveResult();
    compiledScores.push(num);
    localStorage.setItem("resultsList", JSON.stringify(compiledScores));
};

// RETRIEVE RESULTS
// retrieveResults will execute when adding a score and when sorting the score list. List will be retrieved from localStorage. If the results is NOT empty then it'll parse the list and display it. Else it will initiate a new list.
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

// EACH SCORE
// Generate the user's initials along with their score, then pass off to the addScore and highscores
function individualScore() {
    var eachScore = {
        user: inputInitials.value,
        score: total
    }
    addScore(eachScore);
    highScoresList();
};
/////////////////////////////////////////////////////

// ~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~
/////////////////////////////////////////////////////
// View High Scores button
// show/hide elements on the DOM and initiate the highscores function
checkScore.addEventListener("click",function(e) {
    e.preventDefault();
    inputScore.style.display = "none";
    introContainer.style.display = "none";
    quizContainer.style.display = "none";
    highscores.style.display = "block";
    highScoresList();
});

// Start Quiz button to initiate the quiz
startButton.addEventListener("click", initiateQuiz);

// Answer button
answerOption.forEach(function(e) {
    e.addEventListener("click", assessAnswer)
});

// Submit initials button
submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    inputScore.style.display = "none";
    quizContainer.style.display = "none";
    highscores.style.display = "block";
    individualScore();
});

// Return to game from High Scores button
returnButton.addEventListener("click", function(e) {
    inputScore.style.display = "none";
    introContainer.style.display = "block";
    quizContainer.style.display = "none";
    highscores.style.display = "none";
    location.reload();
});

// Clear scores from High Scores
// fun little button to clear the local storage
clearResults.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    highScoresList();
});
/////////////////////////////////////////////////////