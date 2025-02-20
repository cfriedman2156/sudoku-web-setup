export default function MainMenu({ setShowMainMenu, setShowQuickPlay, setShowHighScores }) {
    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold">Main Menu</h2>
            <button
                // ADD FUNCTIONALITY
                className="border rounded-xl py-2 px-4 font-bold bg-gray-100 hover:bg-gray-200"
            >
                Daily Challenge
            </button>
            <button
                onClick={() => {
                    setShowMainMenu(false);
                    setShowQuickPlay(true);
                }}
                className="border rounded-xl py-2 px-4 font-bold bg-gray-100 hover:bg-gray-200"
            >
                Quick Play
            </button>
            <button
                onClick={() => {
                    setShowMainMenu(false);
                    setShowHighScores(true);
                }}
                className="border rounded-xl py-2 px-4 font-bold bg-gray-100 hover:bg-gray-200"
            >
                High Scores
            </button>
            <button
                // ADD FUNCTIONALITY
                className="border rounded-xl py-2 px-4 font-bold bg-gray-100 hover:bg-gray-200"
            >
                My Hero Academia
            </button>
            <button
                // ADD FUNCTIONALITY
                className="border rounded-xl py-2 px-4 font-bold bg-gray-100 hover:bg-gray-200"
            >
                Profile
            </button>
        </div>
    );
}