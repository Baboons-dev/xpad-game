"use client";
import { useEffect, useState } from "react";
import { Fighter, User } from "@/lib/types";
import BattleArena from "@/components/ui/Battle/BattleArena";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Home() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [fighters, setFighters] = useState<[User, User]>();
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isFighting, setIsFighting] = useState(false);
  const [winner, setWinner] = useState<User | null>(null);
  const playerFighterId = searchParams.get("fighter");

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

          const otherFighters = fighters?.filter(
            (f: { id: number }) => f.id !== parseInt(playerFighterId)
          );

          // Filter out the matching fighter to avoid duplicates, then select a random fighter
          const randomFighter =
            otherFighters && otherFighters.length > 0
              ? otherFighters[Math.floor(Math.random() * otherFighters.length)]
              : null;

          // Return the array with both fighters if both exist
          playerFighterId &&
            setFighters([matchingFighter, randomFighter] as any); // Assuming response data is the array of users
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

  const simulateBattle = () => {
    if (fighters && fighters?.length > 0) {
      setIsFighting(true);
      setBattleLog([]);
      setWinner(null);
      const newFighters = fighters.map((f) => ({ ...f, health: f.points }));
      let currentFighters = newFighters;
      let turnCounter = 0;

      const battleInterval = setInterval(() => {
        if (
          // currentFighters[0].health <= 0 ||
          // currentFighters[1].health <= 0 ||
          turnCounter >= 2
        ) {
          clearInterval(battleInterval);
          setIsFighting(false);
          const winner =
            currentFighters[0].health > currentFighters[1].health
              ? currentFighters[0]
              : currentFighters[1];

          setWinner(winner);
          return;
        }

        const attacker = turnCounter % 2 === 0 ? 0 : 1;
        const defender = attacker === 0 ? 1 : 0;

        const moves = ["punched", "kicked", "struck", "attacked"];
        const move = moves[Math.floor(Math.random() * moves.length)];
        const attackerPoints = Math.max(currentFighters[attacker].points, 1);
        const defenderPoints = Math.max(currentFighters[defender].points, 1);

        console.log("attackerPoints", attackerPoints);
        console.log("defenderPoints", defenderPoints);

        // Calculate damage, ensuring a minimum base damage factor even if points are low
        const baseDamageFactor = 0.1 + Math.random() * 0.4;
        const minimumDamage = 5; // Set a base minimum damage for zero-point cases
        const damage = Math.max(
          Math.floor(attackerPoints * baseDamageFactor),
          minimumDamage
        );

        // Create a new array to ensure a state update
        const updatedFighters = [...currentFighters];
        updatedFighters[defender] = {
          ...updatedFighters[defender],
          // health: damage,
          health: Math.max(updatedFighters[defender].health - damage, 0),
          // Math.max(updatedFighters[defender].health - damage, 0),
        };

        // Update the battle log with the latest move
        setBattleLog((prev) => [
          ...prev,
          `${updatedFighters[attacker].username} ${move} ${updatedFighters[defender].username} for ${damage} damage!`,
        ]);

        // Update the state with the new array reference
        setFighters(updatedFighters as any);

        console.log("Updated fighters", updatedFighters);
        turnCounter++;
      }, 2000);
    }
  };

  return (
    <>
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
