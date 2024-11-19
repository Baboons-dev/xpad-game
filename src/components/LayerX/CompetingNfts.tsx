import { CompetitionObject } from "@/types/type";
import { Avatar, Spin } from "antd";
import { Vote } from "lucide-react";
import { Box, Text, Image, useToast, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  addVoteToCompetingNfts,
  getCompetitionDetails,
  removeVoteFromCompetingNfts,
} from "@/api/layerxApiCalls/api";
import VotesIcon from "@/icons/Votes";
import { useStore } from "@/store";

interface CompetingNftsProps {
  competitionDetails: CompetitionObject;
  setCompetitionDetails: (competition: CompetitionObject) => void;
}

export default function CompetingNfts(props: CompetingNftsProps) {
  const { competitionDetails, setCompetitionDetails } = props;
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const params = useParams();
  const selectedCompetitionId = params.id; // Extracts the 'id' from the dynamic route
  const accessToken = useStore((state) => state.accessToken);

  const onVoteNowClick = async (nft: AllNftsResponseData) => {
    const data = {
      token_id: nft?.identifier,
    };
    if (selectedCompetitionId) {
      if (!nft?.has_logged_in_user_voted) {
        try {
          const res = await addVoteToCompetingNfts(
            Number(selectedCompetitionId),
            data,
          );
          res?.message && fetchCompetitionById(Number(selectedCompetitionId));
          toast({
            title: "Vote added",
            description: "Vote added to competition",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (error: any) {
          toast({
            title: "Error",
            description:
              "Something went wrong while adding vote to competition. Please try again",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        try {
          const res =
            selectedCompetitionId &&
            ((await removeVoteFromCompetingNfts(
              Number(selectedCompetitionId),
              data,
            )) as any);
          res?.message && fetchCompetitionById(Number(selectedCompetitionId));
          toast({
            title: "Vote removed",
            description: "Vote removed from competition",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (error: any) {
          toast({
            title: "Error",
            description:
              "Something went wrong while removing vote from competition",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  const fetchCompetitionById = async (competitionId: number) => {
    try {
      setLoading(true);
      const res = await getCompetitionDetails(competitionId);
      console.log("res", res);
      setCompetitionDetails(res);
      //   setCompetitionDetails(res);
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

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
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
            {competitionDetails?.nfts &&
              competitionDetails?.nfts.map((nft, i) => (
                <Box
                  key={i}
                  borderRadius="12px"
                  border="1px solid rgba(255, 255, 255, 0.10)"
                  background="#191916"
                  overflow="hidden"
                >
                  <Image
                    src={nft.display_image_url}
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
                        <Avatar src={nft.owner.profile_picture} size={32} />
                        <Text color="white" fontSize="14px">
                          {nft.owner.username}
                        </Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Vote size={16} className="text-[#33A7FF]" />
                        <Text color="#33A7FF" fontSize="14px">
                          {nft.votes && nft.votes.toLocaleString()}
                        </Text>
                      </Box>
                    </Box>
                    <Button
                      width="100%"
                      borderRadius="15px"
                      borderTop={
                        !nft?.has_logged_in_user_voted
                          ? "1px solid #04D3FF"
                          : "rgba(255, 255, 255, 0.20)"
                      }
                      padding="16px 32px"
                      color="#FFF"
                      backgroundColor={
                        !nft?.has_logged_in_user_voted
                          ? "#118BCF"
                          : "rgba(255, 255, 255, 0.05)"
                      }
                      h={["44px"]}
                      _hover={{
                        color: "white",
                        bg: !nft?.has_logged_in_user_voted
                          ? "#43BDD7"
                          : "rgba(255, 255, 255, 0.20)",
                      }}
                      fontFamily="Plus Jakarta Sans"
                      fontSize="16px"
                      fontStyle="normal"
                      fontWeight="600"
                      lineHeight="normal"
                      onClick={(event) => {
                        event?.stopPropagation();
                        onVoteNowClick(nft);
                      }}
                      leftIcon={<VotesIcon color={"#FFFFFF"} />}
                    >
                      {nft?.has_logged_in_user_voted ? "Unvote" : "Vote"}
                    </Button>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </>
  );
}
