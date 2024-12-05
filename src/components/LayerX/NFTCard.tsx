'use client';

import {
  addNftToFavorite,
  addVoteToCompetingNfts,
  getCompetitionDetails,
  getNftDetails,
  removeVoteFromCompetingNfts,
} from '@/api/layerxApiCalls/api';
import { AllNftsResponseData, CompetitionObject } from '@/types/type';
import { Box, Button, useToast, Text } from '@chakra-ui/react';
import { Avatar, Divider, Spin } from 'antd';
import { Heart, Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import VotesIcon from '@/icons/Votes';
import HeartFilledIcon from '@/icons/HeartFilledIcon';
import HeartIcon from '@/icons/HeartcIcon';
import { useState } from 'react';
import { isAfter, isBefore, parseISO } from 'date-fns';
import { useStore } from '@/store';

interface NFTCardProps {
  nft: AllNftsResponseData;
  singleCompetitionPage?: boolean;
  loading?: boolean;
  votingStarts?: string;
  votingEnds?: string;
  setLoading?: (loading: boolean) => void;
  setCompetitionDetails?: (competition: CompetitionObject) => void;
  favoriteNft: (nftIdentifier: string) => void;
  unFavoriteNft: (nftIdentifier: string) => void;
}

export default function NFTCard({
  nft,
  singleCompetitionPage,
  loading,
  setLoading,
  setCompetitionDetails,
  favoriteNft,
  unFavoriteNft,
  votingEnds,
  votingStarts,
}: NFTCardProps) {
  const toast = useToast();
  const params = useParams();
  const selectedCompetitionId = params.id; // Extracts the 'id' from the dynamic

  const onAddToFavClick = async (nftDetail: AllNftsResponseData) => {
    try {
      const res = await addNftToFavorite(nftDetail?.identifier || '');
      if (res?.message) {
        favoriteNft(nftDetail.identifier);
      }
    } catch (error: unknown) {
      toast({
        title: 'Something went wrong while adding NFT to favorites',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeFromFavorites = async (nftDetail: AllNftsResponseData) => {
    try {
      const res = await addNftToFavorite(nftDetail?.identifier || '');
      if (res?.message) {
        unFavoriteNft(nftDetail.identifier);
      }
    } catch (error: unknown) {
      toast({
        title: 'Something went wrong while removing NFT from favorites',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onVoteNowClick = async (nft: AllNftsResponseData) => {
    const data = {
      token_id: nft?.identifier,
    };
    if (selectedCompetitionId) {
      if (!nft?.has_logged_in_user_voted) {
        try {
          const res = await addVoteToCompetingNfts(Number(selectedCompetitionId), data);
          res?.message && fetchCompetitionById(Number(selectedCompetitionId));
          toast({
            title: 'Vote added',
            description: 'Vote added to competition',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } catch (error: any) {
          toast({
            title: 'Error',
            description: 'Something went wrong while adding vote to competition. Please try again',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        try {
          const res =
            selectedCompetitionId &&
            ((await removeVoteFromCompetingNfts(Number(selectedCompetitionId), data)) as any);
          res?.message && fetchCompetitionById(Number(selectedCompetitionId));
          toast({
            title: 'Vote removed',
            description: 'Vote removed from competition',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } catch (error: any) {
          toast({
            title: 'Error',
            description: 'Something went wrong while removing vote from competition',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  const fetchCompetitionById = async (competitionId: number) => {
    try {
      setLoading && setLoading(true);
      const res = await getCompetitionDetails(competitionId);
      setCompetitionDetails && setCompetitionDetails(res);
      //   setCompetitionDetails(res);
      setLoading && setLoading(false);
    } catch (error: any) {
      setLoading && setLoading(false);
      toast({
        title: 'Something went wrong while fetching competition details',
        description: error.message,
        status: 'error',
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
        <div className="bg-[#000000]/100 border border-[#33A7FF]/30 rounded-xl overflow-hidden">
          <div className="aspect-square w-full">
            <div className="w-full h-full py-2 flex items-center justify-center ">
              <img
                src={nft.image_url}
                className="w-full h-full object-contain"
                alt={nft.name}
                loading="lazy"
              />
            </div>
          </div>

          <div className="p-4 border-t border-[#33A7FF]/10 bg-[#FFFFFF]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar
                  src={nft.owner.profile_picture}
                  className="h-8 w-8 ring-1 ring-[#33A7FF]/20"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{nft.name}</span>
                  <span className="text-xs text-[#33A7FF]">@{nft.owner.twitter_username}</span>
                </div>
              </div>

              {singleCompetitionPage ? (
                <Box display="flex" alignItems="center" gap={2}>
                  <VotesIcon color="#33A7FF" />
                  <Text color="#33A7FF" fontSize="14px">
                    {nft.votes && nft.votes.toLocaleString()}
                  </Text>
                </Box>
              ) : (
                <div className="flex items-center space-x-4">
                  <button className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
                    {nft.is_favorite ? (
                      <HeartFilledIcon
                        onClick={() => removeFromFavorites(nft)}
                        color="#D9D9D9"
                        width="20px"
                        height="20px"
                      />
                    ) : (
                      <HeartIcon onClick={() => onAddToFavClick(nft)} color="red" />
                    )}
                    {/* {nft?.is_favorite ? (
                      <HeartFilledIcon
                        onClick={() => removeFromFavorites(nft)}
                        color="#D9D9D9"
                        width="20px"
                        height="20px"
                      />
                    ) : (
                      <HeartIcon onClick={() => onAddToFavClick(nft)} color="red" />
                    )} */}
                  </button>
                  {/* <button className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button> */}
                </div>
              )}
            </div>
          </div>
          {singleCompetitionPage &&
            votingStarts &&
            votingEnds &&
            isAfter(new Date(), parseISO(votingStarts)) &&
            isBefore(new Date(), parseISO(votingEnds)) && (
              <>
                <Box display="flex" justifyContent="center" alignItems="center" marginBottom="16px">
                  <Button
                    width="80%"
                    borderTop={
                      !nft?.has_logged_in_user_voted
                        ? '1px solid #04D3FF'
                        : 'rgba(255, 255, 255, 0.20)'
                    }
                    padding="16px 32px"
                    color="#FFF"
                    backgroundColor={
                      !nft?.has_logged_in_user_voted ? '#118BCF' : 'rgba(255, 255, 255, 0.05)'
                    }
                    h={['44px']}
                    _hover={{
                      color: 'white',
                      bg: !nft?.has_logged_in_user_voted ? '#43BDD7' : 'rgba(255, 255, 255, 0.20)',
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
                    leftIcon={<VotesIcon color={'#FFFFFF'} />}>
                    {nft?.has_logged_in_user_voted ? 'Unvote' : 'Vote'}
                  </Button>
                </Box>
              </>
            )}
        </div>
      )}
    </>
  );
}
