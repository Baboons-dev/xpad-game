'use client'
import React, {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Button, Spin} from "antd";
import {useUser} from "@/hooks";
import {twitterLogin} from "@/api/apiCalls/user";
import {useTelegram} from "@/providers/TelegramProvider";
import {useSelector, useStore} from "@/store";

export default function Authenticate() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const state = searchParams.get("state");
    const tgId = searchParams.get("tgId");
    const code = searchParams.get("code");
    const tId = searchParams.get("tId");
    // const codeVerifier = searchParams.get("codeVerifier");
    const [twUrl, setTwUrl] = useState('')
    const {loginTwitter, getCurrentUser} = useUser();
    const user = useStore((state) => state.user);
    const accessToken = useStore((state) => state.accessToken);
    const setAccessToken = useSelector.use.setAccessToken();
    const setRefreshToken = useSelector.use.setRefreshToken();
    useEffect(() => {
        if (state && code && tgId && tId ) {
            loginTwitter({state: state, code: code, tId: tId, tgId: tgId})
        }
    }, [tId, code, tgId, state]);
    const {telegram_user} = useTelegram();
    const login = async () => {
        if (telegram_user && tgId)
            try {
                const response = await twitterLogin(tgId as string, telegram_user?.id.toString() as string)
                console.log(response.data)
                if (response?.url) {
                    const queryParams = new URL(response?.url);
                    queryParams.searchParams.set("redirect_uri", "https://xplay.baboons.tech/authenticate?tgId=" + encodeURI(tgId) + '&tId=' + encodeURI(telegram_user?.id.toString() as string));
                    setTwUrl(queryParams.toString())
                } else if (response.data.access) {
                    localStorage.setItem('token', response.data.access);
                    localStorage.setItem('refreshToken', response.data.refresh);
                    setAccessToken(response.data.access as string);
                    setRefreshToken(response.data.refresh as string);
                    setTimeout(async () => {
                        await getCurrentUser();
                    }, 500)
                    return true;
                }

            } catch (e) {
                console.log(e)
            }

    }
    useEffect(() => {
        if (accessToken && user) {

            router.push('/?tgId=' + tgId)
        }
    }, [user, accessToken]);
    return (<div className={'flex justify-center'}>
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
    );
}