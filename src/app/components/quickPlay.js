export default function QuickPlay({
  // Remove difficultyLevels from props
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
  setShowQuickPlay,
  setShowMainMenu,
  startNewGame,
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Choose Difficulty</h2>
        <button
          onClick={() =>
            startNewGame(
              'easy',
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
            )
          }
          className="border rounded-xl py-2 px-4 font-bold bg-gray-100 hover:bg-gray-200"
        >
          Easy
        </button>
        <button
          onClick={() =>
            startNewGame(
              'medium',
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
            )
          }
          className="border rounded-xl py-2 px-4 font-bold bg-gray-100 hover:bg-gray-200"
        >
          Medium
        </button>
        <button
          onClick={() =>
            startNewGame(
              'hard',
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
            )
          }
          className="border rounded-xl py-2 px-4 font-bold bg-gray-100 hover:bg-gray-200"
        >
          Hard
        </button>
      </div>
      <button
        onClick={() => {
          setShowQuickPlay(false);
          setShowMainMenu(true);
        }}
        className="border rounded-xl py-2 px-4 mt-4 font-bold bg-gray-100 hover:bg-gray-200"
      >
        Back to Main Menu
      </button>
    </>
  );
}