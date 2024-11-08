'use client';
import React, {useEffect, useState} from 'react';
import {useUser} from '../hooks';
import {twitterLogin} from "@/api/apiCalls/user";
import {useSearchParams} from "next/navigation";
import {useTelegram} from "@/providers/TelegramProvider";
import {Button} from "antd";
import {useStore} from "@/store";

export function AppProvider({children}: { children: React.ReactNode }) {
    const { getCurrentUser, logout } = useUser();
    const [fistTime, setFistTime] = useState<boolean>(true);
  const user = useStore((state) => state.user);
  const accessToken = useStore((state) => state.accessToken);
    const [twUrl, setTwUrl] = useState('')
    const searchParams = useSearchParams();
    const {telegram_user} = useTelegram();
    const tgId = searchParams.get("tgId");
    // const [isLoading, setLoading] = useState(true);
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

    if (accessToken && fistTime && user?.telegramId === telegram_user?.id.toString()) {
      getCurrentUser();
      setFistTime(false);
    }
  }, [telegram_user, accessToken, user, fistTime]);


  // useEffect(() => {
  //   if (user && !fistTime) {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }
  // }, [user, fistTime]);
    const login = async () => {
        if (telegram_user && tgId)
            try {
                const response = await twitterLogin(tgId as string,telegram_user?.id.toString() as string )
                if (response?.url) {
                    const queryParams = new URL(response?.url);
                    queryParams.searchParams.set("redirect_uri", "https://xgame.baboons.tech/authenticate?tgId=" + tgId + '&tId=' + telegram_user?.id.toString());
                    setTwUrl(queryParams.toString())
                }
            } catch (e) {
            console.log(e)
            }

    }

    return (
        <>
            {user && accessToken && !fistTime && <div className="app-wrap">{children}</div> }
            {/*{!(user && accessToken) && */}
                <div>
                    <Button onClick={() => login()}>Login with twitter</Button>
                    {twUrl && <div>
                        <Button onClick={async () => {
                            await navigator.clipboard.writeText(twUrl);
                            alert('copied')
                        }}>Copy Link</Button>
                        <Button onClick={() => {
                            const newWindow = window.open(twUrl as string, '_blank');
                            if (newWindow) newWindow.opener = null;
                        }}>
                            Authenicate Link
                        </Button>
                    </div>
                    }
                </div>
            {/*}*/}
        </>
    );
}
