
// query selectors
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

// Reset Scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Retrieves local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createListItem = document.createElement("li");
        createListItem.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createListItem);

    }
}

// Event listener to move to index page
back.addEventListener("click", function () {
    window.location.replace("index.html");
});