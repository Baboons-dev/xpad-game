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
  onStartBattle: (fighter1: any, fighter2: any) => void;
}

export default function BattleArena({
  fighters,
  battleLog,
  isFighting,
  winner,
  onStartBattle,
}: BattleArenaProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-[70vh]">
          <div className="absolute inset-0 bg-black/40" />

          {/* Battle Stage */}
          <div className="relative h-full flex justify-between p-4">
            {/* Opponent Area */}
            <div className="self-start w-full max-w-sm">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {fighters && fighters[1] && (
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
                className="absolute left-[45%] top-[30%] -translate-x-1/2 -translate-y-1/2"
              >
                <div className=" text-white font-bold px-8 py-4 rounded-full shadow-lg">
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
                {fighters && fighters[0] && (
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
        <div className="mt-4 bg-foreground border-border rounded-lg p-4">
          <div className="grid grid-cols-1 gap-4">
            <BattleMessage
              message={
                winner
                  ? `${winner.username} wins the battle!`
                  : battleLog[battleLog.length - 1] || "Ready to fight?"
              }
              isFighting={isFighting}
            />

            {!isFighting && !winner && fighters && fighters?.length > 0 && (
              <Button
                onClick={() => onStartBattle(fighters[0], fighters[1])}
                className="bg-brand-lime-dark hover:bg-brand-lime text-blac w-full py-6 text-lg"
              >
                <Swords className="mr-2 h-5 w-5" />
                Start Battle!
              </Button>
            )}

            {winner && fighters && fighters?.length > 0 && (
              <Button
                onClick={() => onStartBattle(fighters[0], fighters[1])}
                className="bg-brand-lime-dark hover:bg-brand-lime text-black w-full py-6 text-lg"
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
