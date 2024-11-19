"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {Button, message, Modal, Spin} from "antd";
import { useUser } from "@/hooks";
import { twitterLogin } from "@/api/apiCalls/user";
import { useTelegram } from "@/providers/TelegramProvider";
import { useSelector, useStore } from "@/store";
import { Box, Text, useToast } from "@chakra-ui/react";
import UnionLogo from "@/icons/Union";
import Logo from "@/icons/Logo";

export default function Authenticate() {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const tgId = searchParams.get("tgId");
  const code = searchParams.get("code");
  const tId = searchParams.get("tId");
  const codeVerifier = searchParams.get("codeVerifier");
  const [twUrl, setTwUrl] = useState("");
  const { loginTwitter, getCurrentUser } = useUser();
  const user = useStore((state) => state.user);
  const accessToken = useStore((state) => state.accessToken);
  const setAccessToken = useSelector.use.setAccessToken();
  const setRefreshToken = useSelector.use.setRefreshToken();
  const cTgId = useStore((state) => state.cTgId);



  useEffect(() => {
    if (state && code && tgId && tId && codeVerifier) {
      loginTwitter({
        state: state,
        code: code,
        tId: tId,
        tgId: tgId,
        codeVerifier: codeVerifier,
      });
    }
  }, [tId, code, tgId, state, codeVerifier]);

  const { telegram_user } = useTelegram();

  const login = async () => {
    if (telegram_user && (tgId || cTgId))
      try {
        const response = await twitterLogin(
          tgId ? tgId : (cTgId as string),
          telegram_user?.id.toString() as string,
        );
        console.log("response", response.data);
        if (response?.url && response?.code_verifier) {
          const queryParams = new URL(response?.url);
          queryParams.searchParams.set(
            "redirect_uri",
            "https://xplay.baboons.tech/authenticate?codeVerifier=" +
              encodeURI(response?.code_verifier) +
              "&tgId=" +
              encodeURI(tgId ? tgId : cTgId) +
              "&tId=" +
              encodeURI(telegram_user?.id.toString() as string),
          );
          // queryParams.toString();
          setTwUrl(queryParams.toString());
          // const newWindow = window.open(queryParams.toString(), "_blank");
          // if (newWindow) newWindow.opener = null;
        } else if (response.data.access) {
          message.success("Login Success");
          localStorage.setItem("token", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);
          setAccessToken(response.data.access as string);
          setRefreshToken(response.data.refresh as string);
          setTimeout(async () => {
            await getCurrentUser();
          }, 500);
          setTwUrl("");
        }
      } catch (e) {
        message.error("Code error");
        console.log(e);
      }
  };

  useEffect(() => {
    if (accessToken && user) {
      router.push("/?tgId=" + (tgId ? tgId : cTgId));
    }
  }, [user, accessToken]);


  const onAuthenticateLink = () => {
    const newWindow = window.open(twUrl as string, "_blank");
    if (newWindow) newWindow.opener = null;
    setTwUrl('')
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(twUrl);
      toast({
        title: "Link copied!",
        description: "You can now use the copied link",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      toast({
        title: "Failed to copy link",
        description: "Something went wrong, please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box>
      {state && code ? (
        <Spin />
      ) : (
        <Box height="100vh" padding="24px">
          <Box marginTop="24px" display="flex" justifyContent="center">
            <Logo />
          </Box>
          <Box
            marginTop="50px"
            marginBottom="50px"
            display="flex"
            justifyContent="center"
          >
            <UnionLogo />
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              padding={"1px"}
              width={["unset", "unset", "unset", "327px"]}
              zIndex={2}
              style={{
                borderRadius: "100px",
                backgroundImage:
                  "linear-gradient(#000, #000), linear-gradient(#1ED1FC, #47E473, #3AFF65)",
                backgroundOrigin: "border-box",
                backgroundClip: "content-box, border-box",
              }}
              backgroundColor="#000"
              cursor="pointer"
              onClick={() => login()}
            >
              <Box
                padding="20px 90px"
                borderRadius="100px"
                backgroundColor="#000"
              >
                <Text
                  color="#FFF"
                  fontSize="16px"
                  fontWeight="800"
                  textAlign="center"
                  cursor="pointer"
                  fontFamily="Plus Jakarta Sans"
                >
                  Login using X
                </Text>
              </Box>
            </Box>
          </Box>
          <Modal width={400}
                 footer={false}
                 open={!!twUrl}
                 onCancel={()=>setTwUrl('')}
                 title={'Login with X'}>
            <div className={'flex flex-col gap-5'}>
              <Button size={'large'} onClick={()=>onAuthenticateLink()}>Authorize twitter</Button>
              <p>
                If there is any issue in authorize twitter please copy link and paste in browser
              </p>
            <Button onClick={()=>copyLink()}>Copy Link</Button>
            </div>

          </Modal>
        </Box>
      )}
    </Box>
  );
}
