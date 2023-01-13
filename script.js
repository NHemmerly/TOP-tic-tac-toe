//Javascript code for TOP-Tic-Tac-Toe
const displayController = (function () {

	let name = '';
	const input1 = document.getElementById('name1');
	const input2 = document.getElementById('name2');
	const gameCells = document.querySelectorAll('.game-cell');
	const player1Form = document.getElementById('form1');
	const player2Form = document.getElementById('form2');
	const submit1 = document.getElementById('submit1');
	const submit2 = document.getElementById('submit2');

	function _setPlayerName(e, playerName, playerForm, def) {
		e.preventDefault();
		const playerHeader = document.createElement('h2');
		if (playerName == '') {
			playerHeader.innerText = `Player ${def}`;
		} else {
			playerHeader.innerText = `${playerName}`;
		}
		playerForm.replaceWith(playerHeader);
	}

	let player1Name = submit1.addEventListener('click', (e) => _setPlayerName(e, input1.value, player1Form, 'X'));
	let player2Name = submit2.addEventListener('click', (e) => _setPlayerName(e, input2.value, player2Form, 'O'));

	return {
		getPlayerName: function(playerName) {
			if (playerName === 'player1') {
				name = ((input1.value === '') ? 'Player X' : input1.value);
			} else if (playerName === 'player2') {
				name = ((input2.value === '') ? 'Player O' : input2.value);
			} 
			return name;
		},
		gameCells
	};

}());

const player = (name, gamePiece) => {
	return {name, gamePiece}; 
}

const gameBoard = (function () {
	let gameArray = [...Array(9).fill('')];
	
	let name1 = displayController.getPlayerName('player1');
	let name2 = displayController.getPlayerName('player2');
	let prevTurn = 1;
	
	const player1 = player(name1, 'X');
	const player2 = player(name2, 'O');
	
	
		
	function updateArray(cellId) {
		gameArray[parseInt(cellId)] = prevTurn;
		console.log(gameArray);
		check(prevTurn);
	}
	
	function check(prevTurn) {
	const cols = [[0,3,6], [1,4,7], [2,5,8]];
	const rows = [[0,1,2], [3,4,5], [6,7,8]];
	const diag = [[0, 4, 8], [2, 4, 6]];
	let count = 0;

	//Columns
	for (let col of cols) {
		count = 0;
		for (let cell of col) {
			if (gameArray[cell] === parseInt(prevTurn)){
			count++;
			}
		}	
		if (count === 3) {
			console.log(prevTurn);
		}
	}

	//Rows
	for (let row of rows) {
		count = 0;
		for (let cell of row) {
			if (gameArray[cell] === parseInt(prevTurn)){
			count++;
			}
		}
		if (count === 3) {
			console.log(prevTurn);
		}
	}

	//Diags
	for (let dia of diag) {
		count = 0;
		for (let cell of dia) {
			if (gameArray[cell] === parseInt(prevTurn)){
			count++;
			}
		}
		if (count === 3) {
			console.log(prevTurn);
			}
		}
	}

	function currentPlayer() {
		if (prevTurn === 1) {
			prevTurn = 0;
			return player1;
		} else {
			prevTurn = 1;
			return player2;
		}
	}

	function placeGamePiece(e) {

		if (e.target.innerText === '') {
			e.target.innerText = currentPlayer().gamePiece;
		}
		updateArray(e.target.id);
	}
	

	
	function gameFlow() {
		displayController.gameCells
			.forEach(cell => cell
			.addEventListener('click', placeGamePiece));
		}; 

	return {
		playGame: function() {
			gameFlow();
		}
	}
	
}());

gameBoard.playGame();


