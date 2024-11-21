import { CompetitionObject } from '@/types/type';
import { Avatar, Spin } from 'antd';
import { Vote } from 'lucide-react';
import { Box, Text, Image, useToast, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  addVoteToCompetingNfts,
  getCompetitionDetails,
  removeVoteFromCompetingNfts,
} from '@/api/layerxApiCalls/api';
import { useStore } from '@/store';
import NFTCard from './NFTCard';

interface CompetingNftsProps {
  competitionDetails: CompetitionObject;
  setCompetitionDetails: (competition: CompetitionObject) => void;
}

export default function CompetingNfts(props: CompetingNftsProps) {
  const { competitionDetails, setCompetitionDetails } = props;
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const accessToken = useStore((state) => state.accessToken);

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
            fontFamily="Plus Jakarta Sans">
            Competing NFTs
          </Text>
          <Box className="space-y-4">
            {competitionDetails?.nfts &&
              competitionDetails?.nfts.map((nft, i) => (
                <NFTCard
                  key={nft.id}
                  nft={nft}
                  singleCompetitionPage={true}
                  loading={loading}
                  setLoading={setLoading}
                  setCompetitionDetails={setCompetitionDetails}
                />
              ))}
          </Box>
        </Box>
      )}
    </>
  );
}
