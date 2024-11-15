"use client";

import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../../../assets/background.png";
import { Avatar, Button, Modal } from "antd";
import Link from "next/link";
import BackArrowIcon from "@/icons/ArrowBack";
import { ChevronRight, Crown, Users, Vote } from "lucide-react";
import { useState } from "react";

interface TopPlayer {
  rank: number;
  username: string;
  avatar: string;
  votes: number;
}

interface CompetingNFT {
  id: string;
  image: string;
  owner: {
    username: string;
    avatar: string;
  };
  votes: number;
}

// Extended list of players for the full leaderboard
const allPlayers: TopPlayer[] = [
  {
    rank: 1,
    username: "MetaMaster",
    avatar: "https://picsum.photos/100/100",
    votes: 1832,
  },
  {
    rank: 2,
    username: "CryptoWhale",
    avatar: "https://picsum.photos/100/101",
    votes: 1456,
  },
  {
    rank: 3,
    username: "BlockExplorer",
    avatar: "https://picsum.photos/100/102",
    votes: 1233,
  },
  {
    rank: 4,
    username: "NFTHunter",
    avatar: "https://picsum.photos/100/103",
    votes: 1156,
  },
  {
    rank: 5,
    username: "PixelMaster",
    avatar: "https://picsum.photos/100/104",
    votes: 1089,
  },
  {
    rank: 6,
    username: "ArtCollector",
    avatar: "https://picsum.photos/100/105",
    votes: 987,
  },
  {
    rank: 7,
    username: "TokenMaster",
    avatar: "https://picsum.photos/100/106",
    votes: 876,
  },
  {
    rank: 8,
    username: "CryptoArtist",
    avatar: "https://picsum.photos/100/107",
    votes: 765,
  },
  {
    rank: 9,
    username: "BlockchainPro",
    avatar: "https://picsum.photos/100/108",
    votes: 654,
  },
  {
    rank: 10,
    username: "NFTWizard",
    avatar: "https://picsum.photos/100/109",
    votes: 543,
  },
];

const topPlayers = allPlayers.slice(0, 3);

const competingNFTs: CompetingNFT[] = Array(6).fill(null).map((_, i) => ({
  id: `nft-${i}`,
  image: `https://picsum.photos/400/${300 + i}`,
  owner: {
    username: `Artist${i + 1}`,
    avatar: `https://picsum.photos/100/${103 + i}`,
  },
  votes: Math.floor(Math.random() * 1000),
}));

