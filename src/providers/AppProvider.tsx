"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useTelegram } from "@/providers/TelegramProvider";
import { useStore } from "@/store";
import { TopBar } from "@/components/top-bar";
import { MobileNav } from "@/components/mobile-nav";
import { Box } from "@chakra-ui/react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { getCurrentUser, logout } = useUser();
  const [fistTime, setFistTime] = useState<boolean>(true);
  const user = useStore((state) => state.user);
  const accessToken = useStore((state) => state.accessToken);
  const router = useRouter();
  const { telegram_user } = useTelegram();
  const searchParams = useSearchParams();
  const tgId = searchParams.get("tgId");

  useEffect(() => {
    if (
      !!user &&
      !!telegram_user &&
      user?.telegram_id !== telegram_user?.id.toString()
    ) {
      setFistTime(true);
      logout();
    } else if (accessToken && !user) {
      getCurrentUser();
      setFistTime(false);
    }

    if (
      accessToken &&
      fistTime &&
      user?.telegram_id === telegram_user?.id.toString()
    ) {
      getCurrentUser();
      setFistTime(false);
    }
  }, [telegram_user, accessToken, user, fistTime]);

  useEffect(() => {
    console.log(searchParams.toString());
    // if (!user && !accessToken) {
    //   router.push("/authenticate?" + searchParams.toString());
    // }
  }, [user, fistTime]);

  console.log("user", user, accessToken);

  return (
    <Box
      height="inherit"
      // style={{ marginTop: "80px" }}
    >
      <TopBar />
      {user && accessToken && <TopBar />}
      {children}
      {user && accessToken && <MobileNav />}
      {/* {user && accessToken && <MobileNav />} */}
    </Box>
  );
}
