//Javascript code for TOP-Tic-Tac-Toe

const player = (name, gamePiece, score) => {
  return {name, gamePiece, score}; 
}

const displayController = (function () {
  
	const input1 = document.getElementById('name1');
	const input2 = document.getElementById('name2');
	const gameCells = document.querySelectorAll('.game-cell');
	const player1Form = document.getElementById('form1');
  const display1 = document.getElementById('x');
  const score1 = document.getElementById('x-score');
	const player2Form = document.getElementById('form2');
  const display2 = document.getElementById('o');
  const score2 = document.getElementById('o-score');
	const submit1 = document.getElementById('submit1');
	const submit2 = document.getElementById('submit2');
  const dim = document.getElementById('dim');
  const winner = document.getElementById('display-winner');
  const postGame = document.querySelector(".winner-play-game");

  const aiX = document.getElementById('ai-x');
  const aiO = document.getElementById('ai-o');
 
  const playAgain = document.getElementById("play-again");
  const reset = document.getElementById("reset");

  const player1 = player('Player X', 'X', 0);
  const player2 = player('Player O', 'O', 0);

	function _setPlayerName(e, playerName, playerForm, player, display, score) {
    e.preventDefault();
		if (playerName == '') {
			display.innerText = `Player ${player.gamePiece}`;
		} else {
			display.innerText = `${playerName}`;
		}
    playerForm.reset();
    playerForm.style.display = "none";
    display.style.display = 'block';
    score.style.display = 'block';
	}

  function _autoPlayerName(player) {
    if(player.gamePiece === 'X') {
      player1Form.style.display = "none";
      score1.style.display = "block";
      display1.innerText = player.name;
      display1.style.display = 'block';
    } else {
      player2Form.style.display = "none";
      score2.style.display = "block";
      display2.innerText = player.name;
      display2.style.display = 'block';
    }
  }

  function _updateScore(player) {
    if (player.gamePiece === 'X') {
      score1.innerText = `Score: ${player.score}`;
    } else {
      score2.innerText = `Score: ${player.score}`;
    }
  }

	submit1.addEventListener('click', (e) => _setPlayerName(e, input1.value, player1Form, player1, display1, score1));
	submit2.addEventListener('click', (e) => _setPlayerName(e, input2.value, player2Form, player2, display2, score2));
  
	return {
    autoName: function(player) {
      _autoPlayerName(player);
    },
    displayWinner: function(result, player) {
      dim.style.display = "block";
      postGame.style.display = "block";
      winner.innerText = result;
      _updateScore(player);
    },
    resetDisplay: function() {
      dim.style.display = "none";
      postGame.style.display = "none";
      gameCells.forEach(cell => cell.innerText = '');
    },
    resetPlayerInput: function() {
      display1.style.display = 'none';
      display2.style.display = 'none';
      score1.style.display = 'none';
      score2.style.display = 'none';
      player1Form.style.display = 'flex';
      player2Form.style.display = 'flex';
      _updateScore(player1);
      _updateScore(player2);
    },
    playAgain,
    reset,
		gameCells,
    player1,
    player2,
    aiX,
    aiO
	};

}());


const gameBoard = (function () {
	let gameArray = [...Array(9).fill('')];

  let player1 = displayController.player1;
  let player2 = displayController.player2;
	
	let prevTurn = 1;
  let aiMode = false;
  let currentAi = null;

  
  function _updateArray(cellId) {
    if (gameArray[parseInt(cellId)] === '') {
      gameArray[parseInt(cellId)] = prevTurn;
      return true;
    }
    return false;
  }
  
  function _checkAi() {
    if (aiMode) {
      return true;
    } else {
      return false;
    }
  }

  function _aiMove(piece) {
    let move = Math.floor(Math.random() * 9);
    if ((_updateArray(move))) {
      const aiDom = document.getElementById(String(move));
      aiDom.innerText = piece;
      _endGame(_check(prevTurn));
    } else {
      _aiMove(piece);      
    }
  }

  function _resetArray() {
    gameArray = [...Array(9).fill('')];
    prevTurn = 1;
    displayController.resetDisplay();
  }
  
  function _resetGame(e) {
    e.preventDefault();
    player1.score = 0;
    player2.score = 0;
    displayController.resetPlayerInput();
    _resetArray();
  }
  
  function _playGameAgain(e) {
    e.preventDefault();
    _resetArray();
    if (aiMode === true && currentAi.name === "ai-x") {
      _aiMove(_currentPlayer().gamePiece);
    }
  }
  
  function _enableAi(e) {
    e.preventDefault();
    const aiName = e.target.id;
    if (aiName == 'ai-x') {
      currentAi = player1;
      currentAi.name = aiName;
      displayController.autoName(currentAi);
      _aiMove(_currentPlayer().gamePiece);
    } else {
      currentAi = player2;
      currentAi.name = aiName;
      displayController.autoName(currentAi);
    }
    currentAi.name = aiName;
    displayController.autoName(currentAi);
    aiMode = true;
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
        player1.score += 1;
        displayController.displayWinner(`${player1.name} Wins!`, player1);
        break;
      case (1):
        player2.score += 1;
        displayController.displayWinner(`${player2.name} Wins!`, player2);
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
      _updateArray(clickedId);
      console.log(gameArray);
      _endGame(_check(prevTurn));
      displayController.autoName(player1);
      displayController.autoName(player2);
      if (_checkAi() === true) {
        let piece = _currentPlayer().gamePiece;
        _aiMove(piece);
        console.log(gameArray);
      }
    }
  }
  
	function _gameFlow() {
    displayController.gameCells
    .forEach(cell => cell
			.addEventListener('click', (e) => _placeGamePiece(e)));
		}
    
  displayController.reset.addEventListener('click', _resetGame);
  displayController.playAgain.addEventListener('click', _playGameAgain);
  displayController.aiX.addEventListener('click', _enableAi);
  displayController.aiO.addEventListener('click', _enableAi);

	return {
		playGame: function() {
			_gameFlow();
		}
	}
	
}());

gameBoard.playGame();


