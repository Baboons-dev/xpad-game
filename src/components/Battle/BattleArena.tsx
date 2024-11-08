"use client";
import { Sword, Swords } from "lucide-react";
import { motion } from "framer-motion";
import { User } from "@/types/type";
import BattleLog from "./BattleLog";
import {Avatar, Button} from "antd";

interface BattleArenaProps {
  fighters?: [User, User];
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
  if (!fighters) return null;

  const [fighter1, fighter2] = fighters;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-card/90 p-2 pt-20 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-6 relative">
          <div className="absolute inset-0 bg-brand-lime/5 blur-3xl rounded-full"></div>
          <h1 className="text-3xl md:text-5xl font-black mb-2 md:mb-4 bg-gradient-to-r from-brand-lime to-brand-white bg-clip-text text-transparent">
            Battle Arena
          </h1>
          <p className="text-muted text-sm md:text-lg">
            May the best fighter win!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-6">
          {[fighter1, fighter2].map((fighter, index) => (
            <motion.div
              key={fighter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="p-3 md:p-6 bg-gradient-to-b from-card/90 to-black/90 border-brand-lime/20">
                <div className="flex flex-col items-center space-y-2 md:space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-lime/10 blur-lg rounded-full"></div>
                    <Avatar className="w-16 h-16 md:w-32 md:h-32 ring-2 md:ring-4 ring-brand-lime/20" src={fighter.avatar}>
                    </Avatar>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/90 px-2 md:px-4 py-1 rounded-full border border-brand-lime/20">
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <Sword className="w-3 h-3 md:w-4 md:h-4 text-brand-lime" />
                        <span className="text-xs md:text-sm font-mono text-brand-lime">
                          {fighter.points}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-2 md:mt-4">
                    <h3 className="text-sm md:text-xl font-bold text-brand-white truncate max-w-[120px] md:max-w-full">
                      {fighter.username}
                    </h3>
                    <div className="mt-1 md:mt-2">
                      <div className="w-full bg-black/50 rounded-full h-1.5 md:h-2">
                        <motion.div
                          className="bg-brand-lime h-full rounded-full"
                          initial={{ width: "100%" }}
                          animate={{
                            width: `${
                              (fighter.health / fighter.points) * 100
                            }%`,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="text-xs md:text-sm text-muted mt-1">
                        HP: {fighter.health}/{fighter.points}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          {!isFighting && !winner && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-lime/20 blur-xl rounded-full"></div>
              <Button
                size="lg"
                onClick={onStartBattle}
                className="relative bg-gradient-to-r from-brand-lime to-brand-lime-dark hover:from-brand-lime-dark hover:to-brand-lime text-background font-bold text-base md:text-lg px-6 md:px-8 py-4 md:py-6"
              >
                <Swords className="mr-2 h-4 w-4 md:h-6 md:w-6" />
                Start Battle
              </Button>
            </motion.div>
          )}

          {winner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-xl md:text-2xl font-bold text-brand-lime mb-2">
                Winner: {winner.username}!
              </h2>
              <p className="text-sm md:text-base text-muted">
                Victory has been claimed!
              </p>
            </motion.div>
          )}

          <div className="w-full">
            <BattleLog messages={battleLog} />
          </div>
        </div>
      </div>
    </main>
  );
}
