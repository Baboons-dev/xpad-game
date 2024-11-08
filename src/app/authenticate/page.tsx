'use client'
import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Spin} from "antd";
import {useUser} from "@/hooks";
export default  function Authenticate() {
    const router=useRouter();
    const searchParams = useSearchParams();
    const state = searchParams.get("uCode");
    const tgId = searchParams.get("codeVerifier");
    const code = searchParams.get("code");
    const tId = searchParams.get("tId");
    const {loginTwitter}=useUser()
    useEffect(() => {
        if (state && code && tgId && tId) {
            loginTwitter({state:state,code:code,tId:tId,tgId:tgId}).then(()=>router.push('/'))
        }
    }, [tId, code,tgId,state]);
    return (
      <Spin/>
    );
}