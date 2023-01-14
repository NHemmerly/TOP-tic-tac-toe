//Javascript code for TOP-Tic-Tac-Toe

const player = (name, gamePiece) => {
  return {name, gamePiece}; 
}

const displayController = (function () {
  
	const input1 = document.getElementById('name1');
	const input2 = document.getElementById('name2');
	const gameCells = document.querySelectorAll('.game-cell');
	const player1Form = document.getElementById('form1');
	const player2Form = document.getElementById('form2');
	const submit1 = document.getElementById('submit1');
	const submit2 = document.getElementById('submit2');
  const dim = document.getElementById('dim');
  const winner = document.getElementById('display-winner');
  const postGame = document.querySelector(".winner-play-game");

  const playAgain = document.getElementById("play-again");
  const reset = document.getElementById("reset");

  const player1 = player('Player X', 'X');
  const player2 = player('Player O', 'O');

	function _setPlayerName(e, playerName, playerForm, player) {
    e.preventDefault();
		const playerHeader = document.createElement('h2');
		if (playerName == '') {
			playerHeader.innerText = `Player ${player.gamePiece}`;
		} else {
			playerHeader.innerText = `${playerName}`;
		}
    player.name = playerName;
		playerForm.replaceWith(playerHeader);
	}

  function _autoPlayerName(player) {
    const playerHeader = document.createElement('h2');
		playerHeader.innerText = `Player ${player.gamePiece}`;
    if(player.gamePiece === 'X') {
      player1Form.replaceWith(playerHeader);
    } else {
      player2Form.replaceWith(playerHeader);
    }
  }

	submit1.addEventListener('click', (e) => _setPlayerName(e, input1.value, player1Form, player1));
	submit2.addEventListener('click', (e) => _setPlayerName(e, input2.value, player2Form, player2));
  
	return {
    autoName: function(player) {
      _autoPlayerName(player);
    },
    displayWinner: function(result) {
      dim.style.display = "block";
      postGame.style.display = "block";
      winner.innerText = result;
    },
    resetDisplay: function() {
      dim.style.display = "none";
      postGame.style.display = "none";
      gameCells.forEach(cell => cell.innerText = '');
    },
    playAgain,
    reset,
		gameCells,
    player1,
    player2
	};

}());


const gameBoard = (function () {
	let gameArray = [...Array(9).fill('')];

  let player1 = displayController.player1;
  let player2 = displayController.player2;
	
	let prevTurn = 1;

  function _resetArray() {
    gameArray = [...Array(9).fill('')];
    prevTurn = 1;
    displayController.resetDisplay();
  }

  function _resetGame(e) {
    e.preventDefault();
    _resetArray();
  }

  function _playGameAgain(e) {
    e.preventDefault();
    _resetArray();
  }
	
	function _updateArray(cellId) {
		gameArray[parseInt(cellId)] = prevTurn;
		console.log(gameArray);
		return prevTurn;
	}
	
	function _check(prevTurn) {
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
				return prevTurn;
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
        return prevTurn;
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
        return prevTurn;
				}
		}

    if (!(gameArray.includes(''))) {
      return 2;
    }
	}

	function _currentPlayer() {
		if (prevTurn === 1) {
			prevTurn = 0;
			return player1;
		} else {
			prevTurn = 1;
			return player2;
		}
	}

  function _endGame(winner) {
    switch (winner) {
      case (0):
        displayController.displayWinner(`${player1.name} Wins!`);
        break;
      case (1):
        displayController.displayWinner(`${player2.name} Wins!`);
        break;
      case (2):
        displayController.displayWinner(`Draw`);
        break;
      }
  }

  function _placeGamePiece(e) {
    const clickedId = e.target.id;
    const clickedBox = document.getElementById(clickedId);

    if (!(clickedBox.innerText === 'X' || clickedBox.innerText === 'O')) {
      e.target.innerText = _currentPlayer().gamePiece;
    }
    displayController.autoName(player1);
    displayController.autoName(player2);
    _updateArray(clickedId)
    _endGame(_check(prevTurn));
  }
  
	function _gameFlow() {
    displayController.gameCells
    .forEach(cell => cell
			.addEventListener('click', (e) => _placeGamePiece(e)));
		}
    
  displayController.playAgain.addEventListener('click', _resetGame);
  displayController.reset.addEventListener('click', _playGameAgain);

	return {
		playGame: function() {
			_gameFlow();
		}
	}
	
}());

gameBoard.playGame();


