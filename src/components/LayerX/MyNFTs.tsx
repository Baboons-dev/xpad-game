'use client';

import { useStore } from '@/store';
import { AllNftsResponse } from '@/types/type';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import NFTCard from './NFTCard';
import Pagination from '../common/Pagination';
import { useToast } from '@chakra-ui/react';
import { fetchMyNfts } from '@/api/layerxApiCalls/api';

export default function MyNFTs({ activeTab }: { activeTab: string }) {
  const toast = useToast();
  const [myNfts, setMyNfts] = useState<AllNftsResponse | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useStore((state) => state.user);

  const fetchNfts = async () => {
    setLoading(true);

    fetchMyNfts(currentPage, 9, user?.wallet_address)
      .then((res) => {
        setLoading(false);
        setMyNfts(res);
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: 'Error',
          description: "Something went wrong while fetching user's NFTs",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (user?.wallet_address && activeTab === '2') {
      fetchNfts();
    }
  }, [currentPage, activeTab]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">Please connect your wallet to view your NFTs</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center w-full min-h-[200px]">
          <Spin />
        </div>
      ) : myNfts?.results?.length ? (
        <>
          {myNfts?.results?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} setAllNfts={setMyNfts} fetchAllNfts={fetchNfts} />
          ))}
          {myNfts?.results?.length ? (
            <Pagination
              totalPages={myNfts?.total_pages ?? 1}
              page={currentPage}
              setPage={setCurrentPage}
            />
          ) : null}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-white/60">You don't have any NFTs yet</p>
        </div>
      )}
    </div>
  );
}
