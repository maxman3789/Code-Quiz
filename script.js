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
var questionIndex = 0;
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 10;

// Variable - Query Selectors
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsquery = document.querySelector("#questions");

// Creates new element as a list
var newul = document.createElement("ul");

// Button has a timer countdown when clicked
timer.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                endQuiz();
                currentTime.textContent = "Out of time!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {

    // Clears existing data 
    questionsquery.innerHTML = "";
    newul.innerHTML = "";
    
    // For loops to loop through all info from 'questions' in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title 
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsquery.textContent = userQuestion;
    }
    
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsquery.appendChild(newul);
        newul.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        // creates Div element for displaying correct and incorrect answers
        var create = document.createElement("div");
        create.setAttribute("id", "create");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            create.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;

        } else {
            // Deducts time for incorrect answers
            secondsLeft = secondsLeft - penalty;
            create.textContent = "Incorrect! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    // Question Index determines which question is presented
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        endQuiz();
        create.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsquery.appendChild(create);

}

// Function to append the last page
function endQuiz() {
    questionsquery.innerHTML = "";
    currentTime.innerHTML = "";

    // Create a message for when it is Done
    var headone = document.createElement("h1");
    headone.setAttribute("id", "headone");
    headone.textContent = "All Done!"

    questionsquery.appendChild(headone);

    // Create message for Final Score
    var pscore = document.createElement("p");
    pscore.setAttribute("id", "pscore");

    questionsquery.appendChild(pscore);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        clearInterval(holdInterval);
        pscore.textContent = "Your Score is: " + timeRemaining;

    }

    // Create Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsquery.appendChild(createLabel);

    // Create input field
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsquery.appendChild(createInput);

    // Create Submit Button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsquery.appendChild(createSubmit);

    // Event listener for entering and saving initials and scores
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            
            // Redirects to score
 
            if (allScores) {
                window.location.replace("scores.html");
            }
        }
    });

}