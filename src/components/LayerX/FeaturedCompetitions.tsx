"use client";

import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { Users, Vote } from "lucide-react";
// import { Button } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { isAfter, isBefore, parseISO } from "date-fns";
import { CompetitionObject, CompetitionResponse } from "@/types/type";
import Countdown from "../common/Countdown";
import BellIcon from "@/icons/Bell";
import Pagination from "../common/Pagination";

// const competitions: CompetitionCard[] = [
//   {
//     id: "1",
//     title: "Best NFT Design 2024",
//     image: "https://picsum.photos/400/300",
//     players: 0,
//     votes: 0,
//     status: "upcoming",
//     timeLeft: "23h • 52m • 36s",
//   },
//   {
//     id: "2",
//     title: "Digital Art Challenge",
//     image: "https://picsum.photos/400/301",
//     players: 15,
//     votes: 0,
//     status: "active",
//     timeLeft: "3 Days",
//   },
//   {
//     id: "3",
//     title: "Crypto Punk Revival",
//     image: "https://picsum.photos/400/302",
//     players: 20,
//     votes: 16283,
//     status: "active",
//     timeLeft: "23h • 52m • 36s",
//   },
// ];

function CompetitionCard({ competition }: { competition: CompetitionObject }) {
  console.log("competition", competition);

  return (
    <Box
      borderRadius="12px"
      border="1px solid rgba(255, 255, 255, 0.10)"
      background="#191916"
      overflow="hidden"
    >
      <Box position="relative">
        <img
          src={competition?.competition_image}
          alt={competition?.competition_name}
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
          {competition.competition_name}
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
              {competition?.total_entries} Players
            </Text>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Vote size={16} className="text-[#33A7FF]" />
            <Text color="white" fontSize="14px" fontFamily="Plus Jakarta Sans">
              {competition?.total_votes ? competition?.total_votes : 0} Votes
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
            {competition &&
            isAfter(parseISO(competition?.participation_starts), new Date())
              ? "Opens in " // Announced Stage (before participation starts)
              : isAfter(
                  new Date(),
                  parseISO(competition?.participation_starts),
                ) && isBefore(new Date(), parseISO(competition?.voting_starts))
              ? "Entries close in" // Participation Phase (after participation starts and before voting starts)
              : isAfter(new Date(), parseISO(competition?.voting_starts)) &&
                isBefore(new Date(), parseISO(competition?.voting_ends))
              ? "Voting ends in" // Voting Phase (after voting starts and before voting ends)
              : isAfter(new Date(), parseISO(competition?.voting_ends))
              ? "Closed" // Competition Closed Stage (after voting ends)
              : ""}
          </Text>
          <Text color="#33A7FF" fontSize="14px" fontFamily="Plus Jakarta Sans">
            {isAfter(
              parseISO(competition?.participation_starts),
              new Date(),
            ) ? (
              <Countdown endDateString={competition?.participation_starts} />
            ) : isAfter(
                new Date(),
                parseISO(competition?.participation_starts),
              ) &&
              isBefore(new Date(), parseISO(competition?.voting_starts)) ? (
              <Countdown endDateString={competition?.voting_starts} />
            ) : isAfter(new Date(), parseISO(competition?.voting_starts)) &&
              isBefore(new Date(), parseISO(competition?.voting_ends)) ? (
              <Countdown endDateString={competition?.voting_ends} />
            ) : (
              isAfter(new Date(), parseISO(competition?.voting_ends)) && ""
            )}
          </Text>
        </Box>

        {isAfter(parseISO(competition?.participation_starts), new Date()) ? (
          <Box display="flex" flexDirection="row" gap="12px">
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={["16px", "16px", "16px"]}
              fontWeight="600"
              _hover={{
                color: "black",
                bg: "#fff",
              }}
              // onClick={() => onCompetitionClick(competition)}
            >
              View
            </Button>
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={["16px", "16px", "16px"]}
              fontWeight="600"
              _hover={{
                color: "black",
                bg: "#fff",
              }}
              // onClick={(event) => {
              //   competition.is_subscribed
              //     ? unSubscribeCompetition(competition)
              //     : onGetNotifiedClick(competition);
              //   event.stopPropagation();
              // }}
            >
              {competition.is_subscribed ? "Unsubscribe" : " Get notified"}
            </Button>
          </Box>
        ) : isAfter(new Date(), parseISO(competition?.participation_starts)) &&
          isBefore(new Date(), parseISO(competition?.voting_starts)) ? (
          <Box display="flex" flexDirection="row" gap="12px">
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={["16px", "16px", "16px"]}
              fontWeight="600"
              _hover={{
                color: "black",
                bg: "#fff",
              }}
              // onClick={() => onParticipateClick(competition)}
            >
              Participate
            </Button>
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={["16px", "16px", "16px"]}
              fontWeight="600"
              _hover={{
                color: "black",
                bg: "#fff",
              }}
              // onClick={() => onCompetitionClick(competition)}
            >
              Open
            </Button>
          </Box>
        ) : isAfter(new Date(), parseISO(competition?.voting_starts)) &&
          isBefore(new Date(), parseISO(competition?.voting_ends)) ? (
          <Box>
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={["16px", "16px", "16px"]}
              fontWeight="600"
              _hover={{
                color: "black",
                bg: "#fff",
              }}
              // onClick={() => onCompetitionClick(competition)}
            >
              Open & Vote
            </Button>
          </Box>
        ) : (
          isAfter(new Date(), parseISO(competition?.voting_ends)) && (
            <Box>
              <Button
                width="100%"
                marginTop="1rem"
                border="1px solid #33A7FF"
                color="#33A7FF"
                backgroundColor="transparent"
                fontSize={["16px", "16px", "16px"]}
                fontWeight="600"
                _hover={{
                  color: "black",
                  bg: "#fff",
                }}
                // onClick={() => onCompetitionClick(competition)}
              >
                View
              </Button>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}

export default function FeaturedCompetitions() {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [competitionList, setCompetitionList] =
    useState<CompetitionResponse | null>();
  const [loading, setLoading] = useState(false);

  const fetchAllCompetitions = async (page: number, recordsPerPage: number) => {
    try {
      setLoading(true);
      const res = await axios.get<CompetitionResponse>(
        `https://api.layerx.baboons.tech/api/nfts/competitions/?page=${page}&per_page=${recordsPerPage}`,
      );
      setCompetitionList(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Something went wrong while fetching competition",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchAllCompetitions(currentPage, 9);
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onPaginationitemClick = (pageToFetch: number) => {
    setCurrentPage(pageToFetch);
  };

  const handleNextPage = () => {
    if (
      competitionList?.total_pages &&
      currentPage < competitionList?.total_pages
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box className="space-y-4 pb-20">
      {competitionList &&
        competitionList?.data?.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      {competitionList?.total_pages && (
        <Pagination
          handlePreviousPage={handlePrevPage}
          totalPages={competitionList?.total_pages}
          currentPage={currentPage}
          onPaginationitemClick={onPaginationitemClick}
          handleNextPage={handleNextPage}
        />
      )}
    </Box>
  );
}
