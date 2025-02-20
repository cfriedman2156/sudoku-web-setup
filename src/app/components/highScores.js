export default function HighScores({ fastestTimes, formatTime, setShowHighScores, setShowMainMenu }) {
    return (
      <>
        <div>
          <h2 className="text-xl font-semibold my-6">My High Scores</h2>
          {['easy', 'medium', 'hard'].map((difficulty) => (
            <div key={difficulty} className="mb-4 text-center">
              <h3 className="text-lg font-bold capitalize">{difficulty}</h3>
              <ul>
                {fastestTimes[difficulty].length > 0 ? (
                  fastestTimes[difficulty].map((time, index) => (
                    <li key={index} className="text-sm">{formatTime(time)}</li>
                  ))
                ) : (
                  <li className="text-sm">No times recorded</li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setShowHighScores(false);
            setShowMainMenu(true);
          }}
          className="border rounded-xl py-2 px-4 mt-4 font-bold bg-gray-100 hover:bg-gray-200"
        >
          Back to Main Menu
        </button>
      </>
    );
  }