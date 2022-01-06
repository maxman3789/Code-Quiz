// Declare Questions, Choices, and Answers in an object
// https://codepen.io/boopalan002/pen/yKZVGa
// Questions from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS

var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<scripting>", "<js>", "<javascript>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["The <head> section", "Both in <head> and <body>", "<body>"],
        answer: "<body>"
    },
    {
        title: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script name='xxx.js'>", "<script src='xxx.js'>", "<script href='xxx.js'>"],
        answer: "<script src='xxx.js'>"
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msg('Hello World');"],
        answer: "alert('Hello World');"
    },
    {
        title: "How do you create a function in JavaScript?",
        choices: ["function myFunction()", "function:myFunction()", "function = myFunction()"],
        answer: "function myFunction()"
    }
];

// Variables
var score = 0;
var questionIdx = 0;
var seconds = 100;
var interval = 0;
var incorrect = 10;

// Variable - Query Selectors
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTimer");
var questionsquery = document.querySelector("#questions");

// Creates new element as a list
//https://stackoverflow.com/questions/11351135/create-ul-and-li-elements-in-javascript
var newul = document.createElement("ul");

// https://www.w3schools.com/howto/howto_js_countdown.asp
// Button has a timer countdown when clicked
timer.addEventListener("click", function () {
// setInterval and clearInterval https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    if (interval === 0) {
        interval = setInterval(function () {
            seconds--;
            currentTime.textContent = "Time: " + seconds;

            if (seconds <= 0) {
                clearInterval(interval);
                endQuiz();
                currentTime.textContent = "Out of time!";
            }
        }, 1000);
    }
    show(questionIdx);
});

// shows the questions and possible answers on page 
function show(questionIdx) {

    // Blank data 
    questionsquery.innerHTML = "";
    newul.innerHTML = "";
    
    // For loop to check text from 'questions' in array
    for (var i = 0; i < questions.length; i++) {

        // Appends question 
        var createQuestion = questions[questionIdx].title;
        var createAnswer = questions[questionIdx].choices;
        questionsquery.textContent = createQuestion;
    }
    
    // appends answers and creates list items
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    createAnswer.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsquery.appendChild(newul);
        newul.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Event to compare choices with answer
// .match for this function https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
// https://www.tutorialrepublic.com/javascript-tutorial/javascript-regular-expressions.php
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        // creates Div element for displaying correct and incorrect answers
        var display = document.createElement("div");
        display.setAttribute("id", "display");

        // correct answer text 
        if (element.textContent == questions[questionIdx].answer) {
            score++;
            display.textContent = "Correct!";

        } else {
            // Deducts time for incorrect answers and says correct answer
            seconds = seconds - incorrect;
            display.textContent = "Incorrect! The correct answer is:  " + questions[questionIdx].answer;
        }

    } 
    questionIdx++;

    if (questionIdx >= questions.length) {
        // endQuiz displays user's score
        endQuiz();
        display.textContent = "You got  " + score + "/" + questions.length + " correct!";
    } else {
        show(questionIdx);
    }
    questionsquery.appendChild(display);

}

// Function to append the last page
function endQuiz() {
    questionsquery.innerHTML = "";
    currentTime.innerHTML = "";

    // Create a message for when it is Done
    var headone = document.createElement("h1");
    headone.setAttribute("id", "headone");
    headone.textContent = "You're Finished!"

    questionsquery.appendChild(headone);

    // Create message for Final Score
    var pmessage = document.createElement("p");
    pmessage.setAttribute("id", "pmessage");

    questionsquery.appendChild(pmessage);

    var pscore = document.createElement("p");
    pscore.setAttribute("id", "pscore");

    questionsquery.appendChild(pscore);

    // Calculates time remaining and replaces it with score
    if (seconds >= 0) {
        var remainder = seconds;
        clearInterval(interval);
        pmessage.textContent = "Your Score is: ";
        pscore.textContent = remainder;

    }

    // Creates label
    var labelField = document.createElement("label");
    labelField.setAttribute("id", "labelField");
    labelField.textContent = "Enter your initials: ";

    questionsquery.appendChild(labelField);

    // Creates input field
    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "initials");
    inputBox.textContent = "";

    questionsquery.appendChild(inputBox);

    // Creates Submit Button
    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit-button");
    submit.textContent = "Submit";

    questionsquery.appendChild(submit);

    // Event listener for entering and saving initials and scores
    submit.addEventListener("click", function () {
        var initials = inputBox.value;

        if (initials === null) {

            console.log("Nothing");

        } else {
            var finalScore = {
                initials: initials,
                score: remainder
            }      
            
            var saveScore = localStorage.getItem("saveScore");
            if (saveScore === null) {
                saveScore = [];
            } else {
                saveScore = JSON.parse(saveScore);
            }
            saveScore.push(finalScore);
            var newScore = JSON.stringify(saveScore);
            localStorage.setItem("saveScore", newScore);
            
            // Redirects to score page
            // https://stackoverflow.com/questions/38338144/how-can-i-make-a-button-redirect-my-page-to-another-page-using-addeventlistener
 
            if (saveScore) {
                window.location.replace("scores.html");
            }
        }
    });

}