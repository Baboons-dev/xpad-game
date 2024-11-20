"use client";
import type { ITelegramUser, IWebApp } from "@/types/type";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface ITelegramContext {
  webApp?: IWebApp;
  telegram_user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
      setTimeout(() => {
        app.expand();
        app.headerColor = "#0A0318";
        app.isVerticalSwipesEnabled = false;
        app.disableVerticalSwipes();
        app.BackButton.show();
        app.BackButton.onClick(() => window.history.back());
      }, 100);
    }
  }, []);
  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      setTimeout(() => {
        if (pathname === `/`) {
          app.BackButton.hide();
        } else {
          app.BackButton.show();
        }
      }, 100);
    }
  }, [pathname]);

  // encrypted 8052122879 2468491469491883pDNHjx4wVPrVDvwOK/UDPQ==
  // encrypted 6365928460 66439116385786910FTa6qr9SF/NL4fh2tS4Uw==
  // encrypted 6365928461 4580006449179566bwxdo+4RogRCxjG1tcHeNg==
  // encrypted 6365928462 2080198345424589ofhmstvDZXFCkJF2Q+dLJg==
  // encrypted 6365928463 2395150315902941ZM2ZxX9iNs7U9jW6dA76Sg==

  // const statUser = {
  //   id: 6365928460,
  //   first_name: "Hasib2",
  //   last_name: "Arman2",
  // };

  const statUser = null;
  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          telegram_user: webApp.initDataUnsafe.user ?? statUser,
        }
      : {};
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value as ITelegramContext}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);

// https://xplay.baboons.tech/?tgId=0991436742780972dRyJi9l69ZTka7OtI4dyPA%3D%3D
