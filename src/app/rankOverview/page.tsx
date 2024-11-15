"use client";
import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../assets/background.png";
import BackArrowIcon from "@/icons/ArrowBack";
import { useStore } from "@/store";
import Link from "next/link";
import Rank from "@/components/Ranks/Rank";
import { Key } from "react";

// const userLookupLevels = [
//   {
//     id: 1,
//     level_name: "Rising Star",
//     starting_points: 0,
//     ending_points: 1000,
//     level_image:
//       "https://api.xpad-extension.baboons.tech/media/level_images/Rising_Star.png",
//     background_colour: "#1C1D33",
//     primary_color: "#19A0ED",
//     current_user_level: false,
//     next_level_name: "Digital Sculptor",
//   },
//   {
//     id: 4,
//     level_name: "Digital Sculptor",
//     starting_points: 1001,
//     ending_points: 4000,
//     level_image:
//       "https://api.xpad-extension.baboons.tech/media/level_images/Digital_Sculptor.png",
//     background_colour: "#221A1A",
//     primary_color: "#FF3A3A",
//     current_user_level: false,
//     next_level_name: "Crypto Curator",
//   },
//   {
//     id: 3,
//     level_name: "Crypto Curator",
//     starting_points: 4001,
//     ending_points: 6000,
//     level_image:
//       "https://api.xpad-extension.baboons.tech/media/level_images/Crypto_Curator.png",
//     background_colour: "#301C33",
//     primary_color: "#B707F5",
//     current_user_level: false,
//     next_level_name: "Blockchain Builder",
//   },
//   {
//     id: 2,
//     level_name: "Blockchain Builder",
//     starting_points: 6001,
//     ending_points: 2147483647,
//     level_image:
//       "https://api.xpad-extension.baboons.tech/media/level_images/Blockchain_Builder.png",
//     background_colour: "#13120A",
//     primary_color: "#EDC801",
//     current_user_level: true,
//     next_level_name: "N/A",
//     current_points: 13200,
//     percentage_completion: 0,
//   },
// ];

export default function RankOverviewPage() {
  const user = useStore((state) => state.user);
  const userPoints = user?.points || 0;
  const userLookupLevels = user?.user_ranks;

  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh">
      <Box position="relative" w="100%" zIndex={0}>
        <Image
          src={backgroundImage.src}
          h="auto"
          objectFit="contain"
          position="absolute"
        />
        <Box position="relative" margin="24px 16px 29px 16px">
          <Box display="flex" alignItems="center">
            <Link href="/profile">
              <Box>
                <BackArrowIcon />
              </Box>
            </Link>
            <Box width="100%" display="flex" justifyContent="center">
              <Text
                color="white"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="800"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans"
                mb="4"
              >
                Rank Overview
              </Text>
            </Box>
          </Box>
        </Box>

        <Box
          margin="0px 16px 24px 16px"
          position="relative"
          pb="80px" // Add bottom padding to prevent content from being hidden under the menu
        >
          <Box display="flex" flexDirection="column" gap="12px">
            {userLookupLevels &&
              userLookupLevels?.length > 0 &&
              userLookupLevels.map((level: any, i: number) => (
                <Rank
                  key={i}
                  userLevelData={level}
                  isComplete={
                    i <
                    userLookupLevels.findIndex(
                      (level: { current_user_level: any }) =>
                        level.current_user_level,
                    )
                  }
                  isAfter={
                    i >
                    userLookupLevels.findIndex(
                      (level: { current_user_level: any }) =>
                        level.current_user_level,
                    )
                  }
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
