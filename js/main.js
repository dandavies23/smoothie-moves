document.addEventListener('DOMContentLoaded', () => {
    // Hide alert bar
    //$('progressAlerts').hide();

    /* When the page is loaded start game - consider inserting name and using to start game function*/

// fruit and veg pairs

const fruitVegArray = [
    {
        name: 'apple',
        img: 'images/appletest.png'
    },
    {
        name: 'apple',
        img: 'images/appletest.png'
    },
    {
        name: 'beetroot',
        img: 'images/beetroottest.png'
    },
    {
        name: 'beetroot',
        img: 'images/beetroottest.png'
    },
    {
        name: 'blueberries',
        img: 'images/blueberriestest.png'
    },
    {
        name: 'blueberries',
        img: 'images/blueberriestest.png'
    },
    {
        name: 'broccoli',
        img: 'images/broccolitest.png'
    },
    {
        name: 'broccoli',
        img: 'images/broccolitest.png'
     },
     {
        name: 'carrot',
        img: 'images/carrottest.png'
    },
    {
        name: 'carrot',
        img: 'images/carrottest.png'
    },     
    {
        name: 'lemon',
        img: 'images/lemontest.png'
    },
    {
        name: 'lemon',
        img: 'images/lemontest.png'
    },
    
]
// Randomise array using Math.random
fruitVegArray.sort(() => 0.5 - Math.random())

// Constants and empty arrays
const grid = document.querySelector('.grid-container') // picks up HTML
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenId = []
let cardsWon = []
let barWidth = 0
//let scorebarelement = document.getElementById('score-bar')
//et scorebar.style.width = barWidth + '%'

// Create board
function createSmoothieGrid () {
    for (let i = 0; i < fruitVegArray.length; i++) {
        let card = document.createElement('img');
        card.setAttribute('src', 'images/tumbler.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', tumblerLift)
        grid.appendChild(card);
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
        alert('Keep looking') // perhaps a web literal with eyeballs move to top of loop?
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    barWidth = Math.round((cardsWon.length / 6) * 100)
    
    console.log(barWidth) // 
    if (cardsWon.length === fruitVegArray.length/2) {
        resultDisplay.textContent = 'Congratulations! Smoothie is made!'
    }
}

// Tumbler lift - if time want to work out lift animation 
function tumblerLift() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(fruitVegArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', fruitVegArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}

    
createSmoothieGrid();
})