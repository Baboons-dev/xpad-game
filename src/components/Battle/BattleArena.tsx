'use client';
import { Sword, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '@/types/type';
import BattleLog from './BattleLog';
import { Avatar, Button } from 'antd';
import Image from 'next/image';
import BattleArenaBG from '@/assets/images/BattleArenaBG.png';
import CardBack_bg from '@/assets/images/CardBack_bg.png';
import Icons from '@/config/icon';

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
    <main className="BattleArena relative isolate py-[12px] px-[12px] font-['Plus_Jakarta_Sans']">
      <Image
        className="BattleArenaBG absolute z-[-1] top-[-64px] left-0 pointer-events-none"
        src={BattleArenaBG}
        alt={''}
        width={0}
        height={0}
        sizes="100vw"
        priority
        style={{
          width: '100%',
          height: '100vh',
        }}
      />

      <div className="inner-wrap max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-2 md:gap-6">
          {[fighter1, fighter2].map((fighter, index) => (
            <motion.div
              key={fighter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}>
              <div className="p-3 md:p-6 bg-gradient-to-b from-card/90 to-black/90 border-brand-lime/20">
                <div className="flex flex-col items-center space-y-2 md:space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-lime/10 blur-lg rounded-full"></div>
                    <Avatar
                      className="w-16 h-16 md:w-32 md:h-32 ring-2 md:ring-4 ring-brand-lime/20"
                      src={fighter.avatar}></Avatar>
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
                          initial={{ width: '100%' }}
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

        <div className="card-container w-full flex justify-between mt-[24px] gap-[75px]">
          <div className="card-col mt-[69px] flex-1 flex flex-col gap-[5.5px]">
            <div className="card-row grid grid-flow-col gap-[8px] px-[10px]">
              {Array.from({ length: 4 }, (_, idx) => (
                <Image
                  key={idx}
                  className="CardBack_bg flex-1"
                  src={CardBack_bg}
                  alt={''}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              ))}
            </div>

            <Image
              className="CardBack_bg"
              src={CardBack_bg}
              alt={''}
              width={0}
              height={0}
              sizes="100vw"
              priority
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>

          <div className="card-col flex-1 flex flex-col gap-[5.5px]">
            <div className="card-row grid grid-flow-col gap-[8px] px-[10px]">
              {Array.from({ length: 4 }, (_, idx) => (
                <Image
                  key={idx}
                  className="CardBack_bg flex-1"
                  src={CardBack_bg}
                  alt={''}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              ))}
            </div>
            <Image
              className="CardBack_bg"
              src={CardBack_bg}
              alt={''}
              width={0}
              height={0}
              sizes="100vw"
              priority
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
        <div className="onStartBattle_btn-wrap mt-[40px]">
          {!isFighting && !winner && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className=" flex justify-center items-center flex-col gap-[32px]">
              <h3 className="text-[14px] text-[#ffffffb3] font-[400] leading-[normal] tracking-[normal] text-center max-w-[180px]">
                Game is about to start. Press Start Battle to begin.
              </h3>

              <button
                onClick={onStartBattle}
                className="flex justify-center items-center h-[36px] bg-[#FF7843] px-[24px] rounded-[8px] gap-[8px]">
                <Icons name="sword-fill" className="h-[20px] w-[20px]" />
                <p className="text-[14px] text-[#000] font-[600] leading-[normal] tracking-[0.42px]">
                  Start Battle
                </p>
              </button>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col items-center">
          {winner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-brand-lime mb-2">
                Winner: {winner.username}!
              </h2>
              <p className="text-sm md:text-base text-muted">
                Victory has been claimed!
              </p>
            </motion.div>
          )}
        </div>

        {isFighting && (
          <div className="BattleLog w-full">
            <BattleLog messages={battleLog} />
          </div>
        )}
      </div>
    </main>
  );
}
