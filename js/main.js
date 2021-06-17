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
    // setup game vars and cards ??? 
     // fruit and veg pairs
    // Constants and empty arrays
    const grid = document.querySelector('.grid-container') // picks up HTML
    const resultDisplay = document.querySelector('#result')
    const alertDisplay = document.querySelector('#nudges')
    const progressDisplay = document.querySelector('#display-progress')
    const smoothieProgressBar = document.getElementsByClassName('progress-bar')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
    var progressBarWidth = 0;
    let turns = 0;
    var startTime = 0;
    var score = 0;
     // double up the array to generate pairs thanks to CI Mentor Askshat Garg for this one
    let fruitVegList = [...FRUIT_VEG_LIST, ...FRUIT_VEG_LIST]
    // Create board and 'cards'
    function createSmoothieGrid() {
        // Randomise array using Math.random no need for casino-level random algos
        fruitVegList.sort(() => 0.5 - Math.random())
        initialiseTimer ();
        for (let i = 0; i < fruitVegList.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'images/tumbler.png');
            card.setAttribute('data-id', i);
            card.setAttribute('class', 'gridimage') // defining images in the grid
            card.addEventListener('click', onTumblerClick)
            grid.appendChild(card);
        }
    }
    function initialiseTimer () {
        startTime = new Date().getTime(); // start timer
    }
    // Tumbler removed on click
    function onTumblerClick() {
        if (this.src.includes('images/blank.png')) {
            return null 
        } // prevents fruit from reappearing credit Y0urs Truly from Github for helping fix this bug
        // Discussed with Akshat leaving veg in place in place rather than working toward an empty page 
        // Way to do this is to check if disabled attribute is present and then return null if not. https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(fruitVegList[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', `images/${fruitVegList[cardId].img}`)
        console.log(fruitVegList[cardId]) // really useful when don't want to engage brain
        incrementTurns();
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }
    function incrementTurns() {
        turns = turns + 1;
    }
    // check for matches
    function checkForMatch() {
        let cards = document.querySelectorAll('.gridimage') // prevents site logo and other images from becoming involved with the game!
        const optionOneId = cardsChosenId[0]
        // if cardsChosenId incorporated array position needs to be rejected - preventing double tap
        const optionTwoId = cardsChosenId[1]
        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/tumbler.png')
            cards[optionTwoId].setAttribute('src', 'images/tumbler.png') // worth thinking about here - could just leave the ingredient up and suggest tap another
            alertDisplay.textContent = 'Cool it down cucumber! You tapped that twice 🙂'
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alertDisplay.textContent = 'Match! You have a full portion' // add a literate here? the name of the fruit or veg?
            cards[optionOneId].setAttribute('src', 'images/blank.png') // instead of this add disabled attribute to cards
            cards[optionTwoId].setAttribute('src', 'images/blank.png') // instead of this add disabled attribute to cards
            cardsWon.push(cardsChosen)
            updateProgressBar();
        } else {
            cards[optionOneId].setAttribute('src', 'images/tumbler.png')
            cards[optionTwoId].setAttribute('src', 'images/tumbler.png')
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
        endTime = new Date ().getTime() // end timer
        time = Math.round((endTime - startTime) / 1000)
        score = (turns * 10) + time
        finalScore = 650 - score
        progressDisplay.textContent = 'You found all of the smoothie ingredients in ' + turns + ' moves and ' + time + ' seconds'
        alertDisplay.textContent = 'You scored ' + finalScore + '. Press below to drink it up! 😋'
        smoothieProgressBar.item(0).addEventListener('click', resetBar)
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
        let cardsChosen = []
        let cardsChosenId = []
        let cardsWon = []
        var progressBarWidth = 0;
        let turns = 0;
        var startTime = 0;
        var score = 0;
        // need to get rid of old grid... 
        createSmoothieGrid();
    }
createSmoothieGrid();
})