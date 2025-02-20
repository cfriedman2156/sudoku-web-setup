import { generateEasy } from '../levels/easy';
import { generateMedium } from '../levels/medium';
import { generateHard } from '../levels/hard';


// Format Time
export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Select Number
export function selectNumber(
    num,
    highlightedTile,
    board,
    setBoard,
    setHighlightedTile,
    checkSolved,
    removePencilMarks,
    pencilMode,
    setPencilMarks, 
    solution,
    errors,
    setErrors,
    numSelected,
    setNumSelected,
    highlightedNumber,
    setHighlightedNumber
) {
    if (highlightedTile) {
        const [r, c] = highlightedTile.split('-').map(Number);
        if (board[r][c] === '-') {
            if (pencilMode) {
                setPencilMarks((prev) => {
                    const key = `${r}-${c}`;
                    const currentMarks = new Set(prev[key] || []);
                    if (currentMarks.has(num)) {
                        currentMarks.delete(num);
                    } else {
                        currentMarks.add(num);
                    }
                    return { ...prev, [key]: Array.from(currentMarks) };
                });
            } else {
                const isCorrect = solution[r][c] === num;
                if (isCorrect) {
                    const newBoard = [...board];
                    newBoard[r] = newBoard[r].substring(0, c) + num + newBoard[r].substring(c + 1);
                    setBoard(newBoard);
                    setHighlightedTile(null);
                    checkSolved(newBoard);

                    // Remove pencil marks for the placed number in the same row, column, and square
                    removePencilMarks(r, c, num, setPencilMarks); // Pass setPencilMarks here
                } else {
                    setErrors(errors + 1);
                }
            }
        }
    } else if (numSelected === num) {
        setNumSelected(null);
        setHighlightedNumber(null);
    } else {
        setNumSelected(num);
        setHighlightedNumber(num);
    }
}

// Select Tile
export function selectTile(
    r,
    c,
    numSelected,
    board,
    setBoard,
    checkSolved,
    removePencilMarks,
    pencilMode,
    setPencilMarks, // Ensure this is passed
    solution,
    errors,
    setErrors,
    toggleHighlightTile,
    highlightedNumber,
    setHighlightedNumber
) {
    if (numSelected && board[r][c] === '-') {
        if (pencilMode) {
            setPencilMarks((prev) => {
                const key = `${r}-${c}`;
                const currentMarks = new Set(prev[key] || []);
                if (currentMarks.has(numSelected)) {
                    currentMarks.delete(numSelected);
                } else {
                    currentMarks.add(numSelected);
                }
                return { ...prev, [key]: Array.from(currentMarks) };
            });
        } else {
            const isCorrect = solution[r][c] === numSelected;
            if (isCorrect) {
                const newBoard = [...board];
                newBoard[r] = newBoard[r].substring(0, c) + numSelected + newBoard[r].substring(c + 1);
                setBoard(newBoard);
                checkSolved(newBoard);

                // Remove pencil marks for the placed number in the same row, column, and square
                removePencilMarks(r, c, numSelected, setPencilMarks); // Pass setPencilMarks here
            } else {
                setErrors(errors + 1);
            }
        }
    } else if (board[r][c] === '-') {
        toggleHighlightTile(r, c);
    } else if (board[r][c] === highlightedNumber && !numSelected) {
        setHighlightedNumber(null);
    } else if (numSelected && board[r][c] !== numSelected) {
        return;
    } else {
        setHighlightedNumber(board[r][c]);
    }
}

// Toggle Highlight Tile
export function toggleHighlightTile(r, c, highlightedTile, setHighlightedTile) {
    const tileId = `${r}-${c}`;
    const tile = document.getElementById(tileId);

    if (tile.classList.contains('bg-blue-300')) {
        tile.classList.remove('bg-blue-300');
        setHighlightedTile(null);
    } else {
        document.querySelectorAll('.tile').forEach((tile) => tile.classList.remove('bg-blue-300'));
        tile.classList.add('bg-blue-300');
        setHighlightedTile(tileId);
    }
}

// Toggle Pencil Mode
export function togglePencilMode(setPencilMode) {
    setPencilMode((prev) => !prev);
}

// Auto Pencil Remover
export function removePencilMarks(row, col, number, setPencilMarks) {
    setPencilMarks((prev) => {
        const newPencilMarks = { ...prev };

        // Remove the number from pencil marks in the same row
        for (let c = 0; c < 9; c++) {
            const key = `${row}-${c}`;
            if (newPencilMarks[key]) {
                newPencilMarks[key] = newPencilMarks[key].filter((n) => n !== number);
            }
        }

        // Remove the number from pencil marks in the same column
        for (let r = 0; r < 9; r++) {
            const key = `${r}-${col}`;
            if (newPencilMarks[key]) {
                newPencilMarks[key] = newPencilMarks[key].filter((n) => n !== number);
            }
        }

        // Remove the number from pencil marks in the same 3x3 square
        const boxRowStart = Math.floor(row / 3) * 3;
        const boxColStart = Math.floor(col / 3) * 3;
        for (let r = boxRowStart; r < boxRowStart + 3; r++) {
            for (let c = boxColStart; c < boxColStart + 3; c++) {
                const key = `${r}-${c}`;
                if (newPencilMarks[key]) {
                    newPencilMarks[key] = newPencilMarks[key].filter((n) => n !== number);
                }
            }
        }

        return newPencilMarks;
    });
}

