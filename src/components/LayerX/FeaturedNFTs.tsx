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

  const updateFavoriteStatus = (nftIdentifier: string) => {
    setAllNfts((prevState) => {
      if (!prevState) return null; // If the state is null, return early

      const updatedResults = prevState.results.map((nft) =>
        nft.identifier === nftIdentifier ? { ...nft, is_favorite: true } : nft
      );

      return {
        ...prevState,
        results: updatedResults,
      };
    });
  };

  const updateUnFavoriteStatus = (nftIdentifier: string) => {
    setAllNfts((prevState) => {
      if (!prevState) return null; // If the state is null, return early

      const updatedResults = prevState.results.map((nft) =>
        nft.identifier === nftIdentifier ? { ...nft, is_favorite: false } : nft
      );

      return {
        ...prevState,
        results: updatedResults,
      };
    });
  };

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
      ) : allNfts && allNfts?.results?.length > 0 ? (
        <>
          {allNfts?.results?.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              favoriteNft={(nftIdentifier) => updateFavoriteStatus(nftIdentifier)}
              unFavoriteNft={(nftIdentifier) => updateUnFavoriteStatus(nftIdentifier)}
            />
          ))}
          {allNfts?.results?.length ? (
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
