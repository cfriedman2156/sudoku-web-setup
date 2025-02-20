import { getCandidates } from './helpers/candidateTools';
import { getRegionCells } from './helpers/regionChecks';

export default function checkHiddenSingles(board) {
  // Check rows
  for (let row = 0; row < 9; row++) {
    for (let num = 1; num <= 9; num++) {
      const numStr = num.toString();
      if (board[row].includes(numStr)) continue;

      const possibleCols = [];
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '-' && getCandidates(board, row, col).includes(numStr)) {
          possibleCols.push(col);
        }
      }

      if (possibleCols.length === 1) {
        return createHint(row, possibleCols[0], numStr, 'row', row+1);
      }
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    for (let num = 1; num <= 9; num++) {
      const numStr = num.toString();
      let inColumn = false;
      for (let row = 0; row < 9; row++) {
        if (board[row][col] === numStr) {
          inColumn = true;
          break;
        }
      }
      if (inColumn) continue;

      const possibleRows = [];
      for (let row = 0; row < 9; row++) {
        if (board[row][col] === '-' && getCandidates(board, row, col).includes(numStr)) {
          possibleRows.push(row);
        }
      }

      if (possibleRows.length === 1) {
        return createHint(possibleRows[0], col, numStr, 'column', col+1);
      }
    }
  }

  // Check boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const startRow = boxRow * 3;
      const startCol = boxCol * 3;
      
      for (let num = 1; num <= 9; num++) {
        const numStr = num.toString();
        let inBox = false;
        // Check if number already exists in box
        for (let r = startRow; r < startRow + 3; r++) {
          for (let c = startCol; c < startCol + 3; c++) {
            if (board[r][c] === numStr) {
              inBox = true;
              break;
            }
          }
          if (inBox) break;
        }
        if (inBox) continue;

        const possibleCells = [];
        for (let r = startRow; r < startRow + 3; r++) {
          for (let c = startCol; c < startCol + 3; c++) {
            if (board[r][c] === '-' && getCandidates(board, r, c).includes(numStr)) {
              possibleCells.push({ row: r, col: c });
            }
          }
        }

        if (possibleCells.length === 1) {
          const { row, col } = possibleCells[0];
          return createHint(row, col, numStr, 'box', boxRow * 3 + boxCol + 1);
        }
      }
    }
  }

  return null;
}

function createHint(row, col, number, regionType, regionNumber) {
  const regionNames = {
    row: `row ${regionNumber}`,
    column: `column ${regionNumber}`,
    box: `box ${regionNumber}`
  };

  return {
    cells: [`${row}-${col}`],
    numbers: [number],
    relatedCells: getRegionCells(
      regionType === 'row' ? row : 0,
      regionType === 'column' ? col : 0,
      regionType === 'row' ? row : 8,
      regionType === 'column' ? col : 8
    ),
    description: `Number ${number} can only go in this cell in ${regionNames[regionType]}`
  };
}