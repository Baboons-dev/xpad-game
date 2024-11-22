'use client';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { AllNftsResponse, AllNftsResponseData } from '@/types/type';
import Pagination from '../common/Pagination';
import NFTCard from './NFTCard';
import { getAllNfts } from '@/api/apiCalls/nft';

export default function FeaturedNFTs({ activeTab }: { activeTab: string }) {
  const [allNfts, setAllNfts] = useState<AllNftsResponse | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllNfts = async (page: number, recordsPerPage: number) => {
    setLoading(true);
    try {
      const res = await getAllNfts(page, recordsPerPage);
      res && setAllNfts(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };
  console.log('activeTab', activeTab);

  useEffect(() => {
    if (activeTab === '1') {
      fetchAllNfts(1, 9);
    }
  }, [currentPage, activeTab]);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center w-full min-h-[200px]">
          <Spin />
        </div>
      ) : allNfts && allNfts?.data?.length > 0 ? (
        <>
          {allNfts?.data?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} setAllNfts={setAllNfts} fetchAllNfts={fetchAllNfts} />
          ))}
          {allNfts?.data?.length ? (
            <Pagination
              totalPages={allNfts?.total_pages}
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
