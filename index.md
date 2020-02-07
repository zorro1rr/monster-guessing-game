<!DOCTYPE html>
<html>
<head>
	<title>Monsters!</title>

	<style type="text/css">
		body {
			margin: 1em auto;
			max-width: 40em;
			width: 88%;
		}

		/**
		 * A simple grid layout
		 */
		.row {
			display: grid;
			grid-template-columns: auto auto auto;
			text-align: center;
		}

		.grid {
			min-height: 6em;
			padding: 1em;
		}

		/**
		 * Make sure images scale
		 */
		img {
			height: auto;
			max-width: 100%;
		}

    /**
		 * Style buttons to not look like buttons
		 */
		[data-monster-id] {
			background-color: transparent;
			border: 0;
		}
	</style>
</head>
<body>

	<h1>Monsters!</h1>

	<div id="app"></div>


	<footer>
		<hr>
		<p class="text-small text-muted">Icons by <a href="https://thenounproject.com/term/door/311732/">Jamie Dickinson</a>, <a href="https://thenounproject.com/term/monster/184225/">Nicky Knicky</a>, <a href="https://thenounproject.com/term/monster/1510400/">Alvaro Cabrera</a>, <a href="https://thenounproject.com/term/monster/28460/">Eliricon</a>, <a href="https://thenounproject.com/term/monster/82823/">April Yang</a>, <a href="https://thenounproject.com/term/monster/1062009/">tk66</a>, <a href="https://thenounproject.com/term/monster/24990/">Alex WaZa</a>, <a href="https://thenounproject.com/term/monster/37212/">Husein Aziz</a>, <a href="https://thenounproject.com/term/monster/2236082">iconcheese</a>, and <a href="https://thenounproject.com/term/socks/38451/">Yazmin Alanis</a>.</p>
	</footer>

	<script>
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


//grab app to inject monsters onto
const app = document.querySelector('#app');
let found = 0;

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
  monster.parentNode.innerHTML = '<img src="' + monsters[id] +'.svg">';
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
    alert("You loss the game, try again!");
//reset the found count back to 0
    found = 0;
//rerender the page
    render();
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
  return;
}, 300);
};

//function to render door grid
  const render = function (){
    //shuffle monster array using helper function
    shuffle(monsters);
    //inject into dom, use .map/join to loop through the monster array and give each door a data-monster-id equal to the monsters index you can check for in the clickHandler.
  app.innerHTML = '<div class="row">' + monsters.map(function (monster, index) {
	return '<div class="grid">' + '<button data-monster-id="'+ index +'"><img src="door.svg"</button>' + '</div>';
}).join('') + '</div>';
};
//render the monsters on page load
render();

//set up event listener to check for clicks, clickHandler function will make sure you click on a door button.
document.addEventListener('click', clickHandler, false);

	</script>
</body>
</html>