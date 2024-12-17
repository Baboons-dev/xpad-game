'use client';
import { Sword, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '@/types/type';
import BattleLog from './BattleLog';
import { Avatar, Button } from 'antd';
import Image from 'next/image';
import Icons from '@/config/icon';
import '@/assets/scss/BattleArena.scss';
import BattleArenaBG from '@/assets/images/BattleArenaBG.png';
import CardBack_bg from '@/assets/images/CardBack_bg.png';
import BattleArena_userStat_BG from '@/assets/images/BattleArena_userStat_BG.png';

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
    <div className="BattleArena">
      <p className='text-white'>BattleArena</p>
    </div>
  );
}
