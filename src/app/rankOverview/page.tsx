"use client";
import Link from "next/link";
import { Box, Divider, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../assets/background.png";
import NftMintingIcon from "@/icons/NftMinting";
import { FeatureType } from "@/types/type";
import IxoFundraisingIcon from "@/icons/Ixo";
import XplayIcon from "@/icons/Xplay";
import { useUser } from "@/hooks";

interface FeatureCardProps {
  feature: FeatureType;
}

export default function HomePage() {
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
              fontFamily="Plus Jakarta Sans"
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
              fontFamily="Plus Jakarta Sans"
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
          RankOverview here
        </Box>
      </Box>
    </Box>
  );
}