export default function CompetitionDetailPage() {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh" pb="80px">
      <Box position="relative" w="100%" zIndex={0}>
        <Image
          src={backgroundImage.src}
          h="auto"
          objectFit="contain"
          position="absolute"
        />
        <Box position="relative" margin="24px 16px 29px 16px">
          <Box display="flex" alignItems="center">
            <Link href="/layerx/competitions">
              <Box>
                <BackArrowIcon />
              </Box>
            </Link>
            <Box width="100%" display="flex" justifyContent="center">
              <Text
                color="#33A7FF"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="800"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans"
              >
                Competition Details
              </Text>
            </Box>
          </Box>
        </Box>

        <Box margin="0px 16px 24px 16px" position="relative">
          {/* Competition Header */}
          <Box
            borderRadius="12px"
            border="1px solid rgba(255, 255, 255, 0.10)"
            background="#191916"
            overflow="hidden"
            mb={6}
          >
            <Image
              src="https://picsum.photos/800/400"
              alt="Competition Banner"
              width="100%"
              height="200px"
              objectFit="cover"
            />
            <Box p={4}>
              <Text
                color="white"
                fontSize="20px"
                fontWeight="800"
                mb={2}
                fontFamily="Plus Jakarta Sans"
              >
                Hawk Tush Challenge!
              </Text>
              <Box display="flex" justifyContent="space-between" mb={4}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Users size={16} className="text-[#33A7FF]" />
                  <Text color="white" fontSize="14px">15 Players</Text>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Vote size={16} className="text-[#33A7FF]" />
                  <Text color="white" fontSize="14px">16,283 Votes</Text>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderTop="1px solid rgba(255, 255, 255, 0.10)"
                pt={4}
              >
                <Text color="#8C8C8C" fontSize="14px">Time Left</Text>
                <Text color="#33A7FF" fontSize="14px">2 Days</Text>
              </Box>
            </Box>
          </Box>

          {/* Top Players */}
          <Box mb={6}>
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center"
              mb={4}
            >
              <Text
                color="white"
                fontSize="18px"
                fontWeight="700"
                fontFamily="Plus Jakarta Sans"
              >
                Top Players
              </Text>
              <Button
                type="text"
                onClick={() => setIsLeaderboardOpen(true)}
                className="text-[#33A7FF] hover:text-[#33A7FF]/80 flex items-center gap-1 p-0"
              >
                View All
                <ChevronRight size={16} />
              </Button>
            </Box>
            <Box className="space-y-3">
              {topPlayers.map((player) => (
                <Box
                  key={player.rank}
                  borderRadius="12px"
                  border="1px solid rgba(255, 255, 255, 0.10)"
                  background="#191916"
                  p={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center" gap={3}>
                    <Box position="relative">
                      <Avatar src={player.avatar} size={40} />
                      <Box
                        position="absolute"
                        bottom={-2}
                        right={-2}
                        bg={player.rank === 1 ? "gold" : player.rank === 2 ? "silver" : "#CD7F32"}
                        borderRadius="full"
                        w={5}
                        h={5}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Crown size={12} className="text-black" />
                      </Box>
                    </Box>
                    <Text color="white" fontSize="16px" fontWeight="600">
                      {player.username}
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Vote size={16} className="text-[#33A7FF]" />
                    <Text color="#33A7FF" fontSize="14px">
                      {player.votes.toLocaleString()}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Competing NFTs */}
          <Box>
            <Text
              color="white"
              fontSize="18px"
              fontWeight="700"
              mb={4}
              fontFamily="Plus Jakarta Sans"
            >
              Competing NFTs
            </Text>
            <Box className="space-y-4">
              {competingNFTs.map((nft) => (
                <Box
                  key={nft.id}
                  borderRadius="12px"
                  border="1px solid rgba(255, 255, 255, 0.10)"
                  background="#191916"
                  overflow="hidden"
                >
                  <Image
                    src={nft.image}
                    alt="NFT"
                    width="100%"
                    height="200px"
                    objectFit="cover"
                  />
                  <Box p={4}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={4}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={nft.owner.avatar} size={32} />
                        <Text color="white" fontSize="14px">
                          {nft.owner.username}
                        </Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Vote size={16} className="text-[#33A7FF]" />
                        <Text color="#33A7FF" fontSize="14px">
                          {nft.votes.toLocaleString()}
                        </Text>
                      </Box>
                    </Box>
                    <Button
                      className="w-full bg-transparent border-[#33A7FF] hover:bg-[#33A7FF] hover:text-black text-[#33A7FF] transition-all"
                    >
                      Vote
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Leaderboard Modal */}
      <Modal
        title={
          <Text
            color="white"
            fontSize="20px"
            fontWeight="800"
            fontFamily="Plus Jakarta Sans"
          >
            Competition Leaderboard
          </Text>
        }
        open={isLeaderboardOpen}
        onCancel={() => setIsLeaderboardOpen(false)}
        footer={null}
        className="leaderboard-modal"
      >
        <Box className="space-y-3 mt-4">
          {allPlayers.map((player) => (
            <Box
              key={player.rank}
              borderRadius="12px"
              border="1px solid rgba(255, 255, 255, 0.10)"
              background="#191916"
              p={4}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap={3}>
                <Box position="relative">
                  <Avatar src={player.avatar} size={40} />
                  {player.rank <= 3 && (
                    <Box
                      position="absolute"
                      bottom={-2}
                      right={-2}
                      bg={player.rank === 1 ? "gold" : player.rank === 2 ? "silver" : "#CD7F32"}
                      borderRadius="full"
                      w={5}
                      h={5}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Crown size={12} className="text-black" />
                    </Box>
                  )}
                </Box>
                <Box>
                  <Text color="white" fontSize="16px" fontWeight="600">
                    {player.username}
                  </Text>
                  <Text color="whiteAlpha.600" fontSize="12px">
                    Rank #{player.rank}
                  </Text>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Vote size={16} className="text-[#33A7FF]" />
                <Text color="#33A7FF" fontSize="14px">
                  {player.votes.toLocaleString()}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Modal>

      <style jsx global>{`
        .leaderboard-modal .ant-modal-content {
          background: #191916;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .leaderboard-modal .ant-modal-header {
          background: #191916;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .leaderboard-modal .ant-modal-close {
          color: rgba(255, 255, 255, 0.45);
        }
        .leaderboard-modal .ant-modal-close:hover {
          color: rgba(255, 255, 255, 0.75);
        }
      `}</style>
    </Box>
  );
}