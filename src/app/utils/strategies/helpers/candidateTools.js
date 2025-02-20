export const getCandidates = (board, row, col) => {
    if (board[row][col] !== '-') return [];
    
    const present = new Set();
    
    // Check row
    for (let c = 0; c < 9; c++) {
      if (board[row][c] !== '-') present.add(board[row][c]);
    }
    
    // Check column
    for (let r = 0; r < 9; r++) {
      if (board[r][col] !== '-') present.add(board[r][col]);
    }
    
    // Check box
    const boxRowStart = Math.floor(row/3) * 3;
    const boxColStart = Math.floor(col/3) * 3;
    for (let r = boxRowStart; r < boxRowStart+3; r++) {
      for (let c = boxColStart; c < boxColStart+3; c++) {
        if (board[r][c] !== '-') present.add(board[r][c]);
      }
    }
    
    // Find missing numbers
    const candidates = [];
    for (let num = 1; num <= 9; num++) {
      if (!present.has(num.toString())) {
        candidates.push(num.toString());
      }
    }
    
    return candidates;
  };