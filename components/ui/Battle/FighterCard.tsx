"use client";

import { motion } from "framer-motion";
import { Fighter, User } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Shield, Swords } from "lucide-react";

interface FighterCardProps {
  fighter: User;
  isAttacking: boolean;
  isWinner: boolean;
  position: "player" | "opponent";
}

export default function FighterCard({
  fighter,
  isAttacking,
  isWinner,
  position,
}: FighterCardProps) {
  const isOpponent = position === "opponent";

  return (
    <div className={cn("relative", isOpponent ? "text-left" : "text-right")}>
      {/* Stats Card */}
      <div
        className={cn(
          "bg-slate-900/90 rounded-lg p-3 mb-3",
          isOpponent ? "ml-auto" : "mr-auto"
        )}
      >
        <div className="flex items-center justify-between gap-3 mb-1">
          <strong className="text-white font-pixel">{fighter.username}</strong>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-1">
              <Swords className="w-4 h-4 text-red-400" />
              <span className="text-white text-sm">{fighter.attack}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-white text-sm">{fighter.defense}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-white font-pixel text-sm">HP</div>
          <Progress
            value={(fighter.health / fighter.points) * 100}
            className={cn(
              "h-2 w-48",
              fighter.health > fighter.points * 0.5
                ? "bg-emerald-900"
                : fighter.health > fighter.points * 0.2
                ? "bg-yellow-900"
                : "bg-red-900"
            )}
          />
        </div>
        <div className="text-right text-white/80 text-sm font-pixel">
          {fighter.health}/{fighter.points}
        </div>
      </div>

      {/* Fighter Avatar */}
      <motion.div
        animate={
          isAttacking
            ? {
                x: isOpponent ? [0, 20, 0] : [0, -20, 0],
                y: [0, -5, 0],
              }
            : {}
        }
        transition={{ duration: 0.2 }}
        className={cn("relative", isOpponent ? "ml-auto" : "mr-auto")}
      >
        <motion.div
          animate={
            isWinner
              ? {
                  y: [0, -10, 0],
                }
              : {}
          }
          transition={{
            duration: 0.5,
            repeat: isWinner ? Infinity : 0,
            repeatType: "reverse",
          }}
        >
          <Avatar
            className={cn(
              "w-32 h-32 border-4",
              isAttacking ? "border-red-500" : "border-white",
              isWinner && "border-yellow-400"
            )}
          >
            <AvatarImage src={fighter.avatar} alt={fighter.username} />
            <AvatarFallback>{fighter.username[0]}</AvatarFallback>
          </Avatar>
        </motion.div>

        {isAttacking && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 0] }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-red-500/20 rounded-full"
          />
        )}
      </motion.div>
    </div>
  );
}
