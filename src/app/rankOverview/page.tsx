"use client";
import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../assets/background.png";
import BackArrowIcon from "@/icons/ArrowBack";
import { useStore } from "@/store";
import Link from "next/link";

const ranks = [
  {
    title: "Digital Sculptor",
    xpRequired: "1,000",
    icon: "🎨",
    color: "#33DBB8",
    nextRank: "Pixel Artist",
  },
  {
    title: "Pixel Artist",
    xpRequired: "1,500",
    icon: "🎮",
    color: "#4CAF50",
    nextRank: "Digital Sculptor",
  },
  {
    title: "Digital Sculptor",
    xpRequired: "2,000-4,000",
    icon: "🎨",
    color: "#F44336",
    nextRank: "Crypto Curator",
  },
  {
    title: "Crypto Curator",
    xpRequired: "4,000-6,000",
    icon: "💎",
    color: "#9C27B0",
    nextRank: "Blockchain Builder",
  },
  {
    title: "Blockchain Builder",
    xpRequired: "6,000-10,000",
    icon: "🏗️",
    color: "#FFC107",
    nextRank: null,
  },
];

export default function RankOverviewPage() {
  const user = useStore((state) => state.user);
  const userPoints = user?.points || 0;

  // Function to determine user's current rank
  const getCurrentRank = () => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      const minXP = parseInt(
        ranks[i].xpRequired.split("-")[0].replace(",", ""),
      );
      if (userPoints >= minXP) {
        return ranks[i];
      }
    }
    return ranks[0];
  };

  const currentRank = getCurrentRank();

  // Function to calculate progress for a rank
  const calculateProgress = (rank: (typeof ranks)[0]) => {
    const [minXP, maxXP] = rank.xpRequired
      .split("-")
      .map((xp) => parseInt(xp?.replace(",", "") || "0"));
    const maxPoints = maxXP || minXP;
    const progress = Math.min((userPoints / maxPoints) * 100, 100);
    return progress;
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
            {ranks.map((rank, index) => {
              const isCurrentRank = rank.title === currentRank.title;
              const progress = calculateProgress(rank);
              const isCompleted = progress >= 100;

              return (
                <Box
                  key={index}
                  borderRadius="12px"
                  bg="#191916"
                  padding="16px"
                  border={
                    isCurrentRank
                      ? "1px solid #33DBB8"
                      : "1px solid rgba(255, 255, 255, 0.10)"
                  }
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb="12px"
                  >
                    <Box display="flex" alignItems="center" gap="8px">
                      <Box
                        width="32px"
                        height="32px"
                        borderRadius="8px"
                        bg={rank.color + "26"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="20px"
                      >
                        {rank.icon}
                      </Box>
                      <Text
                        color="#FFF"
                        fontSize="16px"
                        fontWeight="700"
                        fontFamily="Plus Jakarta Sans"
                      >
                        {rank.title}
                      </Text>
                    </Box>
                    {isCompleted && (
                      <Text
                        color="#33DBB8"
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="Plus Jakarta Sans"
                      >
                        Complete
                      </Text>
                    )}
                  </Box>
                  <Box
                    width="100%"
                    height="4px"
                    bg="rgba(255, 255, 255, 0.10)"
                    borderRadius="2px"
                  >
                    <Box
                      width={`${progress}%`}
                      height="100%"
                      bg={rank.color}
                      borderRadius="2px"
                      transition="width 0.5s ease-in-out"
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt="8px">
                    <Text
                      color="rgba(255, 255, 255, 0.50)"
                      fontSize="14px"
                      fontWeight="500"
                      fontFamily="Plus Jakarta Sans"
                    >
                      {rank.xpRequired}XP
                    </Text>
                    {rank.nextRank && (
                      <Text
                        color="rgba(255, 255, 255, 0.50)"
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="Plus Jakarta Sans"
                      >
                        → {rank.nextRank}
                      </Text>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
