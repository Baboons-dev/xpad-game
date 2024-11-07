"use client";

import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

interface HeaderProps {
  loggedInUser: User;
  loading?: boolean;
}

export default function Header({ loggedInUser, loading }: HeaderProps) {
  if (!loggedInUser) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b border-brand-lime/20 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-lime/10 blur-lg rounded-full"></div>
              <Avatar className="w-10 h-10 ring-2 ring-brand-lime/30">
                <AvatarImage src={loggedInUser.avatar} alt={loggedInUser.username} />
                <AvatarFallback>{loggedInUser.username[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-bold text-brand-white">{loggedInUser.username}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="flex items-center space-x-2 bg-black/50 px-4 py-2 rounded-full border border-brand-lime/20">
                <Trophy className="w-4 h-4 text-brand-lime" />
                <span className="font-mono text-brand-lime">
                  {loggedInUser.points}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}