'use client';

import { Box, Text, useToast } from '@chakra-ui/react';
import { useStore } from '@/store';
import { MyCompetitionResponse } from '@/types/type';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CompetitionCard } from './CompetitionCard';
import Pagination from '../common/Pagination';

export default function MyCompetitions() {
  const user = useStore((state) => state.user);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [myCompetitionList, setMyCompetitionList] =
    useState<MyCompetitionResponse | null>(null);

  const fetchMyCompetitions = async (
    walletAddress: string,
    page: number,
    recordsPerPage: number,
  ) => {
    try {
      setLoading(true);
      const endPoint = `https://api.layerx.baboons.tech/api/nfts/competitions/?wallet_address=${walletAddress}&?page=${page}&per_page=${recordsPerPage}`;
      const res = await axios.get(endPoint);
      setMyCompetitionList(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: 'Something went wrong while fetching competition',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    user?.wallet_address &&
      fetchMyCompetitions(user?.wallet_address, currentPage, 9);
  }, [user, currentPage]);

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
    <>
      {myCompetitionList && myCompetitionList?.data.length > 0 ? (
        <>
          {myCompetitionList?.data?.map((competition) => (
            <CompetitionCard key={competition.id} competition={competition} />
          ))}
          {myCompetitionList?.total_pages && (
            <Pagination
              totalPages={myCompetitionList?.total_pages ?? 1}
              page={currentPage}
              setPage={setCurrentPage}
            />
          )}
        </>
      ) : (
        <>
          <Box className="text-center py-8">
            <Text color="white" opacity={0.6}>
              You haven't participated in any competitions yet
            </Text>
          </Box>
        </>
      )}
    </>
  );
}
