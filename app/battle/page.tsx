"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trophy, Swords } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import axios from "axios";
import { UserResponse } from "../page";

const fighters = {
  1: {
    id: 1,
    name: "Shadow Striker",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop",
    power: 85,
  },
  2: {
    id: 2,
    name: "Mystic Warrior",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    power: 82,
  },
  3: {
    id: 3,
    name: "Thunder Knight",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop",
    power: 88,
  },
  4: {
    id: 4,
    name: "Dragon Master",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&h=200&auto=format&fit=crop",
    power: 90,
  },
};

export default function BattlePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [fighters1, setFighters] = useState<UserResponse | null>(null);
  const [battleState, setBattleState] = useState<
    "pre" | "fighting" | "finished"
  >("pre");
  const [winner, setWinner] = useState<number | null>(null);

  const playerFighterId = parseInt(searchParams.get("fighter") || "1");
  const computerFighterId = Math.floor(Math.random() * 4) + 1;

  const playerFighter = fighters[playerFighterId as keyof typeof fighters];
  const computerFighter = fighters[computerFighterId as keyof typeof fighters];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api.xpad-extension.baboons.tech/api/user/list/"
        );
        console.log("response", response);
        setFighters(response.data); // Assuming response data is the array of users
      } catch (err: any) {
        console.log("err", err);
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (battleState === "fighting") {
      const timer = setTimeout(() => {
        const playerWins =
          Math.random() <
          playerFighter.power / (playerFighter.power + computerFighter.power);
        setWinner(playerWins ? playerFighterId : computerFighterId);
        setBattleState("finished");

        // Trigger confetti for the winner
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [
    battleState,
    playerFighter.power,
    computerFighter.power,
    playerFighterId,
    computerFighterId,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
            Battle Arena
          </h1>
        </div>

        <div className="flex justify-center items-center gap-8">
          <motion.div
            animate={{
              x: battleState === "fighting" ? -50 : 0,
              scale: winner === playerFighterId ? 1.2 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Avatar className="w-32 h-32 border-4 border-blue-500">
              <img
                // src={playerFighter.avatar}
                // alt={playerFighter.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            {/* <h3 className="mt-4 text-xl font-bold">{playerFighter.name}</h3> */}
            <p className="text-blue-400">Player</p>
          </motion.div>

          {battleState === "pre" && (
            <Button
              variant="destructive"
              size="lg"
              onClick={() => setBattleState("fighting")}
              className="mx-8"
            >
              <Swords className="mr-2" />
              Start Battle
            </Button>
          )}

          {battleState === "fighting" && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-4xl font-bold text-red-500"
            >
              VS
            </motion.div>
          )}

          {battleState === "finished" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-8"
            >
              <Trophy className="w-16 h-16 text-yellow-400" />
            </motion.div>
          )}

          <motion.div
            animate={{
              x: battleState === "fighting" ? 50 : 0,
              scale: winner === computerFighterId ? 1.2 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Avatar className="w-32 h-32 border-4 border-red-500">
              <img
                src={computerFighter.avatar}
                alt={computerFighter.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">{computerFighter.name}</h3>
            <p className="text-red-400">Computer</p>
          </motion.div>
        </div>

        {battleState === "finished" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              {winner === playerFighterId ? "You Won!" : "Computer Won!"}
            </h2>
            <Button
              variant="secondary"
              onClick={() => router.push("/")}
              className="mt-4"
            >
              Play Again
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
