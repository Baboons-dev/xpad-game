"use client";
import { useEffect, useState } from "react";
import { Fighter, User } from "@/lib/types";
import BattleArena from "@/components/ui/Battle/BattleArena";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Header from "@/components/ui/Header";
import Battle from "@/components/ui/Battle/TestBattle";

export default function Home() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [fighters, setFighters] = useState<[User, User]>();
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isFighting, setIsFighting] = useState(false);
  const [winner, setWinner] = useState<User | null>(null);
  const playerFighterId = searchParams.get("fighter");
  const loggedInUser = localStorage.getItem("userObject");
  const parsedLoggedInUser = loggedInUser && JSON.parse(loggedInUser);
  const [fightInProgress, setFightInProgress] = useState(false);
  const [currentFightResult, setCurrentFightResult] = useState<string | null>(
    null
  );
  const [round, setRound] = useState(0);
  const [user1Score, setUser1Score] = useState(0);
  const [user2Score, setUser2Score] = useState(0);
  const [battleFinished, setBattleFinished] = useState(false);
  const [finalWinner, setFinalWinner] = useState<string | null>(null);

  console.log("parsedLoggedInUser", parsedLoggedInUser);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api.xpad-extension.baboons.tech/api/user/list/"
        );

        const fighters = response?.data?.results;
        // Filter to find the fighter with the matching `id`
        if (playerFighterId) {
          const matchingFighter = fighters?.find(
            (f: { id: number }) => f.id === parseInt(playerFighterId)
          );

          const loggedInFighter = fighters?.find(
            (f: { id: number }) => f.id === parsedLoggedInUser?.id
          );

          playerFighterId &&
            setFighters([matchingFighter, loggedInFighter] as any); // Assuming response data is the array of users
          setLoading(false);
        }
      } catch (err: any) {
        setLoading(false);
        console.log("err", err);
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Start the battle and set up the interval
  const simulateBattle1 = (user1: User, user2: User) => {
    setFightInProgress(true);
    setRound(0);
    setUser1Score(0);
    setUser2Score(0);
    setBattleFinished(false);
    setFinalWinner(null);

    const battleInterval = setInterval(() => {
      if (round < 5) {
        startFight(user1, user2);
      } else {
        clearInterval(battleInterval);
        endBattle(user1, user2);
      }
    }, 5000); // 5 seconds interval for each round
  };

  // Function to simulate each fight round
  const startFight = (user1: User, user2: User) => {
    setFightInProgress(true);
    setCurrentFightResult(null);

    // Simulate random numbers for each user
    const user1Random = Math.floor(Math.random() * 5) + 1;
    const user2Random = Math.floor(Math.random() * 5) + 1;

    // Determine the winner of the round
    if (user1Random > user2Random) {
      setUser1Score((prevScore) => prevScore + 1);
      setCurrentFightResult(`${user1.username} wins this round!`);
    } else if (user2Random > user1Random) {
      setUser2Score((prevScore) => prevScore + 1);
      setCurrentFightResult(`${user2.username} wins this round!`);
    } else {
      setCurrentFightResult("It's a draw this round!");
    }

    // Increment the round count
    setRound((prevRound) => prevRound + 1);
  };

  // End the battle and determine the final winner
  const endBattle = (user1: User, user2: User) => {
    setBattleFinished(true);
    setFightInProgress(false);

    if (user1Score > user2Score) {
      setFinalWinner(user1.username);
    } else if (user2Score > user1Score) {
      setFinalWinner(user2.username);
    } else {
      setFinalWinner("It's a draw!");
    }
  };

  const simulateBattle = () => {
    if (fighters && fighters.length > 0) {
      setIsFighting(true);
      setBattleLog([]);
      setWinner(null);

      // Initialize each fighter's health, giving zero-point fighters a minimum starting health
      const newFighters = fighters.map((f) => ({
        ...f,
        health: f.points > 0 ? f.points : 10, // Minimum starting health of 10 for zero-point fighters
      }));
      let currentFighters = [...newFighters];
      setFighters(newFighters as any); // Initialize the fighters state with starting health
      let turnCounter = 0;

      const battleInterval = setInterval(() => {
        // Check for end conditions: either fighter has zero health or max turns reached
        if (
          turnCounter >= 5 // Limit turns for this example
        ) {
          clearInterval(battleInterval);
          setIsFighting(false);

          // Determine the winner based on remaining health
          const winner =
            currentFighters[0].health > currentFighters[1].health
              ? currentFighters[0]
              : currentFighters[1];
          setWinner(winner);
          return;
        }

        const attackerIndex = turnCounter % 2 === 0 ? 0 : 1;
        const defenderIndex = attackerIndex === 0 ? 1 : 0;

        const moves = ["punched", "kicked", "struck", "attacked"];
        const move = moves[Math.floor(Math.random() * moves.length)];

        // Ensure attacker points contribute to damage calculation even if they're 0
        const attackerPoints = Math.max(
          currentFighters[attackerIndex].points,
          1
        );

        // Calculate damage with a base factor and minimum damage threshold
        const baseDamageFactor = 0.1 + Math.random() * 0.4;
        const minimumDamage = 5;
        const damage = Math.max(
          Math.floor(attackerPoints * baseDamageFactor),
          minimumDamage
        );

        // Update defender's health in `currentFighters`
        currentFighters = currentFighters.map((fighter, index) => {
          if (index === defenderIndex) {
            return {
              ...fighter,
              health: Math.max(fighter.health - damage, 0), // Ensure health doesn't go below 0
            };
          }
          return fighter;
        });

        // Log the attack in the battle log
        setBattleLog((prev) => [
          ...prev,
          `${currentFighters[attackerIndex].username} ${move} ${currentFighters[defenderIndex].username} for ${damage} damage!`,
        ]);

        // Update both `fighters` and `currentFighters` state to ensure health is saved
        setFighters([...currentFighters] as any);
        turnCounter++;
      }, 2000);
    }
  };

  return (
    <>
      {loggedInUser && (
        <Header loggedInUser={parsedLoggedInUser} loading={loading} />
      )}
      {loading ? (
        <div
          style={{ border: "1px solid redx" }}
          className="flex items-center justify-center  w-full"
        >
          <LoadingSpinner />
        </div>
      ) : (
        <BattleArena
          fighters={fighters}
          battleLog={battleLog}
          isFighting={isFighting}
          winner={winner}
          onStartBattle={simulateBattle}
        />
      )}
    </>
  );
}
