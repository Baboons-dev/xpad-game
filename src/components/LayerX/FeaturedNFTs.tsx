'use client';

import { Heart, Share2 } from 'lucide-react';
import axios from 'axios';
import { Avatar, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { AllNftsResponse, AllNftsResponseData } from '@/types/type';
import Pagination from '../common/Pagination';
import NFTCard from './NFTCard';

export default function FeaturedNFTs() {
  const [allNfts, setAllNfts] = useState<AllNftsResponse | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllNfts = async (page: number, recordsPerPage: number) => {
    setLoading(true);
    try {
      const res = await axios.get<AllNftsResponse>(
        `https://api.layerx.baboons.tech/api/nfts/?page=${page}&per_page=${recordsPerPage}`
      );
      res && setAllNfts(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNfts(1, 9);
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center w-full min-h-[200px]">
          <Spin />
        </div>
      ) : allNfts && allNfts?.data?.length > 0 ? (
        <>
          {allNfts?.data?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
          {allNfts?.data?.length ? (
            <Pagination
              totalPages={allNfts?.total_pages ?? 1}
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
