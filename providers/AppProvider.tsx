'use client';
import React, {useEffect, useState, useRef} from 'react';
import {useUser} from '../hooks';
import {logout, selectUser} from '@/redux/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from "@/components/ui/button";
import axios from "axios";
import {twitterLogin} from "@/api/apiCalls/user";
import {useSearchParams} from "next/navigation";
import {useTelegram} from "@/providers/TelegramProvider";

export function AppProvider({children}: { children: React.ReactNode }) {
    const {getCurrentUser} = useUser();
    const dispatch = useDispatch();
    const {user, token, isAuthenticated} = useSelector(selectUser);
    const [twUrl, setTwUrl] = useState('')
    const searchParams = useSearchParams();
    const {telegram_user} = useTelegram();
    const tgId = searchParams.get("tgId");
    useEffect(() => {
        console.log('hitting time');
        if (token) {
            getCurrentUser()
        }
    }, [token]);
    const login = async () => {
        if (telegram_user && tgId)
            try {
                const response = await twitterLogin(telegram_user?.id.toString() as string, tgId as string)
                if (response?.url) {
                    const queryParams = new URL(response?.url);
                    queryParams.searchParams.set("redirect_uri", "https://xgame.baboons.tech/authenticate?tgId=" + tgId + '&tId=' + telegram_user?.id.toString());
                    setTwUrl(queryParams.toString())
                }
            } catch (e) {

            }

    }

    return (
        <>
            {isAuthenticated ? <div className="app-wrap">{children}</div> :
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
            }
        </>
    );
}
