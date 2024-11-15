"use client";

import { Box, Text } from "@chakra-ui/react";
import { Users, Vote } from "lucide-react";
import { Button } from "antd";
import Link from "next/link";

interface CompetitionCard {
  id: string;
  title: string;
  image: string;
  players: number;
  votes: number;
  status: "upcoming" | "active" | "ended";
  timeLeft: string;
}

const competitions: CompetitionCard[] = [
  {
    id: "1",
    title: "Best NFT Design 2024",
    image: "https://picsum.photos/400/300",
    players: 0,
    votes: 0,
    status: "upcoming",
    timeLeft: "23h • 52m • 36s",
  },
  {
    id: "2",
    title: "Digital Art Challenge",
    image: "https://picsum.photos/400/301",
    players: 15,
    votes: 0,
    status: "active",
    timeLeft: "3 Days",
  },
  {
    id: "3",
    title: "Crypto Punk Revival",
    image: "https://picsum.photos/400/302",
    players: 20,
    votes: 16283,
    status: "active",
    timeLeft: "23h • 52m • 36s",
  },
];

function CompetitionCard({ competition }: { competition: CompetitionCard }) {
  return (
    <Box
      borderRadius="12px"
      border="1px solid rgba(255, 255, 255, 0.10)"
      background="#191916"
      overflow="hidden"
    >
      <Box position="relative">
        <img
          src={competition.image}
          alt={competition.title}
          className="w-full h-48 object-cover"
        />
      </Box>

      <Box p={4}>
        <Text
          color="white"
          fontSize="16px"
          fontWeight="700"
          mb={3}
          fontFamily="Plus Jakarta Sans"
        >
          {competition.title}
        </Text>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Users size={16} className="text-[#33A7FF]" />
            <Text color="white" fontSize="14px" fontFamily="Plus Jakarta Sans">
              {competition.players} Players
            </Text>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Vote size={16} className="text-[#33A7FF]" />
            <Text color="white" fontSize="14px" fontFamily="Plus Jakarta Sans">
              {competition.votes.toLocaleString()} Votes
            </Text>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderTop="1px solid rgba(255, 255, 255, 0.10)"
          pt={4}
        >
          <Text color="#8C8C8C" fontSize="14px" fontFamily="Plus Jakarta Sans">
            {competition.status === "upcoming"
              ? "Opens in"
              : competition.status === "active"
              ? competition.players === 0
                ? "Entries close in"
                : "Voting ends in"
              : "Ended"}
          </Text>
          <Text color="#33A7FF" fontSize="14px" fontFamily="Plus Jakarta Sans">
            {competition.timeLeft}
          </Text>
        </Box>

        <Link href={`/layerx/competitions/${competition.id}`}>
          <Button
            className="w-full mt-4 bg-transparent border-[#33A7FF] hover:bg-[#33A7FF] hover:text-black text-[#33A7FF] transition-all"
            size="large"
          >
            {competition.status === "upcoming"
              ? "Get notified"
              : competition.status === "active"
              ? competition.players === 0
                ? "Participate"
                : "Vote Now"
              : "View Results"}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default function FeaturedCompetitions() {
  return (
    <Box className="space-y-4 pb-20">
      {competitions.map((competition) => (
        <CompetitionCard key={competition.id} competition={competition} />
      ))}
    </Box>
  );
}