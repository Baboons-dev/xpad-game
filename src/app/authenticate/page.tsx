"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, message, Spin } from "antd";
import { useUser } from "@/hooks";
import { twitterLogin } from "@/api/apiCalls/user";
import { useTelegram } from "@/providers/TelegramProvider";
import { useSelector, useStore } from "@/store";
import { Box, Divider, Text } from "@chakra-ui/react";
import UnionLogo from "@/icons/Union";
import Logo from "@/icons/Logo";

export default function Authenticate() {
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
  const [authorizedState, setAuthorizedState] = useState(false);

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
    console.log("inside login");
    if (telegram_user && tgId)
      try {
        const response = await twitterLogin(
          tgId as string,
          telegram_user?.id.toString() as string,
        );
        console.log(response.data);
        if (response?.url && response?.code_verifier) {
          const queryParams = new URL(response?.url);
          queryParams.searchParams.set(
            "redirect_uri",
            "https://xplay.baboons.tech/authenticate?codeVerifier=" +
              encodeURI(response?.code_verifier) +
              "&tgId=" +
              encodeURI(tgId) +
              "&tId=" +
              encodeURI(telegram_user?.id.toString() as string),
          );
          setTwUrl(queryParams.toString());

          // const queryParams = new URL(response?.url);
          // queryParams.searchParams.set("redirect_uri", "https://xplay.baboons.tech/authenticate?tgId=" + encodeURI(tgId) + '&tId=' + encodeURI(telegram_user?.id.toString() as string));
          // setTwUrl(response?.url)
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
      router.push("/?tgId=" + tgId);
    }
  }, [user, accessToken]);

  const onTwitterLoginClick = () => {
    login();
    // if (authorizedState) {
    //   login();
    // } else {
    //   const newWindow = window.open(twUrl as string, "_blank");
    //   if (newWindow) newWindow.opener = null;
    // }
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
                borderRadius: "30px",
                backgroundImage:
                  "linear-gradient(#000, #000), linear-gradient(#1ED1FC, #47E473, #3AFF65)",
                backgroundOrigin: "border-box",
                backgroundClip: "content-box, border-box",
              }}
              backgroundColor="#000"
              onClick={() => onTwitterLoginClick()}
            >
              <Box padding="20px 90px">
                <Text
                  color="#FFF"
                  fontSize="16px"
                  fontWeight="800"
                  textAlign="center"
                  cursor="pointer"
                  fontFamily="Plus Jakarta Sans"
                >
                  {authorizedState ? "Continue" : "Login using X"}
                </Text>
              </Box>
            </Box>
          </Box>
          {authorizedState ? (
            <Box marginTop="16px">
              <Text
                color="rgba(255, 255, 255, 0.50)"
                textAlign="center"
                fontSize="12px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
                paddingLeft="14px"
                paddingRight="14px"
                whiteSpace="nowrap"
                cursor="pointer"
                fontFamily="Plus Jakarta Sans"
                onClick={() => setAuthorizedState(false)}
              >
                Or Go Back
              </Text>
            </Box>
          ) : (
            twUrl && (
              //  &&
              <Box>
                <Box
                  marginTop="16px"
                  marginBottom="16px"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Divider
                    border="1px solid rgba(255, 255, 255, 0.30) !important"
                    width={["45%", "45%", "50%"]}
                  />
                  <Text
                    color="rgba(255, 255, 255, 0.50)"
                    textAlign="center"
                    fontSize="12px"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="normal"
                    paddingLeft="14px"
                    paddingRight="14px"
                    whiteSpace="nowrap"
                    fontFamily="Plus Jakarta Sans"
                    cursor="pointer"
                  >
                    Or
                  </Text>
                  <Divider
                    border="1px solid rgba(255, 255, 255, 0.30) !important"
                    width={["45%", "45%", "50%"]}
                  />
                </Box>
                <Box display="flex" justifyContent="space-around">
                  <Text
                    color="rgba(255, 255, 255, 0.50)"
                    fontSize="14px"
                    fontWeight="500"
                    textAlign="center"
                    cursor="pointer"
                    fontFamily="Plus Jakarta Sans"
                    onClick={async () => {
                      await navigator.clipboard.writeText(twUrl);
                      alert("copied");
                    }}
                  >
                    Copy link
                  </Text>
                  <Text
                    color="rgba(255, 255, 255, 0.50)"
                    fontSize="14px"
                    fontWeight="500"
                    textAlign="center"
                    fontFamily="Plus Jakarta Sans"
                    cursor="pointer"
                    onClick={() => setAuthorizedState(true)}
                  >
                    Already authorized
                  </Text>
                </Box>
              </Box>
            )
          )}
        </Box>
      )}
      {/* {twUrl && (
        <Box>
          <Button
            onClick={async () => {
              await navigator.clipboard.writeText(twUrl);
              alert("copied");
            }}
          >
            Copy Link
          </Button>
          <Button
            onClick={() => {
              const newWindow = window.open(twUrl as string, "_blank");
              if (newWindow) newWindow.opener = null;
            }}
          >
            Authenicate Link
          </Button>
        </Box>
      )} */}
    </Box>
  );
}
