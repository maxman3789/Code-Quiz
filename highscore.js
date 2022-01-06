
// query selectors
var scoreArea = document.querySelector("#scoreArea");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

// Reset Scores 
// clears Local Storage https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Retrieves saved scores from local stroage 
var saveScore = localStorage.getItem("saveScore");
saveScore = JSON.parse(saveScore);

if (saveScore !== null) {

    // For Loop to generate saved text and scores
    for (var i = 0; i < saveScore.length; i++) {

        var createListItem = document.createElement("li");
        createListItem.textContent = saveScore[i].initials + " " + saveScore[i].score;
        scoreArea.appendChild(createListItem);

    }
}

// Event listener to move to index page
back.addEventListener("click", function () {
    window.location.replace("index.html");
});