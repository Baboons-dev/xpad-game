"use client";

import { Box, Image, Text, useToast } from "@chakra-ui/react";
import backgroundImage from "../../../../assets/background.png";
import { Avatar, Button, Modal } from "antd";
import Link from "next/link";
import BackArrowIcon from "@/icons/ArrowBack";
import { ChevronRight, Crown, Users, Vote } from "lucide-react";
import { useEffect, useState } from "react";
import { CompetitionObject, CompetitionResponse } from "@/types/type";
import axios from "axios";
import { useParams } from "next/navigation";
import { isAfter, isBefore, parseISO } from "date-fns";
import Clock from "@/icons/Clock";
import Countdown from "@/components/common/Countdown";
import TopPlayers from "@/components/LayerX/TopPlayers";
import CompetingNfts from "@/components/LayerX/CompetingNfts";

interface TimeTextProps {
  text: string;
}

export default function CompetitionDetailPage() {
  const params = useParams();
  const id = params.id; // Extracts the 'id' from the dynamic route
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [competitionDetails, setCompetitionDetails] =
    useState<CompetitionObject>();

  console.log("id", id);

  const fetchCompetitionById = async (competitionId: string) => {
    try {
      setLoading(true);
      const res = await axios.get<CompetitionObject>(
        `https://api.layerx.baboons.tech/api/nfts/competitions/${competitionId}`,
      );
      console.log("ress", res);
      res?.data && setCompetitionDetails(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Something went wrong while fetching competition details",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    id && fetchCompetitionById(id as string);
  }, []);

  console.log("competitionDetails", competitionDetails);

  const TimeText = (props: TimeTextProps) => {
    const { text } = props;
    return (
      <Text
        color="#ffff"
        fontSize="14px"
        fontFamily="Plus Jakarta Sans"
        fontStyle="normal"
        fontWeight="600"
        lineHeight="normal"
      >
        {text}
      </Text>
    );
  };

  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      pb="80px"
    >
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
          <Box
            borderRadius="12px"
            border="1px solid rgba(255, 255, 255, 0.10)"
            background="#191916"
            overflow="hidden"
            mb={6}
          >
            <Image
              src={competitionDetails?.competition_image}
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
                {competitionDetails?.competition_name}
              </Text>
              <Box display="flex" justifyContent="space-between" mb={4}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Users size={16} className="text-[#33A7FF]" />
                  <Text color="white" fontSize="14px">
                    {competitionDetails?.total_entries}
                  </Text>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Vote size={16} className="text-[#33A7FF]" />
                  <Text color="white" fontSize="14px">
                    {competitionDetails?.total_votes
                      ? competitionDetails?.total_votes
                      : 0}
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
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  gap="8px"
                >
                  <Clock color="#96BCAD" w="24px" h="24px" />
                  {competitionDetails?.participation_starts &&
                  isAfter(
                    parseISO(competitionDetails?.participation_starts),
                    new Date(),
                  ) ? (
                    <TimeText text={"Opens in"} />
                  ) : competitionDetails?.participation_starts &&
                    isAfter(
                      new Date(),
                      parseISO(competitionDetails?.participation_starts),
                    ) &&
                    isBefore(
                      new Date(),
                      parseISO(competitionDetails?.voting_starts),
                    ) ? (
                    <TimeText text={"Entries close in"} />
                  ) : competitionDetails?.voting_starts &&
                    isAfter(
                      new Date(),
                      parseISO(competitionDetails?.voting_starts),
                    ) &&
                    isBefore(
                      new Date(),
                      parseISO(competitionDetails?.voting_ends),
                    ) ? (
                    <TimeText text={"Voting ends in"} />
                  ) : competitionDetails?.voting_ends &&
                    isAfter(
                      new Date(),
                      parseISO(competitionDetails?.voting_ends),
                    ) ? (
                    <TimeText text={"Closed"} />
                  ) : (
                    ""
                  )}
                </Box>
                <Box>
                  {competitionDetails?.participation_starts &&
                  isAfter(
                    parseISO(competitionDetails?.participation_starts),
                    new Date(),
                  ) ? (
                    <Countdown
                      endDateString={competitionDetails?.participation_starts}
                      color=" #FFF"
                      fontSize="13px"
                      fontWeight={600}
                    />
                  ) : competitionDetails?.participation_starts &&
                    isAfter(
                      new Date(),
                      parseISO(competitionDetails?.participation_starts),
                    ) &&
                    isBefore(
                      new Date(),
                      parseISO(competitionDetails?.voting_starts),
                    ) ? (
                    <Countdown
                      endDateString={competitionDetails?.voting_starts}
                      color=" #FFF"
                      fontSize="13px"
                      fontWeight={600}
                    />
                  ) : competitionDetails?.voting_starts &&
                    isAfter(
                      new Date(),
                      parseISO(competitionDetails?.voting_starts),
                    ) &&
                    isBefore(
                      new Date(),
                      parseISO(competitionDetails?.voting_ends),
                    ) ? (
                    <Countdown
                      endDateString={competitionDetails?.voting_ends}
                      color=" #FFF"
                      fontSize="13px"
                      fontWeight={600}
                    />
                  ) : (
                    competitionDetails?.voting_ends &&
                    isAfter(
                      new Date(),
                      parseISO(competitionDetails?.voting_ends),
                    ) &&
                    ""
                  )}
                </Box>
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
                // onClick={() => setIsLeaderboardOpen(true)}
                className="text-[#33A7FF] hover:text-[#33A7FF]/80 flex items-center gap-1 p-0"
              >
                {/* View All */}
                <ChevronRight size={16} />
              </Button>
            </Box>
            <Box className="space-y-3">
              {competitionDetails?.top_nfts && (
                <>
                  {isAfter(
                    parseISO(competitionDetails?.participation_starts),
                    new Date(),
                  ) ? (
                    <TopPlayers
                      topNfts={competitionDetails?.top_nfts}
                      loading={loading}
                    />
                  ) : isAfter(
                      new Date(),
                      parseISO(competitionDetails?.participation_starts),
                    ) &&
                    isBefore(
                      new Date(),
                      parseISO(competitionDetails?.voting_starts),
                    ) ? null : isAfter(
                      new Date(),
                      parseISO(competitionDetails?.voting_starts),
                    ) &&
                    isBefore(
                      new Date(),
                      parseISO(competitionDetails?.voting_ends),
                    ) ? (
                    <TopPlayers
                      topNfts={competitionDetails?.top_nfts}
                      loading={loading}
                    />
                  ) : (
                    isAfter(
                      new Date(),
                      parseISO(competitionDetails?.voting_ends),
                    ) && (
                      <TopPlayers
                        topNfts={competitionDetails?.top_nfts}
                        loading={loading}
                      />
                    )
                  )}
                </>
              )}
            </Box>
          </Box>

          {/* Competing NFTs */}
          {competitionDetails && (
            <CompetingNfts competitionDetails={competitionDetails} />
          )}
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
        // open={isLeaderboardOpen}
        // onCancel={() => setIsLeaderboardOpen(false)}
        footer={null}
        className="leaderboard-modal"
      >
        <Box className="space-y-3 mt-4">
          {/* {allPlayers.map((player) => (
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
                      bg={
                        player.rank === 1
                          ? "gold"
                          : player.rank === 2
                          ? "silver"
                          : "#CD7F32"
                      }
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
          ))} */}
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
