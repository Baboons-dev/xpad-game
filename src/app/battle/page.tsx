'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { User } from '@/types/type';
import BattleArena from '@/components/Battle/BattleArena';
import { Spin } from 'antd';
import { useStore } from '@/store';

export default function Home() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [fighters, setFighters] = useState<[User, User]>();
  const [battleLog, setBattleLog] = useState<any[]>([]);
  const [isFighting, setIsFighting] = useState(false);
  const [winner, setWinner] = useState<User | null>(null);
  const playerFighterId = searchParams.get('fighter');
  const [UserWon, setUserWon] = useState(false);
  const user = useStore((state) => state.user);

  // ------------FetchUsers-------------
  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://api.xpad-extension.baboons.tech/api/user/list/'
        );

        const fighters = response?.data?.results;
        // Filter to find the fighter with the matching `id`
        if (playerFighterId) {
          const matchingFighter = fighters?.find(
            (f: { id: number }) => f.id === parseInt(playerFighterId)
          );

          const loggedInFighter = fighters?.find(
            // (f: { username: string }) => f.username === user?.username
            (f: { username: string }) => f.username === 'hasib58961094' // test Manually setting the loggedInFighter
          );

          // give same points for fair fight
          playerFighterId &&
            setFighters([
              { ...loggedInFighter, points: 100 },
              { ...matchingFighter, points: 100 },
            ] as any); // Assuming response data is the array of users
          setLoading(false);
        }
      } catch (err: any) {
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);
  // ------------/FetchUsers-------------
  
  // ------------All Moves and Damage Point-------------
  const moves = ['punch', 'burn', 'kick', 'freeze', 'poison'];
  const moveDamage: any = {
    punch: 20,
    burn: 30,
    kick: 40,
    freeze: 25,
    poison: 35,
  };
  // ------------/All Moves and Damage Point-------------

  // ------------SimulateBattle-------------
  const simulateBattle = () => {
    if (fighters && fighters.length > 0) {
      setIsFighting(true);
      setBattleLog([]);
      setWinner(null);
      setUserWon(false);

      // Initialize each fighter's health, giving zero-point fighters a minimum starting health
      const newFighters = fighters.map((f) => ({
        ...f,
        health: f.points > 0 ? f.points : 10, // Minimum starting health of 10 for zero-point fighters
      }));
      let currentFighters = [...newFighters];
      setFighters(newFighters as any); // Initialize the fighters state with starting health
      let turnCounter = 0;

      const battleInterval = setInterval(() => {
        // Note: Check for end conditions: either fighter has zero health or max turns reached
        // Note: turnCounter >= 6 - use this for tun based fair gameplay
        // Note: currentFighters[0].health === 0 ||
        // Note: currentFighters[1].health === 0  - use this for health based fair gameplay

        // ------------GameCompleted-------------
        if (
          currentFighters[0].health === 0 ||
          currentFighters[1].health === 0 // stop when any fighter health is 0
        ) {
          clearInterval(battleInterval);
          setIsFighting(false);

          // Determine the winner based on remaining health
          const winner =
            currentFighters[0].health > currentFighters[1].health
              ? currentFighters[0]
              : currentFighters[1];
          setUserWon(currentFighters[0].health > currentFighters[1].health);
          setWinner(winner);
          console.log('winner', winner);
          return;
        }
        // ------------/GameCompleted-------------

        // Which fighter is attacking and which is defending
        const attackerIndex = turnCounter % 2 === 0 ? 0 : 1;
        const defenderIndex = attackerIndex === 0 ? 1 : 0;

        // Randomly choose a move for the attacker
        const move = moves[Math.floor(Math.random() * moves.length)];

        // Get the damage for the chosen move
        const damage = moveDamage[move];

        // Update defender's health in `currentFighters`
        currentFighters = currentFighters.map((fighter, index) => {
          if (index === defenderIndex) {
            return {
              ...fighter,
              health: Math.max(fighter.health - damage, 0), // Ensure health doesn't go below 0
            };
          }
          return fighter;
        });

        // Log the attack in the battle log
        setBattleLog((prev) => [
          ...prev,
          {
            move,
            damage,
            attacker: currentFighters[attackerIndex].username,
            defender: currentFighters[defenderIndex].username,
          },
        ]);

        // Update both `fighters` and `currentFighters` state to ensure health is saved
        setFighters([...currentFighters] as any);
        turnCounter++;
        // }, 2000);
      }, 500); // test speed up the game
    }
  };
  // ------------/SimulateBattle-------------

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center  w-full">
          <Spin />
        </div>
      ) : (
        <BattleArena
          fighters={fighters}
          battleLog={battleLog}
          isFighting={isFighting}
          winner={winner}
          userWon={UserWon}
          onStartBattle={simulateBattle}
        />
      )}
    </>
  );
}
