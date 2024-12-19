'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/config/icon';
import Image from 'next/image';
import CardBack_bg from '@/assets/images/CardBack_bg.png';
import card_burn from '@/assets/images/card_burn.png';
import card_freeze from '@/assets/images/card_freeze.png';
import card_kick from '@/assets/images/card_kick.png';
import card_poison from '@/assets/images/card_poison.png';
import card_punch from '@/assets/images/card_punch.png';

interface BattleLogProps {
  battleLog: any[];
}

export default function BattleCardPlay({ battleLog }: BattleLogProps) {
  const move_Imgs: any = {
    burn: card_burn,
    freeze: card_freeze,
    kick: card_kick,
    poison: card_poison,
    punch: card_punch,
  };

  const [LoginPlayer_TurnCount, setLoginPlayer_TurnCount] = useState<number>(0);
  const [Attacker_TurnCount, setAttacker_TurnCount] = useState<number>(0);

  // ------------TurnCount-------------
  useEffect(() => {
    const LoginPlayerTurnCount = battleLog.filter(
      (item) => item.move_by_login_player == true
    ).length;
    setLoginPlayer_TurnCount(LoginPlayerTurnCount);

    const AttackerTurnCount = battleLog.filter(
      (item) => item.move_by_login_player == false
    ).length;
    setAttacker_TurnCount(AttackerTurnCount);
  }, [battleLog.length]);
  // ------------/TurnCount-------------

  return (
    <div className="BattleCardPlay card-container w-full flex justify-between mt-[24px] gap-[20px] max-w-[369px] mx-auto">
      <div className="card-col left mt-[69px]">
        <div className="top-card-row">
          {Array.from({ length: 4 }, (_, idx) => (
            <div
              className={
                'top-card-img flex-1 ' +
                (LoginPlayer_TurnCount > idx ? 'step' : '')
              }>
              <Image
                key={idx}
                className={'pointer-events-none'}
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
          ))}
        </div>

        <div className="main-card left">
          <Image
            className="pointer-events-none"
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

          <AnimatePresence mode="popLayout">
            {battleLog.length > 0 &&
              battleLog.map(
                (item, idx) =>
                  item.move_by_login_player && ( // login_player loop
                    <motion.div
                      className={
                        'card-border ' +
                        (idx < battleLog.length - 2 && item.move_by_login_player
                          ? 'last_log '
                          : '') +
                        item.move +
                        ' ' +
                        (item.move_by_login_player
                          ? 'login_player'
                          : 'attacker')
                      }
                      initial={{ scale: 0.94, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.94, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      key={idx}>
                      <div className={'inner-item ' + item.move}>
                        <div className={'card_img ' + item.move}>
                          <Image
                            src={move_Imgs[item.move]}
                            alt={''}
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '88px',
                              objectFit: 'contain',
                            }}
                          />
                        </div>

                        <div className={'card-move ' + item.move}>
                          <h4>{item.move}</h4>

                          <div className="notch">
                            <Icons name="card-notch" />
                            <div className="card-diamond">
                              <Icons name="card-diamond" />
                            </div>
                          </div>
                        </div>

                        <div className={'damage-wrap ' + item.move}>
                          <Icons name="attack-sword-icon" />
                          <h5>{item.damage} damage</h5>
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
          </AnimatePresence>
        </div>

        <Icons name="CardBack_shadow" className="w-[106%]" />
      </div>

      <div className="card-col right">
        <div className="top-card-row">
          {Array.from({ length: 4 }, (_, idx) => (
            <div
              className={
                'top-card-img flex-1 ' +
                (Attacker_TurnCount > idx ? 'step' : '')
              }>
              <Image
                key={idx}
                className={'pointer-events-none'}
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
          ))}
        </div>

        <div className="main-card right">
          <Image
            className="pointer-events-none"
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

          <AnimatePresence mode="popLayout">
            {battleLog.length > 0 &&
              battleLog.map(
                (item, idx) =>
                  !item.move_by_login_player && ( // attacker loop
                    <motion.div
                      className={
                        'card-border ' +
                        (idx < battleLog.length - 2 &&
                        !item.move_by_login_player
                          ? 'last_log '
                          : '') +
                        item.move +
                        ' ' +
                        (item.move_by_login_player
                          ? 'login_player'
                          : 'attacker')
                      }
                      initial={{ scale: 0.94, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.94, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      key={idx}>
                      <div className={'inner-item ' + item.move}>
                        <div className={'card_img ' + item.move}>
                          <Image
                            src={move_Imgs[item.move]}
                            alt={''}
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '88px',
                              objectFit: 'contain',
                            }}
                          />
                        </div>

                        <div className={'card-move ' + item.move}>
                          <h4>{item.move}</h4>

                          <div className="notch">
                            <Icons name="card-notch" />
                            <div className="card-diamond">
                              <Icons name="card-diamond" />
                            </div>
                          </div>
                        </div>

                        <div className={'damage-wrap ' + item.move}>
                          <Icons name="attack-sword-icon" />
                          <h5>{item.damage} damage</h5>
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
          </AnimatePresence>
        </div>

        <Icons name="CardBack_shadow" className="w-[106%]" />
      </div>
    </div>
  );
}
