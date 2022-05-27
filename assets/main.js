/*jshint esversion: 6 */ 

// constants in later versions more fruit veg could be added 
const FRUIT_VEG_LIST = [{
    name: 'apple',
    img: 'apple.png'
},
{
    name: 'beetroot',
    img: 'beetroot.png'
},
{
    name: 'blueberries',
    img: 'blueberries.png'
},
{
    name: 'broccoli',
    img: 'broccoli.png'
},
{
    name: 'carrot',
    img: 'carrot.png'
},
{
    name: 'lemon',
    img: 'lemon.png'
},
];

document.addEventListener('DOMContentLoaded', () => {
    // when the page is loaded start game

    // variables and empty arrays
    let grid = document.querySelector('.grid-container'); // picks up HTML grid first
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let rankMessage = "";
    let finalScore = 0;
    var progressBarWidth = 0;
    let turns = 0;
    var startTime = 0;
	var endTime = 0;
    var timeDiff = 0;
    var score = 0;
	var time = 0;
	let rankImage = 0;
	var moves = 0;

     // doubles up array to generate pairs - thanks to CI Mentor Askshat Garg for suggesting
    let fruitVegList = [...FRUIT_VEG_LIST, ...FRUIT_VEG_LIST];
    let intervalRef = null;

    // defines elements on page
    let alertDisplay = document.querySelector('#nudges');
    let resultDisplay = document.querySelector('#result');
    let movesDisplay = document.querySelector('#moves');
    let timeDisplay = document.querySelector('#seconds');
    let resetButton = document.querySelector('#reset');
    const sendScoreButton = document.querySelector('#send_email');
    let smoothieProgressBar = document.getElementsByClassName('progress-bar');
    resetButton.addEventListener('click', resetBar); // reset button listener working here - thanks to Tim Stacy positioning advice
    sendScoreButton.addEventListener('click', sendScoreByEmail);

    function sendScoreByEmail(event){
        event.preventDefault();
        const userEmail = document.getElementById('userEmail').value;
        if (userEmail.length ==0){
            alert('Please enter your email');
        }
        else{
            console.log('Send email to ' + userEmail);
            var templateParams = {
                userEmail: userEmail,
                userScore: finalScore,
              };
            emailjs.send('service_h08zqvs', 'template_t7t4ue1', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
        }
        
        
    }


    // creates board and 'cards'
    function initialiseGame() {
        // randomises array using Math.random no need for casino-level random algos
        fruitVegList.sort(() => 0.5 - Math.random());
        initialiseTimer ();
        console.log(startTime);
        for (let i = 0; i < fruitVegList.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'assets/images/tumbler.png'); 
            card.setAttribute('data-id', i);
            card.setAttribute('class', 'gridimage'); // defining images in the grid
            card.addEventListener('click', onTumblerClick);
            grid.appendChild(card);
        }
        // opening comments and screen variables
        alertDisplay.textContent = 'Find your fruit and veg pairs...';
        resultDisplay.textContent = '0';
        movesDisplay.textContent = '0';
        timeDisplay.textContent = '0';   
    }

    function initialiseTimer () {
        startTime = new Date().getTime(); // start timer
        intervalRef = setInterval(updateTimer, 1000);
    }

    function updateTimer () {
        endTime = new Date().getTime();
        timeDiff = Math.round((endTime - startTime) / 1000);
        timeDisplay.textContent = timeDiff;
    }

    // tumbler removed on click
    function onTumblerClick() {
        const isDisabled = (this.getAttribute('data-disabled') === 'true') || cardsChosen.length >= 2; //no more than 2 cards can be opened at a time credit Y0urs Truly
        if (isDisabled) {
            return null; 
        } 
        // prevents fruit from reappearing - credit Y0urs Truly from Github for helping fix this bug and Akshat Garg for data-disabled guidance
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(fruitVegList[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', `assets/images/${fruitVegList[cardId].img}`);
        this.setAttribute('data-disabled', 'true');
        incrementTurns();
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function incrementTurns() {
        turns = turns + 1;
        movesDisplay.textContent = turns;
    }

    // checks for matches
    function checkForMatch() {
        updateTimer ();
        let cards = document.querySelectorAll('.gridimage'); // prevents site logo and other images from becoming involved with the game!
        const optionOneId = cardsChosenId[0];
        // if cardsChosenId array position is rejected - preventing double tap
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            alertDisplay.textContent = "Match! You have a full portion";
            console.log(cardsChosen[1]);
            cardsWon.push(cardsChosen);
            updateProgressBar();
        } else {
            cards[optionOneId].setAttribute('src', 'assets/images/tumbler.png');
            cards[optionTwoId].setAttribute('src', 'assets/images/tumbler.png');
            cards[optionOneId].setAttribute('data-disabled', 'false');
            cards[optionTwoId].setAttribute('data-disabled', 'false');
            alertDisplay.textContent = 'Keep looking! 👀';
        }
        cardsChosen = [];
        cardsChosenId = [];
        updateResults ();
        if (cardsWon.length === FRUIT_VEG_LIST.length) {
            onGameOver();
        }
    }

    function onGameOver() {
        finalScore = calculateScore();
        setRank ();
        rankBadge ();

        // localStorage for highest scores
        let myScore={date:new Date().getTime(), seconds:time, turns:movesDisplay.innerText, rank:rankStatus, score:finalScore}
        localStorage[finalScore]=JSON.stringify(myScore)
        //each key is a score and value is stringified score object
        let scores=Object.keys(localStorage).sort((a,b)=>parseInt(b)-parseInt(a))
        .map((key,index)=>{
            let score=JSON.parse(localStorage[key])
            return `(${index+1})\nScore: ${key}\nDate Achieved: ${score.date}\nSeconds taken: ${score.seconds}\nRank: ${score.rank}\nMoves made: ${score.turns}`
        }).join('\n\n')
        //the variable 'scores' is an example sort and map of score results
        console.log("Top scores\n"+scores) //example show of scores
       
        alertDisplay.textContent = `You scored ${finalScore} - ${rankMessage} `;
        smoothieProgressBar.item(0).addEventListener('click', resetBar);
        clearInterval(intervalRef);
    }

    // more notes on score in README - calibrated to over 500 with logical system and no mistakes
    // for higher you need a bit of luck!
    function calculateScore() {
        endTime = new Date ().getTime(); // end timer
        timeDisplay = endTime;
        time = Math.round((endTime - startTime) / 1000);
        score = (turns * 10) + time;
        return 700 - score;
    }

    // assigns smooth-move rank
    function setRank () {  
         if (finalScore > 550) {
            rankStatus = "Brilliant Beetroot";
            rankMessage = "you can't beat a beetroot!";
            rankImage = "best-beetroot.png";
         }
         else if (finalScore > 500) {
            rankStatus = "Cool Carrot";
            rankMessage = "you're one cool carrot!";
            rankImage = "cool-carrot.png";
         }
         else if (finalScore > 450) {
            rankStatus = "Better Broccoli";
            rankMessage = "you're getting broccoli better!";
            rankImage = "better-broccoli.png";
         }
         else if (finalScore > 400) {
            rankStatus = "Beginner Blueberry";
            rankMessage = "you've only just begun blueberry!";
            rankImage = "begin-blueberry.png";
         }
         else {
            rankStatus = "Aspiring Apple";
            rankMessage = "another go apple?";
            rankImage = "good-apple.png";
         }
        }
        
    function rankBadge () {
        var gridImages = document.getElementsByClassName("gridimage");
        for(var i = 0; i< gridImages.length;i++){
            gridImages[i].setAttribute("src", 'assets/images/'+rankImage);
        }
    }

    function updateProgressBar () {
        progressBarWidth= Math.round((cardsWon.length / FRUIT_VEG_LIST.length) *  100); // converts cardsWon to percentage for progress  bar
        smoothieProgressBar.item(0).setAttribute('style', `width: ${Number(progressBarWidth)}%`);
        smoothieProgressBar.item(0).setAttribute('aria-valuenow', cardsWon.length);
    }

    function updateResults () {
        resultDisplay.textContent = cardsWon.length;
    }

    function resetBar() {
        smoothieProgressBar.item(0).setAttribute('style', 'width: 0%');
        smoothieProgressBar.item(0).setAttribute('aria-valuenow', 0);
        setTimeout(restart, 500); // allowing the smoothie to drain
    }

    function restart() {
        // resets all game variables here
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        progressBarWidth = 0;
        turns = 0;
        startTime = 0;
        time = 0;
        score = 0;
        endTime = 0;
        timeDiff = 0;
        finalScore = 0;
        moves = 0;
        grid.innerHTML = "";
        resultDisplay.textContent = "0";
        movesDisplay.textContent = "0";
        timeDisplay.textContent = "0";
        alertDisplay.textContent = "Those cheeky fruit and veg have hidden again! 🙄";
        initialiseGame();
    }
    initialiseGame();
});
