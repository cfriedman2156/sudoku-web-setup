export const checkRegion = (board, startRow, startCol, endRow, endCol) => {
    let emptyCells = [];
    const presentNumbers = new Set();

    // Scan entire region
    for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
            const cell = board[r][c];
            if (cell === '-') {
                emptyCells.push({ row: r, col: c });
            } else {
                presentNumbers.add(cell);
            }
        }
    }

    // Only proceed if exactly one empty cell in region
    if (emptyCells.length !== 1) return null;

    // Identify missing number
    const missingNumber = getMissingNumber(presentNumbers);
    if (!missingNumber) return null;

    // Get position of empty cell
    const { row, col } = emptyCells[0];

    return {
        cells: [`${row}-${col}`],
        numbers: [missingNumber],
        relatedCells: getRegionCells(startRow, startCol, endRow, endCol),
        description: `This ${getRegionType(startRow, startCol, endRow, endCol)} needs ${missingNumber}`
    };
};

export const getMissingNumber = (presentNumbers) => {
    for (let num = 1; num <= 9; num++) {
        if (!presentNumbers.has(String(num))) return String(num);
    }
    return null;
};

// Helper to get all cells in a region
export const getRegionCells = (startRow, startCol, endRow, endCol) => {
    const cells = [];
    for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
            cells.push(`${r}-${c}`);
        }
    }
    return cells;
};

// Helper to determine region type
export const getRegionType = (startRow, startCol, endRow, endCol) => {
    if (startRow === endRow) return 'row';
    if (startCol === endCol) return 'column';
    return '3x3 box';
};