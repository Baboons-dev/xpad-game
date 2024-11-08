"use client";

import { motion, AnimatePresence } from "framer-motion";

interface BattleMessageProps {
  message: string;
  isFighting: boolean;
}

export default function BattleMessage({
  message,
  isFighting,
}: BattleMessageProps) {
  return (
    <div className="bg-white rounded-lg p-4 min-h-[80px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full"
        >
          <p className="text-lg font-pixel text-slate-800">
            {isFighting && (
              <span className="inline-block animate-bounce mr-2">➜</span>
            )}
            {message}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
