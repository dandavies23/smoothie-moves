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

        fruitVegArray = [...fruitVegArray, ...fruitVegArray]
        // Randomise array using Math.random
        fruitVegArray.sort(() => 0.5 - Math.random())

        // Constants and empty arrays
        const grid = document.querySelector('.grid-container') // picks up HTML
        const resultDisplay = document.querySelector('#result')
        let cardsChosen = []
        let cardsChosenId = []
        let cardsWon = []
        var barWidth = 0

        // Set progress to 0
        // document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', barWidth);
        // document.getElementsByClassName('progress-bar').item(0).setAttribute('style','width:'+Number(barWidth)+'%');

        //let scorebarelement = document.getElementById('score-bar')
        //et scorebar.style.width = barWidth + '%'

        // Create board
        function createSmoothieGrid() {
            for (let i = 0; i < fruitVegArray.length; i++) {
                let card = document.createElement('img');
                card.setAttribute('src', 'images/tumbler.png');
                card.setAttribute('data-id', i);
                card.addEventListener('click', tumblerLift)
                grid.appendChild(card);
            }
        }
    
  // Tumbler lift - if time want to work out lift animation 
      function tumblerLift() {
        let cardId = this.getAttribute('data-id')
        this.style.pointerEvents = 'none';
        cardsChosen.push(fruitVegArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', fruitVegArray[cardId].img)
        console.log(fruitVegArray[cardId])
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
            this.style.pointerEvents = 'auto';
            cards[optionTwoId].style.pointerEvents = 'auto';
            console.log(cardsWon)
        }
    }

    // check for matches
    function checkForMatch() {
        let cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('Match! Added to the smoothie') // definitely need animation here
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/tumbler.png')
            cards[optionTwoId].setAttribute('src', 'images/tumbler.png')
            alert('Keep looking') // perhaps a web literal with eyeballs move to bottom of grid
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        barWidth = Math.round((cardsWon.length / 6) * 100) // converts cardsWon to percentage
        document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(barWidth) + '%'); 
        document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', cardsWon.length); 

        if (cardsWon.length === fruitVegArray.length / 2) {
            resultDisplay.textContent = 'Smoothie is made! Press below to drink it up!'
        }
    }

    createSmoothieGrid();
})