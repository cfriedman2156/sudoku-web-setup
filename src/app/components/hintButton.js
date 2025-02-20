// components/HintButton.js
import { STRATEGY_HIERARCHY } from '../utils/strategies';

export default function HintButton({ board, solution, onHintFound }) {
  const findNextHint = () => {
    for (const strategy of STRATEGY_HIERARCHY) {
      const result = strategy.detect(board, solution);
      if (result) {
        onHintFound({
          strategy: strategy.name,
          description: strategy.description,
          explanation: strategy.explanation,
          cells: result.cells,
          numbers: result.numbers || []
        });
        return;
      }
    }
    alert('No strategies found! Try looking for basic candidates.');
    onHintFound(null);
  };

  return (
    <button
      onClick={findNextHint}
      className="border rounded-xl py-2 px-4 font-bold bg-blue-100 hover:bg-blue-200"
    >
      Get Hint
    </button>
  );
}