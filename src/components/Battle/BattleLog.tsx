"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Scroll } from "lucide-react";

interface BattleLogProps {
  messages: string[];
}

export default function BattleLog({ messages }: BattleLogProps) {
  return (
    <div className="relative font-['Plus_Jakarta_Sans']">
      <div className="flex items-center mb-4 space-x-2">
        <Scroll className="w-5 h-5 text-brand-lime" />
        <h3 className="text-xl font-bold text-brand-white">Battle Log</h3>
      </div>
      <div className="bg-black/50 border border-brand-lime/20 rounded-lg p-4">
        <div className="h-[200px] w-full overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <p className="text-muted text-center py-8">
                Battle log will appear here...
              </p>
            ) : (
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-brand-white/90 bg-black/30 p-2 rounded"
                  >
                    {message}
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}