'use client';

import {
  addNftToFavorite,
  addVoteToCompetingNfts,
  getCompetitionDetails,
  removeVoteFromCompetingNfts,
} from '@/api/layerxApiCalls/api';
import { AllNftsResponseData, CompetitionObject } from '@/types/type';
import { Box, Button, useToast, Text } from '@chakra-ui/react';
import { Avatar } from 'antd';
import { Heart, Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import VotesIcon from '@/icons/Votes';

interface NFTCardProps {
  nft: AllNftsResponseData;
  singleCompetitionPage?: boolean;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  setCompetitionDetails?: (competition: CompetitionObject) => void;
}

export default function NFTCard({
  nft,
  singleCompetitionPage,
  loading,
  setLoading,
  setCompetitionDetails,
}: NFTCardProps) {
  const toast = useToast();
  const params = useParams();
  const selectedCompetitionId = params.id; // Extracts the 'id' from the dynamic route

  const onAddToFavClick = async (nftDetail: AllNftsResponseData) => {
    try {
      const res = await addNftToFavorite(nftDetail?.identifier || '');
      if (res?.message === 'NFT liked') {
        const tokenId = location && location?.pathname?.split('/').pop();
        // tokenId && fetchData(tokenId);
        // setNftLiked(true);
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

  // const removeFromFavorites = async () => {
  //   try {
  //     const res = await addNftToFavorite(nftDetail?.identifier || '');
  //     if (res?.message === 'NFT unliked') {
  //       const tokenId = location && location?.pathname?.split('/').pop();
  //       tokenId && fetchData(tokenId);
  //       // setNftLiked(false);
  //     }
  //   } catch (error: unknown) {
  //     toast({
  //       title: 'Something went wrong while removing NFT from favorites',
  //       status: 'error',
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

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
      console.log('res', res);
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
    <div className="bg-black border border-[#33A7FF]/10 rounded-xl overflow-hidden">
      <div className="aspect-square w-full bg-black">
        <div className="w-full h-full flex items-center justify-center bg-black/100">
          <img
            src={nft.image_url}
            className="w-full h-full object-contain"
            alt={nft.name}
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-4 border-t border-[#33A7FF]/10 bg-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar src={nft.owner.profile_picture} className="h-8 w-8 ring-1 ring-[#33A7FF]/20" />
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
              <button
                onClick={() => onAddToFavClick(nft)}
                className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
      {singleCompetitionPage && (
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom="16px">
          <Button
            width="80%"
            borderTop={
              !nft?.has_logged_in_user_voted ? '1px solid #04D3FF' : 'rgba(255, 255, 255, 0.20)'
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
      )}
    </div>
  );
}
