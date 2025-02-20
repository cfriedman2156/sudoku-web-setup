// page.js
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { generateEasy } from './levels/easy';
import { generateMedium } from './levels/medium';
import { generateHard } from './levels/hard';
import HintButton from './components/hintButton';

import {
  formatTime,
  selectNumber,
  selectTile,
  toggleHighlightTile,
  togglePencilMode,
  removePencilMarks,
  calculateAutoPencilMarks,
  updateFastestTimes,
  checkSolved,
  startNewGame,
  showMenu,
} from './utils/gameMechanics.js';
import MainMenu from './components/mainMenu';
import QuickPlay from './components/quickPlay';
import HighScores from './components/highScores';

const difficultyLevels = {
  easy: () => generateEasy(),
  medium: () => generateMedium(),
  hard: () => generateHard(),
};

// Mapping of numbers to their fixed positions in the 3x3 grid
const pencilMarkPositions = {
  1: { row: 0, col: 0 }, // Top-left
  2: { row: 0, col: 1 }, // Top-center
  3: { row: 0, col: 2 }, // Top-right
  4: { row: 1, col: 0 }, // Middle-left
  5: { row: 1, col: 1 }, // Center
  6: { row: 1, col: 2 }, // Middle-right
  7: { row: 2, col: 0 }, // Bottom-left
  8: { row: 2, col: 1 }, // Bottom-center
  9: { row: 2, col: 2 }, // Bottom-right
};

