document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('#board > div');
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
                    alert(`Player ${currentPlayer} wins!`);
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

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
