function logHighScore() {

    if(typeof(Storage) !== "undefined"){ 
        // Move storage if storage is undefined here so that hiScore can be retrieved only if storage exist
        
        let highScore = parseInt(document.getElementById("highscore").innerHTML = localStorage.getItem("storedHighScore")); //accesses the info from the local storage
        
        if (finalScore >= highScore) { //if the final score is higher than the high score
                localStorage.setItem("storedHighScore", finalScore); // then store the current score in storage
                document.getElementById("high-score").innerHTML = localStorage.getItem("storedHighScore"); // display the current score as the new high score 
            }
        if (finalScore <= highScore) {
                document.getElementById("high-score").innerHTML = localStorage.getItem("storedHighScore");
            }
    } else {
        localStorage.setItem("storedHighScore", 0)
        }
        }

// alternative version 

function logHighScore () {
    
}