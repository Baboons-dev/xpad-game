"use client";
import { useEffect, useState } from "react";
import { Fighter, User } from "@/lib/types";
import BattleArena from "@/components/ui/Battle/BattleArena";
import axios from "axios";

export default function Home() {
  const [fighters, setFighters] = useState<[User, User]>();
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isFighting, setIsFighting] = useState(false);
  const [winner, setWinner] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api.xpad-extension.baboons.tech/api/user/list/"
        );
        setFighters(response?.data?.results); // Assuming response data is the array of users
      } catch (err: any) {
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

      const newFighters = fighters.map((f) => ({ ...f, health: f.points }));
      console.log("newFighters", newFighters);

      let currentFighters = [...newFighters];
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

        const damage = Math.max(
          Math.floor(
            currentFighters[attacker].attack *
              (1 - currentFighters[defender].defense / 50)
          ),
          1
        );

        console.log("damage", damage);

        console.log("currentFighters", currentFighters);

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
