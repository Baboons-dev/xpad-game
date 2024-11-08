'use client'
import {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
export default  function Authenticate() {
    const searchParams = useSearchParams();
    const state = searchParams.get("uCode");
    const tgId = searchParams.get("codeVerifier");
    const code = searchParams.get("code");
    const tId = searchParams.get("tId");
    useEffect(() => {
        if (state && code && tgId && tId) {
            const twitterLogin=async ()=>{
                try {
                    const axios.post()
                }catch (e) {

                }
            }
        }
    }, [tId, code,tgId,state]);
    return (
       <LoadingSpinner/>
    );
}