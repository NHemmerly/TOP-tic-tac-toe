//Javascript code for TOP-Tic-Tac-Toe

const player = (name, gamePiece, score, bin) => {
  return {name, gamePiece, score, bin}; 
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
  const hardX = document.getElementById('hard-x');
  const aiO = document.getElementById('ai-o');
  const hardO = document.getElementById('hard-o');
 
  const playAgain = document.getElementById("play-again");
  const reset = document.getElementById("reset");

  const player1 = player('Player X', 'X', 0, 0);
  const player2 = player('Player O', 'O', 0, 1);

	function _setPlayerName(e, playerName, playerForm, player, display, score) {
    e.preventDefault();
		if (playerName == '') {
			display.innerText = `Player ${player.gamePiece}`;
		} else {
			display.innerText = `${playerName}`;
      player.name = playerName;
		}
    playerForm.reset();
    playerForm.style.display = "none";
    display.style.display = 'block';
    score.style.display = 'block';
	}

  //Automatically name players when the first move is made

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

  //Updates the display for player score

  function _updateScore(player) {
    if (player == null) {
      return
    }
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
    aiO,
    hardO,
    hardX
	};
  
}());


const gameBoard = (function () {
  let gameArray = [...Array(9).fill(" ")];
  
  let player1 = displayController.player1;
  let player2 = displayController.player2;
	
	let bot = player2;
  let player = player1;
  let aiMode = false;
  let aiBest = false;
  
  let scores = {
    0: 1,
    1: -1,
    2: 0
  }
  //Functions that affect the array in some way.

  function _updateArray(cellId, playerBin) {
    if (gameArray[parseInt(cellId)] === " ") {
      gameArray[parseInt(cellId)] = playerBin.bin;
    }
  }

  //Helper function for detecting win in check()

  function _equals3 (a, b, c) {
    return a === b && b === c && a !== " ";
  }

  //Checks the array for a win at any given position

  function _check() {
    const cols = [[0,3,6], [1,4,7], [2,5,8]];
    const rows = [[0,1,2], [3,4,5], [6,7,8]];
    const diag = [[0, 4, 8], [2, 4, 6]];
    let winner = null;

    //Columns
    for (let col of cols) {
      if (_equals3(gameArray[col[0]], gameArray[col[1]], gameArray[col[2]])){
        winner = gameArray[col[0]];
      }
    }	

    //Rows
    for (let row of rows) {
      if(_equals3(gameArray[row[0]], gameArray[row[1]], gameArray[row[2]])) {
        winner = gameArray[row[0]];
      }
    }

    //Diags
    for (let dia of diag) {
      if(_equals3(gameArray[dia[0]], gameArray[dia[1]], gameArray[dia[2]])) {
        winner = gameArray[dia[0]];
      }
    }

    if (!(gameArray.includes(" ")) && winner === null) {
      return 2;
    } else {
      return winner;
    }
  }

    //functions related to ai Movements
    //Decides how to move the Ai based on whether it is smart or not
  function _aiMove() {
    if (aiBest) {
      _bestAiMove();
    } else {
      let move = Math.floor(Math.random() * 9);
      if ((_updateArray(move, bot))) {
        const aiDom = document.getElementById(String(move));
        aiDom.innerText = bot.gamePiece;
        _endGame(_check());
      } else {
        _aiMove();      
      }
    }
  }
    //The minimax algorithm for allowing the AI to pick the best moves
  function _minimax(goodBoard, depth, isMaximizing) {
    let result = _check();
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -100;

      for (let i = 0; i < 9; i++) {
        if (goodBoard[i] === " ") {
          goodBoard[i] = player.bin;
          let score = _minimax(goodBoard, depth + 1, false);
          goodBoard[i] = " ";
          bestScore = Math.max(parseInt(score), parseInt(bestScore));
        }
      }
      return bestScore;
    }
    else {
      let bestScore = 100;

      for (let i = 0; i < 9; i++) {
        if (goodBoard[i] === " ") {
          goodBoard[i] = bot.bin;
          let score = _minimax(goodBoard, depth + 1, true);
          goodBoard[i] = " ";
          bestScore = Math.min(parseInt(score), parseInt(bestScore));
        }
      }
      return bestScore;
    }
  }
  //Implements minimax algorithm depending on which player is AI
  function _bestAiMove() {
    let bestMove;
    let score;

    if (bot == player1) {
      let bestScore = -100;
  
      for (let i = 0; i < 9; i++) {
        if (gameArray[i] === " ") {
          gameArray[i] = bot.bin;
          score = _minimax(gameArray, 0, false);
          gameArray[i] = " ";
          if (score > bestScore) {
            bestScore = score;
            bestMove = {i};
          }
        }
      }
    } else {
      let bestScore = 100;
      for (let i = 0; i < 9; i++) {
        if (gameArray[i] === " ") {
          gameArray[i] = bot.bin;
          score = _minimax(gameArray, 0, true);
          gameArray[i] = " ";
          if (score < bestScore) {
            bestScore = score;
            bestMove = {i};
          }
        }
      }
    }
      gameArray[bestMove.i] = bot.bin;
      const aiDom = document.getElementById(String(bestMove.i));
      aiDom.innerText = bot.gamePiece;
      _endGame(_check());
    }

  function _enableAi(e, hard) {
    e.preventDefault();
    aiBest = hard;
    aiMode = true;
    const aiName = e.target.id;
    if (aiName == 'ai-x' || aiName == 'hard-x') {
      bot = player1;
      player = player2;      
      player1.name = aiName;
      displayController.autoName(player1);
      displayController.aiO.style.display = 'none';
      _aiMove();
    } else {
      player2.name = aiName;
      displayController.autoName(player2);
      bot = player2;
      player = player1;
      displayController.aiX.style.display = 'none';
    }
  }
  
  //Functions for resetting the game and array
  function _resetArray() {
    gameArray = [...Array(9).fill(" ")];
    displayController.resetDisplay();
  }
  
  function _resetGame(e) {
    e.preventDefault();
    player1.score = 0;
    player2.score = 0;
    displayController.resetPlayerInput();
    displayController.aiO.style.display = 'block';
    displayController.aiX.style.display = 'block';
    player = player1;
    bot = player2;
    _resetArray();
  }
  
  function _playGameAgain(e) {
    e.preventDefault();
    _resetArray();
    if (aiMode === true && bot === player1) {
      _bestAiMove();
    } else {
      player = player1;
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
        displayController.displayWinner(`Draw`, null);
        break;
      }
  }

  //Function for placing a game piece and determining when the AI needs to move

  function _placeGamePiece(e) {
    const clickedId = e.target.id;
    const clickedBox = document.getElementById(clickedId);
    if (!(clickedBox.innerText === 'X' || clickedBox.innerText === 'O')) {
      e.target.innerText = player.gamePiece;
      _updateArray(clickedId, player);
      _endGame(_check());
      displayController.autoName(player1);
      displayController.autoName(player2);
      if (aiMode === true) {
          _aiMove();
        } else {
          (player === player1) ? player = player2 : player = player1;
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
  displayController.aiX.addEventListener('click',(e) =>  _enableAi(e, false));
  displayController.hardX.addEventListener('click', (e) => _enableAi(e, true));
  displayController.aiO.addEventListener('click', (e) => _enableAi(e, false));
  displayController.hardO.addEventListener('click', (e) => _enableAi(e, true));

	return {
		playGame: function() {
			_gameFlow();
		}
	}
	
}());

gameBoard.playGame();


