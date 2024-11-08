"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sword, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  wallet_address: string;
  profile_link: string;
  avatar: string;
  points: number;
}

interface UserResponse {
  count: number;
  current_page: number;
  total_pages: number;
  results: User[];
}

export default function XPlayPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserResponse | null>(null);
  const [error, setError] = useState<any>(null);
  const [selectedFighter, setSelectedFighter] = useState<number | null>(null);

  const handleFighterSelect = (id: number) => {
    setSelectedFighter(id);
    router.push(`/battle?fighter=${id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api.xpad-extension.baboons.tech/api/user/list/"
        );
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-background text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-brand-lime">
            Ultimate Fighter Championship
          </h1>
          <p className="text-muted text-sm sm:text-base">Choose your opponent to begin the battle</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {users &&
            users.results.map((user) => (
              <Card
                key={user.id}
                className={cn(
                  "p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:scale-105 bg-card border-border",
                  selectedFighter === user.id && "ring-2 ring-red-500"
                )}
                onClick={() => handleFighterSelect(user.id)}
              >
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  <Avatar className="w-16 sm:w-24 h-16 sm:h-24">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-brand-white text-sm sm:text-base truncate max-w-[120px] sm:max-w-full">
                      {user.username}
                    </h3>
                    <div className="flex items-center justify-center mt-1 sm:mt-2 space-x-1 sm:space-x-2">
                      <Sword className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      <span className="text-xs sm:text-sm text-muted">
                        Power: {user.points}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-2 sm:mt-4 bg-brand-lime-dark text-background text-xs sm:text-sm py-1 sm:py-2"
                    onClick={() => handleFighterSelect(user.id)}
                  >
                    Select Fighter
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </main>
  );
}