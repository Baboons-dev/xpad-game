"use client";
import Link from "next/link";
import { Box, Divider, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../assets/background.png";
import NftMintingIcon from "@/icons/NftMinting";
import { FeatureType } from "@/types/type";
import IxoFundraisingIcon from "@/icons/Ixo";
import XplayIcon from "@/icons/Xplay";
import { useUser } from "@/hooks";

interface FeatureCardProps {
  feature: FeatureType;
}

export default function HomePage() {
  const { logout } = useUser();
  const features = [
    {
      title: "LayerX",
      icon: <NftMintingIcon />,
      description: "Explore the revolutionary LayerX ecosystem",
      href: "/layerx",
      borderColor: "#33DBB8",
      buttonText: "Explore NFT Minting",
      disabled: false,
    },
    {
      title: "IXOs - Fundraising on X",
      icon: <IxoFundraisingIcon />,
      description:
        "Decentralized fundraising on X, using engagement-based participation.",
      href: "/ixos",
      borderColor: "#BEF642",
      buttonText: "Coming Soon",
      disabled: true,
    },
    {
      title: "xPlay - Play & Earn XP",
      icon: <XplayIcon />,
      description:
        "Play games with your collected XP. But watch out, you can also lose!",
      href: "/xplay",
      borderColor: "#33DBB8",
      buttonText: "Play Games",
      disabled: false,
    },
  ];

  return (
    <Box w="100%" display="flex" flexDirection="column">
      <Box position="absolute" w="100%" zIndex={0}>
        <Image
          src={backgroundImage.src}
          h="auto"
          objectFit="contain"
          position="absolute"
        />
        <Box position="relative" margin="36px 16px 36px 16px">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text
              color="#CECECE"
              fontSize="14px"
              fontStyle="normal"
              fontWeight="500"
              lineHeight=" normal"
            >
              Xp History
            </Text>
            <Text
              color="#33DBB8;"
              fontSize="32px"
              fontStyle="normal"
              fontWeight="800"
              lineHeight="normal"
              marginTop="2px"
            >
              Explore all
            </Text>
          </Box>
        </Box>

        <Box
          margin="0px 16px 24px 16px"
          position="relative"
          display="flex"
          gap="14px"
          flexDirection="column"
        >
          xpHistory here
        </Box>
      </Box>
    </Box>
  );
}
