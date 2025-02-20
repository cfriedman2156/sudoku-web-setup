// levels/easy.js
export const baseInitial = [
  "---4-9---",
  "--------8",
  "--2-83197",
  "-9------5",
  "--57-14--",
  "6------8-",
  "24697-3--",
  "1--------",
  "---6-5---",
];

export const baseSolution = [
  "781469532",
  "539127648",
  "462583197",
  "397846215",
  "825791463",
  "614352789",
  "246978351",
  "158234976",
  "973615824",
];

// Helper functions
const createNumberMapping = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffled = [...numbers].sort(() => Math.random() - 0.5);
  return numbers.reduce((map, num, index) => {
    map[num] = shuffled[index];
    return map;
  }, {});
};

const swapNumbers = (board, mapping) => {
  return board.map(row => 
    row.split('').map(cell => {
      if (cell === '-') return '-';
      return mapping[parseInt(cell)].toString();
    }).join('')
  );
};

const rotateBoard = (board, degrees) => {
  let current = board.map(row => [...row]); // Convert strings to arrays
  const times = degrees / 90;

  for (let i = 0; i < times; i++) {
    const rotated = [];
    for (let col = 0; col < 9; col++) {
      const newRow = current.map(row => row[8 - col]).join(''); // Join to form a string
      rotated.push(newRow);
    }
    current = rotated;
  }

  return current; // Returns array of strings
};

// Add these validation functions
const isValidSudoku = (board) => {
  // Ensure board is an array of strings
  if (!Array.isArray(board) || board.length !== 9 || !board.every(row => typeof row === 'string' && row.length === 9)) {
    return false;
  }

  // Check rows
  for (let row of board) {
    const numbers = row.split('').filter(c => c !== '-');
    if (new Set(numbers).size !== numbers.length) return false;
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const numbers = [];
    for (let row = 0; row < 9; row++) {
      const cell = board[row][col];
      if (cell !== '-') numbers.push(cell);
    }
    if (new Set(numbers).size !== numbers.length) return false;
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const numbers = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const cell = board[boxRow * 3 + r][boxCol * 3 + c];
          if (cell !== '-') numbers.push(cell);
        }
      }
      if (new Set(numbers).size !== numbers.length) return false;
    }
  }

  return true;
};

// Update generateVariant to include validation
export const generateMedium = () => {
  let valid = false;
  let variant;

  while (!valid) {
    const numberMapping = createNumberMapping();
    const swappedInitial = swapNumbers(baseInitial, numberMapping);
    const swappedSolution = swapNumbers(baseSolution, numberMapping);
    const rotation = [0, 90, 180, 270][Math.floor(Math.random() * 4)];

    variant = {
      initialBoard: rotateBoard(swappedInitial, rotation),
      solution: rotateBoard(swappedSolution, rotation)
    };

    // Ensure the board is an array of strings
    if (
      Array.isArray(variant.initialBoard) &&
      variant.initialBoard.every(row => typeof row === 'string') &&
      Array.isArray(variant.solution) &&
      variant.solution.every(row => typeof row === 'string')
    ) {
      valid = isValidSudoku(variant.initialBoard);
    }
  }

  return variant;
};