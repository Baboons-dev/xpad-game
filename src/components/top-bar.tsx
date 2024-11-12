"use client";

import { Trophy } from "lucide-react";
import { Avatar, Button } from "antd";
import { useUser } from "@/hooks";
import { useStore } from "@/store";

export function TopBar() {
  const { logout } = useUser();
  const user = useStore((state) => state.user);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 px-4">
      <div className="h-full max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            className="h-10 w-10 border border-brand-lime/20"
            src={user?.avatar}
          ></Avatar>
          <span className="font-medium text-brand-white">{user?.username}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => logout()}>Logout</Button>
          <Trophy className="h-5 w-5 text-brand-lime" />
          <span className="font-semibold text-brand-white">
            {user?.points.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
