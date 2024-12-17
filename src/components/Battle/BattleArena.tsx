'use client';
import { Sword, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '@/types/type';
import BattleLog from './BattleLog';
import { Avatar, Button } from 'antd';
import Image from 'next/image';
import Icons from '@/config/icon';
import Link from 'next/link';
import '@/assets/scss/BattleArena.scss';
import BattleArenaBG from '@/assets/images/BattleArenaBG.png';
import CardBack_bg from '@/assets/images/CardBack_bg.png';
import BattleArena_userStat_BG from '@/assets/images/BattleArena_userStat_BG.png';
import user_won from '@/assets/images/user_won.png';
import user_lost from '@/assets/images/user_lost.png';

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
          maxHeight: '833px',
          objectFit: 'cover',
        }}
      />

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

        <div className="card-container w-full flex justify-between mt-[24px] gap-[20px] max-w-[369px] mx-auto">
          <div className="card-col mt-[69px] flex-1 flex items-center flex-col gap-[5.5px] max-w-[147px]">
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

            <Icons name="CardBack_shadow" className="w-[106%]" />
          </div>

          <div className="card-col flex-1 flex flex-col gap-[5.5px] max-w-[147px]">
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

            <Icons name="CardBack_shadow" className="w-[106%]" />
          </div>
        </div>

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

        {isFighting && <BattleLog messages={battleLog} />}

        {winner && (
          <div className="game-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}>
              <Image
                src={user_won}
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

              <h2>Winner!</h2>

              <p>
                You won against joepert013! You gain <span>200XP</span>
              </p>

              <Link className="btn" href={'/xplay'}>
                <p>Close</p>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
