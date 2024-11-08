import React, { useState } from "react";

interface User {
  name: string;
  id: number;
}

interface BattleProps {
  user1: User;
  user2: User;
}

const Battle: React.FC<BattleProps> = ({ user1, user2 }) => {
  const [fightInProgress, setFightInProgress] = useState(false);
  const [currentFightResult, setCurrentFightResult] = useState<string | null>(
    null
  );
  const [round, setRound] = useState(0);
  const [user1Score, setUser1Score] = useState(0);
  const [user2Score, setUser2Score] = useState(0);
  const [battleFinished, setBattleFinished] = useState(false);
  const [finalWinner, setFinalWinner] = useState<string | null>(null);

  // Start the battle and set up the interval
  const startBattle = () => {
    setFightInProgress(true);
    setRound(0);
    setUser1Score(0);
    setUser2Score(0);
    setBattleFinished(false);
    setFinalWinner(null);

    const battleInterval = setInterval(() => {
      if (round < 5) {
        startFight();
      } else {
        clearInterval(battleInterval);
        endBattle();
      }
    }, 5000); // 5 seconds interval for each round
  };

  // Function to simulate each fight round
  const startFight = () => {
    setFightInProgress(true);
    setCurrentFightResult(null);

    // Simulate random numbers for each user
    const user1Random = Math.floor(Math.random() * 5) + 1;
    const user2Random = Math.floor(Math.random() * 5) + 1;

    // Determine the winner of the round
    if (user1Random > user2Random) {
      setUser1Score((prevScore) => prevScore + 1);
      setCurrentFightResult(`${user1.name} wins this round!`);
    } else if (user2Random > user1Random) {
      setUser2Score((prevScore) => prevScore + 1);
      setCurrentFightResult(`${user2.name} wins this round!`);
    } else {
      setCurrentFightResult("It's a draw this round!");
    }

    // Increment the round count
    setRound((prevRound) => prevRound + 1);
  };

  // End the battle and determine the final winner
  const endBattle = () => {
    setBattleFinished(true);
    setFightInProgress(false);

    if (user1Score > user2Score) {
      setFinalWinner(user1.name);
    } else if (user2Score > user1Score) {
      setFinalWinner(user2.name);
    } else {
      setFinalWinner("It's a draw!");
    }
  };

  return (
    <div>
      <h2>
        Battle Between {user1.name} and {user2.name}
      </h2>

      {battleFinished ? (
        <div>
          <h3>Battle Finished!</h3>
          <h4>Final Winner: {finalWinner}</h4>
        </div>
      ) : (
        <div>
          {fightInProgress ? (
            <div>
              <h3>Fight {round + 1} in Progress...</h3>
              <p>Current Result: {currentFightResult}</p>
            </div>
          ) : (
            <div>
              <h3>Next Fight Starting Soon!</h3>
            </div>
          )}
          <div>
            <h4>
              {user1.name}: {user1Score} points
            </h4>
            <h4>
              {user2.name}: {user2Score} points
            </h4>
          </div>
          <button onClick={startBattle} disabled={fightInProgress}>
            Start Battle
          </button>
        </div>
      )}
    </div>
  );
};

export default Battle;
