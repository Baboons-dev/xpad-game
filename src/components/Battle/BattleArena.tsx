'use client';
import { Sword, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '@/types/type';
import BattleLog from './BattleLog';
import BattleCardPlay from './BattleCardPlay';
import { Avatar, Button } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Icons from '@/config/icon';
import Link from 'next/link';
import '@/assets/scss/BattleArena.scss';
import BattleArenaBG from '@/assets/images/BattleArenaBG.png';
import BattleArena_userStat_BG from '@/assets/images/BattleArena_userStat_BG.png';
import user_won from '@/assets/images/user_won.png';
import user_lost from '@/assets/images/user_lost.png';

interface BattleArenaProps {
  fighters?: [User, User];
  battleLog: any[];
  isFighting: boolean;
  winner: User | null;
  userWon: boolean | null;
  onStartBattle: () => void;
}

export default function BattleArena({
  fighters,
  battleLog,
  isFighting,
  winner,
  userWon,
  onStartBattle,
}: BattleArenaProps) {
  if (!fighters) return null;

  const [fighter1, fighter2] = fighters;
  const [UserFighter, setUserFighter] = useState(fighters[0]);
  const [UserVS, setUserVS] = useState(fighters[1]);

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
          maxHeight: '833px',
          objectFit: 'cover',
        }}
      />

      {/*  {true && ( */}
      {!winner && (
        <div className="inner-wrap mx-auto">
          <div className="user-stat-container">
            {[fighter1, fighter2].map((fighter, index) => (
              <div className="user-item" key={index}>
                <Image
                  className="BattleArena_userStat_BG"
                  src={BattleArena_userStat_BG}
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

                <div className="item-wrap">
                  <div className="img-wrap">
                    <Avatar
                      className="min-w-[40px] min-h-[40px]"
                      src={fighter.avatar}></Avatar>
                  </div>

                  <div className="user-name">
                    <h2>{fighter.username}</h2>
                  </div>

                  <div className="user-lvl">
                    <h3>Rising Star</h3>
                  </div>

                  <div className="hp-info">
                    <p>HP: {fighter.health}%</p>

                    <div className="progress-wrap">
                      <div
                        className="progress-item"
                        style={{
                          width: `${(fighter.health / fighter.points) * 100}%`,
                        }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <BattleCardPlay battleLog={battleLog} />

          {!isFighting && !winner && (
            <div className="onStartBattle_btn-wrap mt-[40px]">
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
            </div>
          )}

          {isFighting && <BattleLog battleLog={battleLog} />}
          {/* {true && <BattleLog battleLog={battleLog} />} */}
        </div>
      )}

      {winner && (
      // {false && winner && (
        <div className="game-end px-[24px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            {userWon ? (
              <Image
                src={user_won}
                alt={''}
                width={243}
                height={0}
                sizes="100vw"
                priority
              />
            ) : (
              <Image
                src={user_lost}
                alt={''}
                width={243}
                height={0}
                sizes="100vw"
                priority
              />
            )}

            {userWon ? <h2>Winner!</h2> : <h2>You lost</h2>}

            {userWon ? (
              <p>
                You won against {UserVS.username} You gain <span>200XP</span>
              </p>
            ) : (
              <p>Better luck next time!</p>
            )}

            <Link className="btn" href={'/xplay'}>
              <p>Close</p>
            </Link>
          </motion.div>
        </div>
      )}
    </main>
  );
}
