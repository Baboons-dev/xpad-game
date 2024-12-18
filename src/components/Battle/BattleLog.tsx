'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/config/icon';

interface BattleLogProps {
  battleLog: any[];
}

export default function BattleLog({ battleLog }: BattleLogProps) {
  return (
    <div className="BattleLog relative mt-[-20px]">
      <h2 className="text-[12px] text-[#ffffff80] font-[500] leading-[normal] tracking-[normal] text-right">
        Battle Log
      </h2>

      <div className="log-container mt-[8px]">
        <AnimatePresence mode="popLayout">
          {battleLog.length === 0 ? (
            <p className="text-muted text-center">
              Battle log will appear here...
            </p>
          ) : (
            <div className="battleLog-wrap">
              {battleLog.map((item, index) => (
                <motion.div
                  key={index}
                  className={`battleLog-item ${item.move}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}>
                  <div className="left-wrap">
                    <h2>{item.attacker}</h2>

                    <Icons name={item.move} className="w-[20px] h-[20px]" />

                    <h2>{item.defender}</h2>
                  </div>

                  <div className="right-wrap">
                    <Icons
                      name={'attack-sword-icon'}
                      className={`w-[20px] h-[20px] ${item.move}`}
                    />
                    <h3>{item.damage}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
