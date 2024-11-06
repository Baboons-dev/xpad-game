"use client";
import { useEffect, useState } from "react";
import { Fighter, User } from "@/lib/types";
import BattleArena from "@/components/ui/Battle/BattleArena";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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

          console.log("seee", matchingFighter, otherFighters, randomFighter);

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
    console.log("simulateBattle", fighters);
    if (fighters && fighters?.length > 0) {
      setIsFighting(true);
      setBattleLog([]);
      setWinner(null);
      console.log("fromplayerFighterId", playerFighterId);
      if (playerFighterId) {
        console.log("fromplayerFighterId", playerFighterId);
        const newFighters = [
          ...fighters
            .filter(
              (f) =>
                f.id === parseInt(playerFighterId) ||
                fighters[Math.floor(Math.random() * fighters.length)].id
            )
            .slice(0, 2)
            .map((f) => ({ ...f, health: f.points })),
        ];
        console.log("newFighters", newFighters);

        let currentFighters = newFighters;
        console.log("currentFighters", currentFighters);
        let turnCounter = 0;

        const battleInterval = setInterval(() => {
          if (
            // currentFighters[0].health <= 0 ||
            // currentFighters[1].health <= 0 ||
            turnCounter >= 10
          ) {
            clearInterval(battleInterval);
            setIsFighting(false);
            const winner =
              currentFighters[0].health > currentFighters[1].health
                ? currentFighters[0]
                : currentFighters[1];

            console.log("winner from main", winner);
            setWinner(winner);
            return;
          }

          const attacker = turnCounter % 2 === 0 ? 0 : 1;
          const defender = attacker === 0 ? 1 : 0;

          const moves = ["punched", "kicked", "struck", "attacked"];
          const move = moves[Math.floor(Math.random() * moves.length)];

          // Check if points are valid numbers, defaulting to 0 if they are not
          const attackerPoints =
            typeof currentFighters[attacker].points === "number"
              ? currentFighters[attacker].points
              : 0;
          const defenderPoints =
            typeof currentFighters[defender].points === "number"
              ? currentFighters[defender].points
              : 0;

          // Example formula to calculate damage based on the attacker's points
          const baseDamageFactor = 0.1 + Math.random() * 0.4; // 10% to 50% of attacker's points
          const damage = Math.max(
            Math.floor(attackerPoints * baseDamageFactor),
            1
          );

          currentFighters[defender].health = Math.max(
            currentFighters[defender].health - damage,
            0
          );

          setBattleLog((prev) => [
            ...prev,
            `${currentFighters[attacker].username} ${move} ${currentFighters[defender].username} for ${damage} damage!`,
          ]);

          setFighters(currentFighters as unknown as [User, User]);
          turnCounter++;
        }, 2000);
      }
    }
  };

  return (
    <BattleArena
      fighters={fighters}
      battleLog={battleLog}
      isFighting={isFighting}
      winner={winner}
      onStartBattle={simulateBattle}
    />
  );
}
