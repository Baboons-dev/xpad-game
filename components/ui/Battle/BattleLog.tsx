"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface BattleLogProps {
  logs: string[];
}

export default function BattleLog({ logs }: BattleLogProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 p-4">
      <h3 className="text-xl font-bold text-white mb-4">Battle Log</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-300 p-2 rounded bg-gray-700/30">{log}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