// Auto Pencil Mark Generator
export function calculateAutoPencilMarks(board, pencilMarks, setPencilMarks) {
    const newPencilMarks = { ...pencilMarks };

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === '-') {
                const key = `${r}-${c}`;
                const marks = new Set();

                // Check numbers 1-9
                for (let num = 1; num <= 9; num++) {
                    const numStr = String(num);

                    // Check if the number is not in the same row, column, or 3x3 box
                    let isValid = true;

                    // Check row
                    for (let col = 0; col < 9; col++) {
                        if (board[r][col] === numStr) {
                            isValid = false;
                            break;
                        }
                    }

                    // Check column
                    for (let row = 0; row < 9; row++) {
                        if (board[row][c] === numStr) {
                            isValid = false;
                            break;
                        }
                    }

                    // Check 3x3 box
                    const boxRowStart = Math.floor(r / 3) * 3;
                    const boxColStart = Math.floor(c / 3) * 3;
                    for (let row = boxRowStart; row < boxRowStart + 3; row++) {
                        for (let col = boxColStart; col < boxColStart + 3; col++) {
                            if (board[row][col] === numStr) {
                                isValid = false;
                                break;
                            }
                        }
                        if (!isValid) break;
                    }

                    // If the number is valid, add it as a pencil mark
                    if (isValid) {
                        marks.add(numStr);
                    }
                }

                // Update the pencil marks for the cell
                newPencilMarks[key] = Array.from(marks);
            }
        }
    }

    // Update the state with the new pencil marks
    setPencilMarks(newPencilMarks);
}

// Update Fastest Times
export function updateFastestTimes(newTime, currentDifficulty, setFastestTimes) {
    setFastestTimes((prev) => {
        if (!currentDifficulty) return prev; // Guard clause if no difficulty is set

        // Update the fastest times for the current difficulty
        const updatedTimes = [...prev[currentDifficulty], newTime]
            .sort((a, b) => a - b) // Sort in ascending order
            .slice(0, 3); // Keep only the top 3 times

        const newFastestTimes = { ...prev, [currentDifficulty]: updatedTimes };

        // Save to local storage
        localStorage.setItem('fastestTimes', JSON.stringify(newFastestTimes));

        return newFastestTimes;
    });
}

// Check if the board is solved
export function checkSolved(currentBoard, solution, setIsSolved, setIsRunning, setNumSelected, setHighlightedNumber, setHighlightedTile, timer, updateFastestTimes, currentDifficulty, setFastestTimes) {
    const isComplete = currentBoard.every((row, r) =>
        row.split('').every((tile, c) => tile === solution[r][c])
    );
    if (isComplete) {
        setIsSolved(true);
        setIsRunning(false);
        setNumSelected(null);
        setHighlightedNumber(null);
        setHighlightedTile(null);
        updateFastestTimes(timer, currentDifficulty, setFastestTimes);
    }
}

// Start a new game with the selected difficulty
export function startNewGame(
    difficulty,
    setBoard,
    setSolution,
    setErrors,
    setNumSelected,
    setHighlightedTile,
    setIsSolved,
    setTimer,
    setIsRunning,
    setPencilMode,
    setPencilMarks,
    setCurrentDifficulty,
    setShowQuickPlay
) {
    // Generate fresh puzzle for beginner level
    if (difficulty === 'easy') {
        const { initialBoard, solution } = generateEasy();
        setBoard(initialBoard);
        setSolution(solution);
    } else if (difficulty === 'medium') {
        const { initialBoard, solution } = generateMedium();
        setBoard(initialBoard);
        setSolution(solution);
    } else if (difficulty === 'hard') {
        const { initialBoard, solution } = generateHard();
        setBoard(initialBoard);
        setSolution(solution);
    }

    // Reset game state
    setErrors(0);
    setNumSelected(null);
    setHighlightedTile(null);
    setIsSolved(false);
    setTimer(0);
    setIsRunning(true);
    setPencilMode(false);
    setPencilMarks({});
    setCurrentDifficulty(difficulty);
    setShowQuickPlay(false);

    // Remove any tile highlighting
    document.querySelectorAll('.tile').forEach((tile) => tile.classList.remove('bg-blue-300'));
}

// Show difficulty menu
export function showMenu(
    setShowDifficultyMenu,
    setIsRunning,
    setShowMainMenu,
    setShowQuickPlay,
    setShowHighScores
) {
    setShowMainMenu(true); // Show the main menu
    setShowQuickPlay(false); // Hide Quick Play menu
    setShowHighScores(false); // Hide High Scores menu
    setIsRunning(false);
}