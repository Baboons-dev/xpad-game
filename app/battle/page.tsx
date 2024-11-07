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

  useEffect(() => console.log(" fighters changed", fighters), [fighters]);

  const simulateBattle = () => {
    if (fighters && fighters.length > 0) {
      setIsFighting(true);
      setBattleLog([]);
      setWinner(null);

      // Initialize each fighter's health, with a minimum starting health even if points are zero
      const newFighters = fighters.map((f) => ({
        ...f,
        health: f.points > 0 ? f.points : 10, // Minimum starting health if points are zero
      }));
      let currentFighters = newFighters;
      let turnCounter = 0;

      const battleInterval = setInterval(() => {
        // Check for end conditions: either fighter has zero health or max turns reached
        if (
          currentFighters[0].health <= 0 ||
          currentFighters[1].health <= 0 ||
          turnCounter >= 5 // Max 5 turns to avoid infinite loop for demonstration
        ) {
          clearInterval(battleInterval);
          setIsFighting(false);

          // Determine the winner based on higher health
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

        // Set base points to 1 if points are 0 to ensure minimum damage
        const attackerPoints = Math.max(
          currentFighters[attackerIndex].points,
          1
        );

        // Calculate damage, ensuring a minimum base damage factor even if points are low
        const baseDamageFactor = 0.1 + Math.random() * 0.4;
        const minimumDamage = 5; // Set a minimum base damage
        const damage = Math.max(
          Math.floor(attackerPoints * baseDamageFactor),
          minimumDamage
        );

        // Accumulate the new health for the defender by subtracting the damage
        const updatedFighters = currentFighters.map((fighter, index) => {
          if (index === defenderIndex) {
            return {
              ...fighter,
              health: Math.max(fighter.health - damage, 0), // Ensure health doesn't drop below 0
            };
          }
          return fighter;
        });

        // Update the battle log with the latest move
        setBattleLog((prev) => [
          ...prev,
          `${updatedFighters[attackerIndex].username} ${move} ${updatedFighters[defenderIndex].username} for ${damage} damage!`,
        ]);

        // Update the state with the new fighters array
        setFighters(updatedFighters as any);
        currentFighters = updatedFighters;
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
