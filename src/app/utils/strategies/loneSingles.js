import { getCandidates } from './helpers/candidateTools';
import { getRegionCells } from './helpers/regionChecks';

export default function checkLoneSingles(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '-') {
        const candidates = getCandidates(board, row, col);
        
        if (candidates.length === 1) {
          // Get related cells for highlighting
          const rowCells = getRegionCells(row, 0, row, 8);
          const colCells = getRegionCells(0, col, 8, col);
          const boxRowStart = Math.floor(row/3) * 3;
          const boxColStart = Math.floor(col/3) * 3;
          const boxCells = getRegionCells(boxRowStart, boxColStart, boxRowStart+2, boxColStart+2);

          return {
            cells: [`${row}-${col}`],
            numbers: candidates,
            relatedCells: [...new Set([...rowCells, ...colCells, ...boxCells])], // Unique cells
            description: `Cell (${row+1},${col+1}) must be ${candidates[0]} - only possible candidate`
          };
        }
      }
    }
  }
  return null;
}