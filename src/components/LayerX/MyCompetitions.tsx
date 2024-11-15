"use client";

import { Box, Text } from "@chakra-ui/react";
import { useStore } from "@/store";

export default function MyCompetitions() {
  const user = useStore((state) => state.user);

  if (!user) {
    return (
      <Box className="text-center py-8">
        <Text color="white" opacity={0.6}>
          Please connect your wallet to view your competitions
        </Text>
      </Box>
    );
  }

  return (
    <Box className="text-center py-8">
      <Text color="white" opacity={0.6}>
        You haven't participated in any competitions yet
      </Text>
    </Box>
  );
}