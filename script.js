const gridSizeInput = document.getElementById("gridSize");
const winStreakInput = document.getElementById("winStreak");
const startGameBtn = document.getElementById("startGame");
const gameBoard = document.getElementById("gameBoard");
const playerTurnElement = document.getElementById("playerTurn");
const gameResultElement = document.getElementById("gameResult");
const resetGameBtn = document.getElementById("resetGame");

let gridSize;
let winStreak;
let currentPlayer;
let board;
let gameOver;

function initGame() {
  gridSize = parseInt(gridSizeInput.value);
  winStreak = parseInt(winStreakInput.value);
  currentPlayer = "X";
  board = Array(gridSize)
    .fill()
    .map(() => Array(gridSize).fill(""));
  gameOver = false;

  renderBoard();
  playerTurnElement.textContent = `Player ${currentPlayer}'s Turn`;
  gameResultElement.textContent = "";
}

function renderBoard() {
  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.textContent = board[row][col];
      cell.addEventListener("click", handleCellClick);
      gameBoard.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (board[row][col] === "" && !gameOver) {
    board[row][col] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin(row, col)) {
      gameOver = true;
      gameResultElement.textContent = `Player ${currentPlayer} wins!`;
    } else if (checkDraw()) {
      gameOver = true;
      gameResultElement.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playerTurnElement.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}
function checkWin(row, col) {
  const player = board[row][col];

  // Check rows
  let count = 0;
  for (let c = 0; c < gridSize; c++) {
    if (board[row][c] === player) {
      count++;
      if (count >= winStreak) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check columns
  count = 0;
  for (let r = 0; r < gridSize; r++) {
    if (board[r][col] === player) {
      count++;
      if (count >= winStreak) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check diagonal (top-left to bottom-right)
  count = 0;
  let r = row;
  let c = col;
  while (r >= 0 && c >= 0) {
    if (board[r][c] === player) {
      count++;
      if (count >= winStreak) {
        return true;
      }
    } else {
      count = 0;
    }
    r--;
    c--;
  }

  r = row + 1;
  c = col + 1;
  while (r < gridSize && c < gridSize) {
    if (board[r][c] === player) {
      count++;
      if (count >= winStreak) {
        return true;
      }
    } else {
      count = 0;
    }
    r++;
    c++;
  }

  // Check diagonal (top-right to bottom-left)
  count = 0;
  r = row;
  c = col;
  while (r >= 0 && c < gridSize) {
    if (board[r][c] === player) {
      count++;
      if (count >= winStreak) {
        return true;
      }
    } else {
      count = 0;
    }
    r--;
    c++;
  }

  r = row + 1;
  c = col - 1;
  while (r < gridSize && c >= 0) {
    if (board[r][c] === player) {
      count++;
      if (count >= winStreak) {
        return true;
      }
    } else {
      count = 0;
    }
    r++;
    c--;
  }

  return false;
}

function checkDraw() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (board[row][col] === "") {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  initGame();
}

startGameBtn.addEventListener("click", initGame);
resetGameBtn.addEventListener("click", resetGame);
