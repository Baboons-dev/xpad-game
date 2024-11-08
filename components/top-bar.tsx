"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

const dummyUser = {
  name: "John Doe",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop",
  score: 2500
};

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 px-4">
      <div className="h-full max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border border-brand-lime/20">
            <AvatarImage src={dummyUser.avatar} alt={dummyUser.name} />
            <AvatarFallback>{dummyUser.name[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-brand-white">{dummyUser.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-brand-lime" />
          <span className="font-semibold text-brand-white">{dummyUser.score.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}