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
              Explore all
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
          {features?.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </Box>

        <Text color="#fff" onClick={() => logout()}>
          Logout
        </Text>
        <Link color="#fff" href={"/profile"}>
          <Text>Go to profile page</Text>
        </Link>
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
            color="#FFF"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="800"
            lineHeight=" normal"
          >
            {feature?.title}
          </Text>
          <Text
            color="#A0A0A0"
            fontSize="14px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight=" normal"
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
        <Divider border="1px solid rgba(255, 255, 255, 0.30) !important" />
      </Box>
      <Box
        borderRadius=" 8px"
        border={`1px solid ${feature?.borderColor}`}
        padding="0px 16px"
        height="58px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
      >
        <Link href={feature.disabled ? "#" : feature.href}>
          <Text color="#FFF" fontSize=" 14px" fontWeight="700">
            {feature?.buttonText}
          </Text>
        </Link>
      </Box>
    </Box>
  );
};
