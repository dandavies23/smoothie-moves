// constants in later versions more fruit veg could be added 
let FRUIT_VEG_LIST = [{
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
]
document.addEventListener('DOMContentLoaded', () => {
    /* When the page is loaded start game - consider inserting name and using to start game function*/

    // Constants and empty arrays
    let grid = document.querySelector('.grid-container') // picks up HTML grid first
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
    var progressBarWidth = 0;
    let turns = 0;
    var startTime = 0;
    var timeDiff = 0;
    var score = 0;

     // double up the array to generate pairs thanks to CI Mentor Askshat Garg for this one
    let fruitVegList = [...FRUIT_VEG_LIST, ...FRUIT_VEG_LIST]
    let intervalRef = null;

    // define elements on page
    let alertDisplay = document.querySelector('#nudges') // feeling that this isn't needed
    let resultDisplay = document.querySelector('#result')
    let movesDisplay = document.querySelector('#moves')
    let timeDisplay = document.querySelector('#seconds')
    let smoothieProgressBar = document.getElementsByClassName('progress-bar')
    
    // Create board and 'cards'
    function initialiseGame() {
        // Randomise array using Math.random no need for casino-level random algos
        fruitVegList.sort(() => 0.5 - Math.random())
        initialiseTimer ();
        for (let i = 0; i < fruitVegList.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'assets/images/tumbler.png'); 
            card.setAttribute('data-id', i);
            card.setAttribute('class', 'gridimage') // defining images in the grid
            card.addEventListener('click', onTumblerClick)
            grid.appendChild(card);
        }
        // opening comments and screen variables
        alertDisplay.textContent = 'Your fruit and veg are hiding under the cups...'
        resultDisplay.textContent = '0'
        movesDisplay.textContent = '0'
        timeDisplay.textContent = '0'   
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
    // Tumbler removed on click
    function onTumblerClick() {
        const isDisabled = (this.getAttribute('data-disabled') === 'true') || cardsChosen.length >= 2; //no more than 2 cards can be opened at a time
        if (isDisabled) {
            return null 
        } 
        // prevents fruit from reappearing credit Y0urs Truly from Github for helping fix this bug
        // Discussed with Akshat leaving veg in place in place rather than working toward an empty page 
        // Way to do this is to check if disabled attribute is present and then return null if not. https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(fruitVegList[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', `assets/images/${fruitVegList[cardId].img}`)
        this.setAttribute('data-disabled', 'true')
        incrementTurns();
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }
    function incrementTurns() {
        turns = turns + 1;
        movesDisplay.textContent = turns;
    }
    // check for matches
    function checkForMatch() {
        updateTimer ();
        let cards = document.querySelectorAll('.gridimage') // prevents site logo and other images from becoming involved with the game!
        const optionOneId = cardsChosenId[0]
        // if cardsChosenId incorporated array position needs to be rejected - preventing double tap
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            alertDisplay.textContent = 'Match! You have a full portion' // add a literate here? the name of the fruit or veg?
            cardsWon.push(cardsChosen)
            updateProgressBar();
        } else {
            cards[optionOneId].setAttribute('src', 'assets/images/tumbler.png')
            cards[optionTwoId].setAttribute('src', 'assets/images/tumbler.png')
            cards[optionOneId].setAttribute('data-disabled', 'false')
            cards[optionTwoId].setAttribute('data-disabled', 'false')
            alertDisplay.textContent = 'Keep looking! 👀' // perhaps a web literal with eyeballs move to bottom of grid - worked with Emoji!
        }
        cardsChosen = []
        cardsChosenId = []
        updateResults (); // need to create
        if (cardsWon.length === FRUIT_VEG_LIST.length) {
            onGameOver();
        }
    }

    function onGameOver() {
        const finalScore = calculateScore();
        localStorage[finalScore]=new Date().getTime().toString() //each key is a score and value is a time
        let scores=Object.keys(localStorage).sort((a,b)=>parseInt(a)-parseInt(b)).map(key=>`Score: ${key}\nDate Achieved: ${localStorage[key]}`) //example sort of scores
        console.log("Scores below\n"+) //example show of scores
        alertDisplay.textContent = 'Score: ' + finalScore
        smoothieProgressBar.item(0).addEventListener('click', resetBar)
        clearInterval(intervalRef);
    }

    function calculateScore() {
        endTime = new Date ().getTime() // end timer
        time = Math.round((endTime - startTime) / 1000)
        score = (turns * 10) + time
        return 650 - score;
    }

    function updateProgressBar() {
        progressBarWidth= Math.round((cardsWon.length / FRUIT_VEG_LIST.length) *  100) // converts cardsWon to percentage for progress  bar
        smoothieProgressBar.item(0).setAttribute('style', `width: ${Number(progressBarWidth)}%`);
        smoothieProgressBar.item(0).setAttribute('aria-valuenow', cardsWon.length);
    }

    function updateResults() {
        resultDisplay.textContent = cardsWon.length
    }

    function resetBar() {
        smoothieProgressBar.item(0).setAttribute('style', 'width: 0%')
        smoothieProgressBar.item(0).setAttribute('aria-valuenow', 0)
        setTimeout(restart, 500) // allowing the smoothie to drain
    }

    function restart() {
        // store score locally 
        // reset variables score timer here ?
        cardsChosen = []
        cardsChosenId = []
        cardsWon = []
        progressBarWidth = 0;
        turns = 0;
        startTime = 0;
        score = 0;
        moves = 0;

        grid.innerHTML = ""; // clears out old grid HTML
        resultDisplay.textContent = "0";
        movesDisplay.textContent = "0";
        timeDisplay.textContent = "0";
        alertDisplay.textContent = "Oh no those cheeky fruit and veg have hidden again! 😫";
        initialiseGame();
    }
    initialiseGame();
})
