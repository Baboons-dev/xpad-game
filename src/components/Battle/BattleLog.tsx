'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Scroll } from 'lucide-react';

interface BattleLogProps {
  messages: string[];
}

export default function BattleLog({ messages }: BattleLogProps) {
  return (
    <div className="BattleLog relative">
      <h2 className="text-[12px] text-[#ffffff80] font-[500] leading-[normal] tracking-[normal] text-right">
        Battle Log
      </h2>

      <div className="log-container mt-[8px]">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <p className="text-muted text-center">
              Battle log will appear here...
            </p>
          ) : (
            <div className="message-wrap">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className="message-item"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}>
                  <p>{message}</p>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