export default function Home() {
  const [numSelected, setNumSelected] = useState(null);
  const [errors, setErrors] = useState(0);
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [highlightedTile, setHighlightedTile] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pencilMode, setPencilMode] = useState(false);
  const [pencilMarks, setPencilMarks] = useState({});
  const [currentHint, setCurrentHint] = useState(null);
  const [extraHint, setExtraHint] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [hintHighlight, setHintHighlight] = useState([]);
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(true);
  const [currentDifficulty, setCurrentDifficulty] = useState(null);
  const [highlightedNumber, setHighlightedNumber] = useState(null);
  const [fastestTimes, setFastestTimes] = useState(() => {
    const savedTimes = JSON.parse(localStorage.getItem('fastestTimes'));
    return savedTimes || {
      beginner: [], // Changed from easy/medium/hard
      // Add other levels as you create them
    };
  });
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [showQuickPlay, setShowQuickPlay] = useState(false);
  const [showHighScores, setShowHighScores] = useState(false);

  // Timer Code
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const clearHints = () => {
    setHighlightedCells([]);
    setHintHighlight([]);
    setCurrentHint(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 pb-20 font-sans">
      <Image
        src="/images/sudokuHeroLogo.png" // Local image
        alt="sudoku hero logo"
        width={300} // Set width
        height={300} // Set height
      />

      {/* Main Menu */}
      {showMainMenu && (
        <MainMenu
          setShowMainMenu={setShowMainMenu}
          setShowQuickPlay={setShowQuickPlay}
          setShowHighScores={setShowHighScores}
        />
      )}

      {/* Quick Play Menu */}
      {showQuickPlay && (
        <QuickPlay
          difficultyLevels={difficultyLevels}
          setBoard={setBoard}
          setSolution={setSolution}
          setErrors={setErrors}
          setNumSelected={setNumSelected}
          setHighlightedTile={setHighlightedTile}
          setIsSolved={setIsSolved}
          setTimer={setTimer}
          setIsRunning={setIsRunning}
          setPencilMode={setPencilMode}
          setPencilMarks={setPencilMarks}
          setShowDifficultyMenu={setShowDifficultyMenu}
          setCurrentDifficulty={setCurrentDifficulty}
          setShowQuickPlay={setShowQuickPlay}
          setShowMainMenu={setShowMainMenu}
          startNewGame={startNewGame}
        />
      )}

      {/* High Scores Menu */}
      {showHighScores && (
        <HighScores
          fastestTimes={fastestTimes}
          formatTime={formatTime}
          setShowHighScores={setShowHighScores}
          setShowMainMenu={setShowMainMenu}
        />
      )}

      {/* Game Board */}
      {!showMainMenu && !showQuickPlay && !showHighScores && (
        <>
          <div className="min-h-screen flex flex-row p-8 pb-20 font-sans">
            {/* Error Display */}
            <div className="mt-2 font-semibold text-center">
              {!isSolved && (
                <h2 id="errors" className="text-2xl text-red-600">
                  {errors}
                </h2>
              )}

              {/* Timer Display */}
              {!isSolved && (
                <h2 className="text-2xl mb-4 font-semibold">Time: {formatTime(timer)}</h2>
              )}
              {isSolved && (
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-green-500">Solved!</h2>
                  <p className="font-semibold">Errors: {errors}</p>
                  <p>Time: {formatTime(timer)}</p>
                </div>
              )}

              {/* Sudoku Board */}
              <div id="board" className="grid grid-cols-9 w-[450px] h-[450px] mx-auto">
                {board.map((row, r) =>
                  row.split('').map((tile, c) => (
                    <div
                      key={`${r}-${c}`}
                      id={`${r}-${c}`}
                      className={`tile border flex items-center justify-center w-[50px] h-[50px] text-2xl font-bold
                      ${tile !== '-' ? 'bg-gray-100' : ''}
                      ${r === 2 || r === 5 ? 'border-b-2 border-b-black' : ''}
                      ${c === 2 || c === 5 ? 'border-r-2 border-r-black' : ''}
                      ${highlightedNumber === tile ? 'bg-yellow-200' : ''}
                      ${highlightedCells.includes(`${r}-${c}`) ? 'bg-yellow-200' : ''}
                      ${hintHighlight?.includes(board[r][c]) ? 'bg-blue-400' : ''}`}

                      onClick={() => selectTile(
                        r,
                        c,
                        numSelected,
                        board,
                        setBoard,
                        (currentBoard) => checkSolved(
                          currentBoard,
                          solution,
                          setIsSolved,
                          setIsRunning,
                          setNumSelected,
                          setHighlightedNumber,
                          setHighlightedTile,
                          timer,
                          updateFastestTimes,
                          currentDifficulty,
                          setFastestTimes
                        ),
                        removePencilMarks,
                        pencilMode,
                        setPencilMarks,
                        solution,
                        errors,
                        setErrors,
                        (r, c) => toggleHighlightTile(r, c, highlightedTile, setHighlightedTile),
                        highlightedNumber,
                        setHighlightedNumber
                      )}
                    >
                      {tile !== '-' ? (
                        tile
                      ) : (
                        <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-[2px]">
                          {Object.entries(pencilMarkPositions).map(([num, pos]) => {
                            const isMarked = pencilMarks[`${r}-${c}`]?.includes(num);
                            return (
                              <div
                                key={num}
                                className={`flex items-center justify-center text-xs text-gray-500
                                ${isMarked ? '' : 'invisible'}
                                ${highlightedNumber === num ? 'bg-green-200 rounded-full' : ''}`} // Highlight pencil marks
                                style={{
                                  gridColumn: pos.col + 1,
                                  gridRow: pos.row + 1,
                                }}
                              >
                                {num}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Number Selector */}
              <div id="digits" className="flex justify-center mt-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div
                    key={num}
                    className={`w-[50px] h-[50px] flex items-center justify-center border mx-1 text-2xl font-bold cursor-pointer 
                    ${numSelected === String(num) ? 'bg-yellow-200' : ''} // Highlight numbers on the board
                    ${pencilMode ? 'font-light' : 'font-bold'}`}
                    onClick={() => selectNumber(
                      String(num),
                      highlightedTile,
                      board,
                      setBoard,
                      setHighlightedTile,
                      (currentBoard) => checkSolved(
                        currentBoard,
                        solution,
                        setIsSolved,
                        setIsRunning,
                        setNumSelected,
                        setHighlightedNumber,
                        setHighlightedTile,
                        timer,
                        updateFastestTimes,
                        currentDifficulty,
                        setFastestTimes
                      ),
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
                    )}
                  >
                    {num}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div>
                <button
                  onClick={() => showMenu(
                    setShowDifficultyMenu, setIsRunning, setShowMainMenu, setShowQuickPlay, setShowHighScores
                  )}
                  className="border mx-2 rounded-xl py-2 px-4 mt-4 font-bold bg-gray-100 hover:bg-gray-200"
                >
                  New Game
                </button>
                <button
                  onClick={() => togglePencilMode(setPencilMode)}
                  className="border mx-2 rounded-xl py-2 px-4 mt-4 font-bold bg-gray-100 hover:bg-gray-200"
                >
                  {pencilMode ? 'Pen' : 'Pencil'}
                </button>
                <button
                  onClick={() => calculateAutoPencilMarks(board, pencilMarks, setPencilMarks)}
                  className="border mx-2 rounded-xl py-2 px-4 mt-4 font-bold bg-gray-100 hover:bg-gray-200"
                >
                  Auto Pencil
                </button>
                <HintButton
                  board={board}
                  solution={solution}
                  onHintFound={setCurrentHint}
                />
                <button
                  onClick={() => {
                    setShowMainMenu(true);
                  }}
                  className="border mx-2 rounded-xl py-2 px-4 mt-4 font-bold bg-gray-100 hover:bg-gray-200"
                >
                  Main Menu
                </button>
              </div>
              {/* Hint display area */}
              {currentHint && (
                <div className="bg-yellow-50 p-4 rounded-lg w-full max-w-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Look for an {currentHint.strategy}</h3>
                      {extraHint && (
                      <p className="text-sm text-gray-600">{currentHint.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!extraHint && (
                        <button
                        onClick={() => {
                          setHighlightedCells(currentHint.cells);
                          setHintHighlight(currentHint.numbers);
                          setExtraHint(true);
                          console.log(currentHint.numbers)
                        }}
                        className="text-sm px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                      >
                        Show Me
                      </button>
                      )}
                      
                      <button
                        onClick={() => {
                          setCurrentHint(null);
                          setHighlightedCells([]);
                          setHintHighlight([]);
                          setExtraHint(false);
                        }}
                        className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                  {extraHint && (
                    <p className="text-sm mt-2">
                      {currentHint.numbers.join(', ')} {currentHint.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}