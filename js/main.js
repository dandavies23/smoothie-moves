document.addEventListener('DOMContentLoaded', () => {
    // Hide alert bar
    //$('progressAlerts').hide();

    /* When the page is loaded start game - consider inserting name and using to start game function*/

    // setup game vars and cards

        // fruit and veg pairs

        let fruitVegArray = [{
                name: 'apple',
                img: 'images/apple.png'
            },
            {
                name: 'beetroot',
                img: 'images/beetroot.png'
            },
            {
                name: 'blueberries',
                img: 'images/blueberries.png'
            },
            {
                name: 'broccoli',
                img: 'images/broccoli.png'
            },
            {
                name: 'carrot',
                img: 'images/carrot.png'
            },
            {
                name: 'lemon',
                img: 'images/lemon.png'
            },

        ]

        // double up the array to generate pairs thanks to CI Mentor Askshat Garg for this one
        fruitVegArray = [...fruitVegArray, ...fruitVegArray]
        
        // Randomise array using Math.random no need for casino-level random algos
        fruitVegArray.sort(() => 0.5 - Math.random())

        // Constants and empty arrays
        const grid = document.querySelector('.grid-container') // picks up HTML
        const resultDisplay = document.querySelector('#result')
        const alertDisplay = document.querySelector('#nudges')
        let cardsChosen = []
        let cardsChosenId = []
        let cardsWon = []
        var barWidth = 0

        // Create board and 'cards'
        function createSmoothieGrid() {
            for (let i = 0; i < fruitVegArray.length; i++) {
                let card = document.createElement('img');
                card.setAttribute('src', 'images/tumbler.png');
                card.setAttribute('data-id', i);
                card.setAttribute('class', 'gridimage') // defining images in the grid
                card.addEventListener('click', tumblerLift)
                grid.appendChild(card);
            }
        }
    
  // Tumbler lift - if time want to work out lift animation 
      function tumblerLift() {
        if(this.src.includes('images/blank.png')){return null} // prevents fruit from reappearing credit Y0urs Truly from Github for helping fix this bug
        let cardId = this.getAttribute('data-id')

        cardsChosen.push(fruitVegArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', fruitVegArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    // check for matches
    function checkForMatch() {
        let cards = document.querySelectorAll('.gridimage') // prevents site logo from becomming a tumbler
        console.log(cards) // this is really useful when I don't have to engage brain in testing
        const optionOneId = cardsChosenId[0]

        // if cardsChosenId incorporated array position needs to be rejected - preventing double tap
        const optionTwoId = cardsChosenId[1]
        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/tumbler.png')
            cards[optionTwoId].setAttribute('src', 'images/tumbler.png')
            alertDisplay.textContent = 'Cool it down cucumber! You tapped that twice :)'
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            alertDisplay.textContent = 'Match! Smashed into the smoothie'
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/tumbler.png')
            cards[optionTwoId].setAttribute('src', 'images/tumbler.png')
            alertDisplay.textContent = 'Keep looking! 👀' // perhaps a web literal with eyeballs move to bottom of grid - worked with Emoji!
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        barWidth = Math.round((cardsWon.length / 6) * 100) // converts cardsWon to percentage for progress  bar
        document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(barWidth) + '%'); 
        document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', cardsWon.length); 

        if (cardsWon.length === fruitVegArray.length / 2) {
            resultDisplay.textContent = 'Smoothie is made!'
            alertDisplay.textContent = 'Press below to drink it up!'
        }
    }

    createSmoothieGrid();
})
