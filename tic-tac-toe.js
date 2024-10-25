document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('#board > div');
    const statusDiv = document.getElementById('status');
    const newGameButton = document.getElementById('new-game');
    let currentPlayer = 'X';
    const gameState = Array(9).fill(null);

    squares.forEach((square, index) => {
        square.classList.add('square');

        square.addEventListener('click', () => {
            if (!square.textContent && !checkWinner()) {
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);
                gameState[index] = currentPlayer;

                if (checkWinner()) {
                    statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                    statusDiv.classList.add('you-won');
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
                }
            }
        });

        square.addEventListener('mouseenter', () => {
            if (!square.textContent) {
                square.classList.add('hover');
            }
        });

        square.addEventListener('mouseleave', () => {
            square.classList.remove('hover');
        });
    });

    // Event listener for the New Game button
    newGameButton.addEventListener('click', resetGame);

    function resetGame() {
        // Reset game state
        gameState.fill(null);
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O', 'hover');
        });
        statusDiv.textContent = "Player X's turn"; // Reset status message
        statusDiv.classList.remove('you-won'); // Remove winner class
        currentPlayer = 'X'; // Reset current player
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }
});