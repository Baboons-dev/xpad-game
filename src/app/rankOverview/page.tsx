"use client";
import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../assets/background.png";
import BackArrowIcon from "@/icons/ArrowBack";
import { useStore } from "@/store";
import Link from "next/link";
import Rank from "@/components/Ranks/Rank";

const userLookupLevels = [
  {
    id: 1,
    level_name: "Rising Star",
    starting_points: 0,
    ending_points: 1000,
    level_image:
      "https://api.xpad-extension.baboons.tech/media/level_images/Rising_Star.png",
    background_colour: "#1C1D33",
    primary_color: "#19A0ED",
    current_user_level: false,
    next_level_name: "Digital Sculptor",
  },
  {
    id: 4,
    level_name: "Digital Sculptor",
    starting_points: 1001,
    ending_points: 4000,
    level_image:
      "https://api.xpad-extension.baboons.tech/media/level_images/Digital_Sculptor.png",
    background_colour: "#221A1A",
    primary_color: "#FF3A3A",
    current_user_level: false,
    next_level_name: "Crypto Curator",
  },
  {
    id: 3,
    level_name: "Crypto Curator",
    starting_points: 4001,
    ending_points: 6000,
    level_image:
      "https://api.xpad-extension.baboons.tech/media/level_images/Crypto_Curator.png",
    background_colour: "#301C33",
    primary_color: "#B707F5",
    current_user_level: false,
    next_level_name: "Blockchain Builder",
  },
  {
    id: 2,
    level_name: "Blockchain Builder",
    starting_points: 6001,
    ending_points: 2147483647,
    level_image:
      "https://api.xpad-extension.baboons.tech/media/level_images/Blockchain_Builder.png",
    background_colour: "#13120A",
    primary_color: "#EDC801",
    current_user_level: true,
    next_level_name: "N/A",
    current_points: 13200,
    percentage_completion: 0,
  },
];

export default function RankOverviewPage() {
  const user = useStore((state) => state.user);
  const userPoints = user?.points || 0;

  // Function to determine user's current rank
  // const getCurrentRank = () => {
  //   for (let i = ranks.length - 1; i >= 0; i--) {
  //     const minXP = parseInt(
  //       ranks[i].xpRequired.split("-")[0].replace(",", ""),
  //     );
  //     if (userPoints >= minXP) {
  //       return ranks[i];
  //     }
  //   }
  //   return ranks[0];
  // };

  // const currentRank = getCurrentRank();

  // Function to calculate progress for a rank
  // const calculateProgress = (rank: (typeof ranks)[0]) => {
  //   const [minXP, maxXP] = rank.xpRequired
  //     .split("-")
  //     .map((xp) => parseInt(xp?.replace(",", "") || "0"));
  //   const maxPoints = maxXP || minXP;
  //   const progress = Math.min((userPoints / maxPoints) * 100, 100);
  //   return progress;
  // };

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
            <Link href="/profile">
              <Box>
                <BackArrowIcon />
              </Box>
            </Link>
            <Box width="100%" display="flex" justifyContent="center">
              <Text
                color="#CECECE"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="800"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans"
              >
                Rank Overview
              </Text>
            </Box>
          </Box>
        </Box>

        <Box margin="0px 16px 24px 16px" position="relative">
          <Box display="flex" flexDirection="column" gap="12px">
            {userLookupLevels &&
              userLookupLevels?.length > 0 &&
              userLookupLevels.map((level, i) => (
                <Rank
                  userLevelData={level}
                  isComplete={
                    i <
                    userLookupLevels.findIndex(
                      (level) => level.current_user_level,
                    )
                  }
                  isAfter={
                    i >
                    userLookupLevels.findIndex(
                      (level) => level.current_user_level,
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
