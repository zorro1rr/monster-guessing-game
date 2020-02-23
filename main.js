//this project is a guessing game that hides a shuffled array of monster images (and 1 sock) behind a grid of "door" buttons. When a button is clicked, the monster/sock is revealed. If you find all of the monsters before the sock you win!


  // The monsters and socks
  var monsters = [
    'monster1',
    'monster2',
    'monster3',
    'monster4',
    'monster5',
    'monster6',
    'monster7',
    'monster8',
    'monster9',
    'monster10',
    'monster11',
    'sock'
  ];


  /**
* Randomly shuffle an array
* https://stackoverflow.com/a/2450976/1293256
* @param  {Array} array The array to shuffle
* @return {String}      The first item in the shuffled array
*/
var shuffle = function (array) {

var currentIndex = array.length;
var temporaryValue, randomIndex;

// While there remain elements to shuffle...
while (0 !== currentIndex) {
  // Pick a remaining element...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
}

return array;

};


//grab sections to inject html onto
const app = document.querySelector('#app');
const losses = document.querySelector('#losses');
const wins = document.querySelector('#wins');
//keep track of how many monsters have been found
let found = 0;
//keep track of losses
let lossCount = 0;
//keep track of wins
let winCount = 0;
//make a clickhandler function to attach eventListener too
const clickHandler = function (event) {
//check if button has the the data-monster-id attribute if not end the function
var monster = event.target.closest('[data-monster-id]');
if(!monster) return;


//get monsters index
let id = monster.getAttribute('data-monster-id');
//// Update the HTML for the button's parent element
    // This will replace the button so that the content can't be clicked again
    // We'll use the id to get the monster from our shuffled array
monster.parentNode.innerHTML = '<img src="images/' + monsters[id] +'.png">';
//check if the door has an id === to sock, if so run the lossHandler and end the function with return.
if(monsters[id] === 'sock') {
  lossHandler();
  return;
  //if the monsters[id] is not a sock then add 1 to the found count
} else {
  found++;
  console.log(found);
}

//if the found count reaches 11 (one less than the 12 door grid)m the run the winHandler function
if(found === 11) {
  winHandler();
  return;
}
};

//make function to handle losses
const lossHandler = function(){
//put delay on alert to let user see the sock for .3 a second before annoucing loss.
setTimeout(function(){
  alert("You found the socks, try again!");
//reset the found count back to 0
  found = 0;
//rerender the page
  render();
//add a lossCount and inject the count into the html
  lossCount++;
  console.log(lossCount);
  losses.innerHTML = 'Losses: ' + lossCount;
  return;
}, 300);
};

//make function to handle wins
const winHandler = function(){
//put delay on alert to let user see the monster for .3 a second before annoucing win.
setTimeout(function(){
alert("Congrats! you won the game!");
//reset the found count back to 0
found = 0;
//rerender the page
render();
//add a winCount and inject the count into the html
    winCount++;
    console.log(winCount);
    wins.innerHTML = 'Wins: ' +  winCount;
return;
}, 300);
};

//function to render door grid
const render = function (){
  //shuffle monster array using helper function
  shuffle(monsters);
  console.log(monsters);
  //inject into dom, use .map/join to loop through the monster array and give each door a data-monster-id equal to the monsters index you can check for in the clickHandler.
app.innerHTML = '<h1>Monsters!</h1>' + '<p id="p1">Click the doors to reveal what\'s behind them. Try to find all the monsters before the sock appears!</p>' +
'<div class="row">' + monsters.map(function (monster, index) {
return '<div class="grid">' + '<button data-monster-id="'+ index +'"><img src="images/door.png"</button>' + '</div>';
}).join('') + '</div>';
};

//keep track of losses




//render the monsters on page load
render();

//set up event listener to check for clicks, clickHandler function will make sure you click on a door button.
document.addEventListener('click', clickHandler, false);
