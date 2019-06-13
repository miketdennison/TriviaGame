/* Variables */

// Basic Variables
var intervalId;
var clockRunning = false;
var time = 5;
var questionNumber = 0;

// Question objects, and initialization of an array that contains all the questions
var question_1 = {
    question: "With current technology, how long does it take to get to the Sun from Earth?",
    possibleAnswers: ["106 days", "366 days", "95 days", "64 days"],
    correctAnswer: "106 days"
}
var question_2 = {
    question: "How many times larger is Jupiter than the Earth?",
    possibleAnswers: ["500x", "2100x", "5200x", "1300x"],
    correctAnswer: "1300x"
}
var question_3 = {
    question: "How many degrees (F) is Venus?",
    possibleAnswers: ["864F", "772F", "1023F", "424F"],
    correctAnswer: "864F"
}
var question_4 = {
    question: "How many billion light-years is the known universe?",
    possibleAnswers: ["4B", "46B", "23B", "92B"],
    correctAnswer: "46B"
}
var questions = [question_1, question_2, question_3, question_4];

/* Timer Functions*/

// When user clicks start, initialize timer, then wait 1 second before displaying question
$("#start-button").on("click", function () {
    startTimer();
    $("#start-button").hide();
    setTimeout(nextQuestion, 1000);
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
        //endRound();
    }
}

function stopTimer() {
    clearInterval(intervalId);
    clockRunning = false;
}

/*Question/Answer Functions*/

// Get the next question from the array, and update the respective HTML
function nextQuestion() {
    $("#question-text").text(questions[questionNumber].question);
    for (var i = 0; i < questions[questionNumber].possibleAnswers.length; i++) {
        $("#answer-" + i).text(questions[questionNumber].possibleAnswers[i]);
    }
    $("#question-text").text(questions[questionNumber].question);
    questionNumber++;
}

// When user clicks question, get the text and verify it
$(".answer").on("click", function () {
    var answer = $(this).text();
    verifyAnswer(answer);
});

// Check whether user was right or wrong
function verifyAnswer(a) {
    // questionNumber-1 bc we already incremented the question number
    for (var i = 0; i < questions[questionNumber - 1].possibleAnswers.length; i++) {
        if (questions[questionNumber - 1].possibleAnswers[i] !== questions[questionNumber - 1].correctAnswer)
            $("#answer-" + i).text(" ");
    }
    if (a == questions[questionNumber - 1].correctAnswer) {
        console.log("winner!")
    } else {
        console.log("loser!")
    }
    setTimeout(nextQuestion, 500);
}
