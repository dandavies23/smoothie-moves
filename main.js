document.addEventListener('DOMContentLoaded', () => {
    
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
        img: 'images/appletest.png'
    },
    {
        name: 'blueberries',
        img: 'images/blueberrietest.png'
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

const grid = document.querySelector('.grid-container') // picks up HTML

// Create board
function createSmoothieGrid () {
    for (let i = 0; i < fruitVegArray.length; i++) {
        let card = document.createElement('img'); // is let right here? 
        card.setAttribute('src', 'images/tumbler.png');
        card.setAttribute('data-id', i);
      //  card.addEventListener('click', tumblerLift)
      grid.appendChild(card);
    }
}

    
createSmoothieGrid();
})