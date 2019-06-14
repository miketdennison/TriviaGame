/* Variables */

// Basic Variables
var intervalId;
var clockRunning = false;
var time = 10;
var questionNumber = 0;
var correctAnswers = 0;
const totalNumOfQuestions = 4;

// Question objects, and initialization of an array that contains all the questions
var question_1 = {
    question: "With current technology, how long does it take to get to the Sun from Earth?",
    possibleAnswers: ["106 days", "366 days", "95 days", "64 days"],
    correctAnswer: "106 days"
}
var question_2 = {
    question: "How many times (x) larger is Jupiter than the Earth?",
    possibleAnswers: ["500x", "2100x", "5200x", "1300x"],
    correctAnswer: "1300x"
}
var question_3 = {
    question: "How many degrees (F) is Venus?",
    possibleAnswers: ["864F", "772F", "1023F", "424F"],
    correctAnswer: "864F"
}
var question_4 = {
    question: "How many billion light-years (B) is the known universe?",
    possibleAnswers: ["4B", "46B", "23B", "92B"],
    correctAnswer: "46B"
}
var questions = [question_1, question_2, question_3, question_4];

/* Timer Functions*/

// Audio for launch button
playLaunch = function () {
    var audio = new Audio("assets/sounds/launch.mp3");
    audio.loop = false;
    audio.play();
}

// When user clicks start, initialize timer, then wait 1 second before displaying question
$("#start-button").on("click", function () {
    playLaunch();
    clockRunning = false;
    questionNumber = 0;
    correctAnswers = 0;
    $("#start-button").hide();
    $("#time-left").text("Time Left: " + time);
    startTimer();
    nextQuestion();
    $(".answer").show();
});

function startTimer() {
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
}

function count() {
    time--;
    if (time >= 0) {
        $("#time-left").text("Time Left: " + time);
    } else {
        stopTimer();
        // triggers end of round if time runs out
        verifyAnswer((false)); 
    }
}

function stopTimer() {
    clearInterval(intervalId);
    clockRunning = false;
}

/*Question/Answer Functions*/

// Get the next question from the array, and update the respective HTML
function nextQuestion() {
    if (questionNumber === totalNumOfQuestions) {
        endGame();
    }
    $("#win-loss").text("");
    $("#question-text").text(questions[questionNumber].question);
    // Display all possible answers
    for (var i = 0; i < questions[questionNumber].possibleAnswers.length; i++) {
        $("#answer-" + i).text(questions[questionNumber].possibleAnswers[i]);
    }
    questionNumber++;
}

// When user clicks question, get the text and verify it
$(".answer").on("click", function () {
    var answer = $(this).text();
    if(clockRunning) {
        verifyAnswer(answer);
    }
});

// Check whether user was right or wrong
function verifyAnswer(a) {
    // questionNumber-1 bc we already incremented the question number
    for (var i = 0; i < questions[questionNumber - 1].possibleAnswers.length; i++) {
        if (questions[questionNumber - 1].possibleAnswers[i] !== questions[questionNumber - 1].correctAnswer)
            $("#answer-" + i).text(" ");
    }

    // if correct, show user
    if (a == questions[questionNumber - 1].correctAnswer) {
        $("#win-loss").removeClass("red").addClass("green");
        $("#win-loss").html("&#x1f44d; Awwww, yeah! Correct!");
        correctAnswers++;
    // if wrong, show user
    } else if (a !== false) {
        $("#win-loss").removeClass("green").addClass("red");
        $("#win-loss").html("&#x1f44e; Nah, that's wrong!");
    // if time ran out, show user
    } else {
        $("#win-loss").removeClass("green").addClass("red");
        $("#win-loss").html("&#x231b; Out of time!");
    }

    // stop timer to pause until next round
    stopTimer();

    // Set up new timer, and display it for next question
    time = 10;
    $("#time-left").text("Time Left: " + time);

    // Allow user to see correct answer
    setTimeout(startTimer, 1000 * 3);
    setTimeout(nextQuestion, 1000 * 3);
}

/* End Game Logic */

playProblem = function () {
    var audio = new Audio("assets/sounds/problem.mp3");
    audio.loop = false;
    audio.play();
}

playSmall = function () {
    var audio = new Audio("assets/sounds/smallstep.mp3");
    audio.loop = false;
    audio.play();
}

function endGame() {
    // Reset HTML and display number of correct answers
    stopTimer();
    if(correctAnswers < 3) {
        playProblem();
    } else {
        playSmall();
    }
    $("#win-loss").text("");
    $("#question-text").text("Answers Correct: " + correctAnswers + " of " + totalNumOfQuestions);
    $("#time-left").text("");
    $(".answer").hide();
    $("#start-button").show();
}