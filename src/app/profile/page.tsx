"use client";

import {useUser} from "@/hooks";
import BackArrowIcon from "@/icons/ArrowBack";
import BackRightIcon from "@/icons/ArrowRightGrey";
import {useStore} from "@/store";
import {Box, Image, Text} from "@chakra-ui/react";
import Link from "next/link";
// import { useConnect } from "wagmi";
import backgroundImage from "../../assets/background.png";
import ProfilePicture from "../../assets/profilePicture.png";
import {useAccount, useConnect, useDisconnect} from "wagmi";
// import { useAppKit } from "@reown/appkit/react";
export default function ProfilePage() {
    const {connect, connectors} = useConnect();
    const {logout} = useUser();
    const user = useStore((state) => state.user);
// const { open, close } = useAppKit();
    const {disconnect} = useDisconnect()
    const {address, isConnected, connector, chain} = useAccount();
    const isIOS = () => {
    // Refined iOS detection
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );
  };
    return (
        <Box w="100%" display="flex" flexDirection="column">
            <Box position="absolute" w="100%" zIndex={0}>
                <Image
                    src={backgroundImage.src}
                    h="auto"
                    objectFit="contain"
                    position="absolute"
                />
                <Box position="relative" margin="24px 16px 29px 16px">
                    <Box display="flex" alignItems="center">
                        <Box>
                            <BackArrowIcon/>
                        </Box>

                        <Box width="100%" display="flex" justifyContent="center">
                            <Text
                                color="#FFF"
                                fontSize="20px"
                                fontStyle="normal"
                                fontWeight="800"
                                lineHeight="normal"
                                fontFamily="Plus Jakarta Sans"
                            >
                                My Profile
                            </Text>
                        </Box>
                    </Box>
                </Box>

                <Box
                    margin="0px 16px 24px 16px"
                    position="relative"
                    display="flex"
                    gap="14px"
                    flexDirection="column"
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        gap="12px"
                    >
                        {user?.avatar ? (
                            <Box
                                padding="1px"
                                width="100px"
                                height="100px"
                                zIndex="2"
                                borderRadius="8px"
                                backgroundImage="linear-gradient(#1F1F1F, #1F1F1F), linear-gradient(#1ED1FC, #47E473, #3AFF65)"
                                backgroundClip="content-box, border-box"
                                overflow="hidden"
                            >
                                <Image
                                    src={user?.avatar}
                                    alt="Description"
                                    width="100%"
                                    height="100%"
                                    objectFit="cover"
                                    objectPosition="center"
                                    borderRadius="7px"
                                />
                            </Box>
                        ) : (
                            <Box
                                padding="1px"
                                width="100px"
                                height="100px"
                                zIndex="2"
                                borderRadius="8px"
                                backgroundImage="linear-gradient(#1F1F1F, #1F1F1F), linear-gradient(#1ED1FC, #47E473, #3AFF65)"
                                backgroundClip="content-box, border-box"
                                overflow="hidden"
                            >
                                <Image
                                    src={ProfilePicture.src}
                                    alt="Description"
                                    width="100%"
                                    height="100%"
                                    objectFit="cover"
                                    objectPosition="center"
                                    borderRadius="7px"
                                />
                            </Box>
                        )}
                        <Text
                            color="#FFF"
                            fontSize="30px"
                            fontWeight="800"
                            fontFamily="Plus Jakarta Sans"
                        >
                            {user?.username}
                        </Text>
                    </Box>

                    <div id="wallet-connect" className={'flex gap-3 flex-wrap flex-col items-center'}>
                        <w3m-button/>
                        {address ? <div className={'text-white'}>{address} <button onClick={() => disconnect()}>Disconnect</button></div> :
                           isIOS() &&  connectors.map(item => (
                                <button key={item.id}
                                        onClick={() => connect({connector: connectors.find((connector) => connector.id === item.id)})}
                                        className={'bg-primary px-5 py-3 w-fit'}>
                                    {item.name}
                                </button>
                            ))
                        }

                    </div>

                    {/*<Box*/}
                    {/*  position="relative"*/}
                    {/*  marginTop="10px"*/}
                    {/*  role="button"*/}
                    {/*  onClick={() => {*/}
                    {/*    open()*/}
                    {/*    // console.log("connectors", connectors);*/}
                    {/*    // connect({ connector: connectors[0] });*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <Box*/}
                    {/*    position="absolute"*/}
                    {/*    top="-10px"*/}
                    {/*    right="-10px"*/}
                    {/*    zIndex="1"*/}
                    {/*    padding="4px 12px"*/}
                    {/*    borderRadius="100px"*/}
                    {/*    background="linear-gradient(90deg, #1ED1FC 0%, #47E473 100%)"*/}
                    {/*  >*/}
                    {/*    <Text*/}
                    {/*      color="black"*/}
                    {/*      fontSize="12px"*/}
                    {/*      fontWeight="600"*/}
                    {/*      fontFamily="Plus Jakarta Sans"*/}
                    {/*    >*/}
                    {/*      Coming Soon*/}
                    {/*    </Text>*/}
                    {/*  </Box>*/}
                    {/*  <Box*/}
                    {/*    borderRadius="8px"*/}
                    {/*    border="1px solid rgba(255, 255, 255, 0.2)"*/}
                    {/*    height="42px"*/}
                    {/*    display="flex"*/}
                    {/*    justifyContent="center"*/}
                    {/*    alignItems="center"*/}
                    {/*    background="linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)"*/}
                    {/*    backdropFilter="blur(10px)"*/}
                    {/*    transition="all 0.3s ease"*/}
                    {/*    cursor="default"*/}
                    {/*    _hover={{*/}
                    {/*      border: "1px solid rgba(255, 255, 255, 0.3)",*/}
                    {/*      background:*/}
                    {/*        "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.07) 100%)",*/}
                    {/*    }}*/}
                    {/*  >*/}
                    {/*    <Text*/}
                    {/*      fontFamily="Plus Jakarta Sans"*/}
                    {/*      color="rgba(255, 255, 255, 0.8)"*/}
                    {/*      fontSize="14px"*/}
                    {/*      fontWeight="700"*/}
                    {/*    >*/}
                    {/*      Connect Wallet*/}
                    {/*    </Text>*/}
                    {/*  </Box>*/}
                    {/*</Box>*/}
                    <Box
                        marginTop="10px"
                        display="flex"
                        flexDirection="column"
                        gap="16px"
                    >
                        <Link href={"/xpHistory"}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                gap="8px"
                            >
                                <Text
                                    color="#8C8C8C"
                                    fontSize="14px"
                                    fontWeight="600"
                                    lineHeight="14px"
                                    cursor="pointer"
                                    fontFamily="Plus Jakarta Sans"
                                >
                                    View XP History
                                </Text>
                                <BackRightIcon/>
                            </Box>
                        </Link>
                        <Link href={"/rankOverview"}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                gap="8px"
                            >
                                <Text
                                    color="#8C8C8C"
                                    fontSize="14px"
                                    fontWeight="600"
                                    lineHeight="14px"
                                    cursor="pointer"
                                    fontFamily="Plus Jakarta Sans"
                                >
                                    Rank Overview
                                </Text>
                                <BackRightIcon/>
                            </Box>
                        </Link>
                    </Box>
                    <Box
                        marginTop="36px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Link href={"/authenticate"}>
                            <Text
                                color="#FF3A3A"
                                fontSize="14px"
                                fontWeight="600"
                                lineHeight="14px"
                                cursor="pointer"
                                fontFamily="Plus Jakarta Sans"
                                onClick={() => logout()}
                            >
                                Logout
                            </Text>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
