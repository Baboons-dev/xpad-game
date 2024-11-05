"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sword, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserResponse } from "@/lib/types";

export default function Home() {
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
        setUsers(response.data); // Assuming response data is the array of users
      } catch (err: any) {
        console.log("err", err);
        setError(err.message); // Optional: handle error by setting error state
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-background text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-brand-lime">
            Ultimate Fighter Championship
          </h1>
          <p className="text-muted">Choose your opponent to begin the battle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users &&
            users.results.map((user) => (
              <Card
                key={user.id}
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300 hover:scale-105 bg-card border-border",
                  selectedFighter === user.id && "ring-2 ring-red-500"
                )}
                onClick={() => handleFighterSelect(user.id)}
              >
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-brand-white">{user.username}</h3>
                    <div className="flex items-center justify-center mt-2 space-x-2">
                      <Sword className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-muted">
                        Power: {user.points}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-brand-lime-dark text-background"
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
