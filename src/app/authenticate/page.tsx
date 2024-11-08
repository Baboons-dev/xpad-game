'use client'
import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Spin} from "antd";
import {useUser} from "@/hooks";
export default  function Authenticate() {
    const router=useRouter();
    const searchParams = useSearchParams();
    const state = searchParams.get("state");
    const tgId = searchParams.get("tgId");
    const code = searchParams.get("code");
    const tId = searchParams.get("tId");
    const {loginTwitter}=useUser()
    useEffect(() => {
        if (state && code && tgId && tId) {
            loginTwitter({state:state,code:code,tId:tId,tgId:tgId})
        }
    }, [tId, code,tgId,state]);
    return (
      <Spin/>
    );
}