import { 
    checkRegion,
    getMissingNumber,
    getRegionCells,
    getRegionType 
  } from './helpers/regionChecks';

export default function checkOpenSingles(board) {
    // Check all rows
    for (let row = 0; row < 9; row++) {
        const result = checkRegion(board, row, 0, row, 8);
        if (result) {
            return result
        };
    }

    // Check all columns
    for (let col = 0; col < 9; col++) {
        const result = checkRegion(board, 0, col, 8, col);
        if (result) return result;
    }

    // Check all 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const result = checkRegion(
                board,
                boxRow * 3,
                boxCol * 3,
                boxRow * 3 + 2,
                boxCol * 3 + 2
            );
            if (result) return result;
        }
    }

    return null;
}