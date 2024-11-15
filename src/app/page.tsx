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
  const features = [
    {
      title: "LayerX",
      icon: <NftMintingIcon color="#33A7FF" />,
      description: "Explore the revolutionary LayerX ecosystem",
      href: "/layerx",
      borderColor: "#33A7FF",
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
      icon: <XplayIcon color="#F6C942" />,
      description:
        "Play games with your collected XP. But watch out, you can also lose!",
      href: "/xplay",
      borderColor: "#F6C942",
      buttonText: "Play Games",
      disabled: false,
    },
  ];

  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh">
      <Box position="relative" w="100%" zIndex={0}>
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
              color="#33DBB8"
              fontSize="32px"
              fontStyle="normal"
              fontWeight="800"
              lineHeight="normal"
              fontFamily="Plus Jakarta Sans"
            >
              LayerX Products
            </Text>
          </Box>
        </Box>

        <Box
          margin="0px 16px 24px 16px"
          position="relative"
          display="flex"
          gap="14px"
          flexDirection="column"
          pb="80px"
        >
          {features?.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const FeatureCard = (props: FeatureCardProps) => {
  const { feature } = props;
  return (
    <Box
      borderRadius="12px"
      border="1px solid rgba(255, 255, 255, 0.10)"
      background="#191916"
      padding="16px"
      opacity={feature.disabled ? 0.5 : 1}
      transition="all 0.3s"
    >
      <Box display="flex" flexDirection="row" gap="16px">
        <Box
          height="60px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {feature?.icon}
        </Box>

        <Box display="flex" flexDirection="column" gap="6px">
          <Text
            fontFamily="Plus Jakarta Sans"
            color="#FFF"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="800"
            lineHeight="normal"
          >
            {feature?.title}
          </Text>
          <Text
            fontFamily="Plus Jakarta Sans"
            color="#A0A0A0"
            fontSize="14px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="normal"
          >
            {feature?.description}
          </Text>
        </Box>
      </Box>
      <Box
        marginTop="16px"
        marginBottom="16px"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Divider border="1px solid #191916 !important" />
      </Box>
      <Box
        borderRadius="8px"
        border={`1px solid ${feature?.borderColor}`}
        height="42px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor={feature.disabled ? "not-allowed" : "pointer"}
        transition="all 0.3s"
        _hover={
          !feature.disabled
            ? {
                bg: feature?.borderColor,
                color: "#000",
              }
            : {}
        }
        opacity={feature.disabled ? 0.5 : 1}
      >
        <Link href={feature.disabled ? "#" : feature.href}>
          <Text
            fontFamily="Plus Jakarta Sans"
            color={feature.disabled ? "#A0A0A0" : "#FFF"}
            fontSize="14px"
            fontWeight="700"
            _hover={
              !feature.disabled
                ? {
                    color: "#000",
                  }
                : {}
            }
          >
            {feature?.buttonText}
          </Text>
        </Link>
      </Box>
    </Box>
  );
};