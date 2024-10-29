const board = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const cells = Array.from({ length: 9 });

let playerX = prompt("Enter Player X's name:", 'Player X') || 'Player X';
let playerO = prompt("Enter Player O's name:", 'Player O') || 'Player O';

let currentPlayer = 'X';
let gameOver = false;

cells.forEach((_, index) => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = index;
  cell.addEventListener('click', handleClick);
  board.appendChild(cell);
});

function restartGame() {
  cells.fill(undefined);
  currentPlayer = 'X';
  gameOver = false;

  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.style.cursor = 'pointer';
  });

  winnerPopup.style.display = 'none';
}

function handleClick(event) {
  if (gameOver) return;

  const cell = event.target;
  const index = cell.dataset.index;

  if (cells[index] || !isValidMove(index)) return;

  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.style.cursor = 'not-allowed';

  if (checkWinner()) {
    declareWinner();
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    declareDraw();
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function isValidMove(index) {
  return !cells[index];
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function declareWinner() {
  const winner = currentPlayer === 'X' ? playerX : playerO;
  winnerMessage.textContent = `${winner} wins!`;
  winnerPopup.style.display = 'block';
}

function declareDraw() {
  winnerMessage.textContent = 'It\'s a draw!';
  winnerPopup.style.display = 'block';
}

function closePopup() {
  winnerPopup.style.display = 'none';
}

// Initial game start
restartGame();
