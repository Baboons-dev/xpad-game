"use client";

import { motion } from "framer-motion";
import { Fighter, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";
import FighterCard from "./FighterCard";
import BattleMessage from "./BattleMessage";

interface BattleArenaProps {
  fighters: [User, User] | undefined;
  battleLog: string[];
  isFighting: boolean;
  winner: User | null;
  onStartBattle: () => void;
}

export default function BattleArena({
  fighters,
  battleLog,
  isFighting,
  winner,
  onStartBattle,
}: BattleArenaProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-[70vh] bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />

          {/* Battle Stage */}
          <div className="relative h-full flex flex-col justify-between p-8">
            {/* Opponent Area */}
            <div className="self-start w-full max-w-sm">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {fighters && (
                  <FighterCard
                    fighter={fighters[1]}
                    isAttacking={isFighting && battleLog.length % 2 === 1}
                    isWinner={winner?.username === fighters[1].username}
                    position="opponent"
                  />
                )}
              </motion.div>
            </div>

            {/* VS Badge */}
            {!isFighting && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="bg-red-500 text-white font-bold px-8 py-4 rounded-full shadow-lg">
                  VS
                </div>
              </motion.div>
            )}

            {/* Player Area */}
            <div className="self-end w-full max-w-sm">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {fighters && (
                  <FighterCard
                    fighter={fighters[0]}
                    isAttacking={isFighting && battleLog.length % 2 === 0}
                    isWinner={winner?.username === fighters[0].username}
                    position="player"
                  />
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Battle Controls */}
        <div
          style={{ border: "1px solid red" }}
          className="mt-4 bg-slate-900 rounded-lg p-4"
        >
          <div className="grid grid-cols-1 gap-4">
            <BattleMessage
              message={
                winner
                  ? `${winner.username} wins the battle!`
                  : battleLog[battleLog.length - 1] || "Ready to fight?"
              }
              isFighting={isFighting}
            />

            {!isFighting && !winner && (
              <Button
                onClick={onStartBattle}
                className="bg-red-600 hover:bg-red-700 text-white w-full py-6 text-lg"
              >
                <Swords className="mr-2 h-5 w-5" />
                Start Battle!
              </Button>
            )}

            {winner && (
              <Button
                onClick={onStartBattle}
                className="bg-red-600 hover:bg-red-700 text-white w-full py-6 text-lg"
              >
                <Swords className="mr-2 h-5 w-5" />
                Battle Again!
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
