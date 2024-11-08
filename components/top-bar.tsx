"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

const dummyUser = {
  id: 52,
  username: "tomjongbloets",
  email: "",
  wallet_address: null,
  profile_link: "https://x.com/tomjongbloets",
  avatar:
    "https://pbs.twimg.com/profile_images/1325103480885964809/sP7xqpac_normal.jpg",
  points: 0,
};

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 px-4">
      <div className="h-full max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border border-brand-lime/20">
            <AvatarImage src={dummyUser.avatar} alt={dummyUser.username} />
            <AvatarFallback>{dummyUser.username[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-brand-white">
            {dummyUser.username}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-brand-lime" />
          <span className="font-semibold text-brand-white">
            {dummyUser.points.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
