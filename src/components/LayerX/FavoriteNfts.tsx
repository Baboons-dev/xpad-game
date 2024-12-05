'use client';

import { useStore } from '@/store';
import { AllNftsResponse } from '@/types/type';
import { Avatar, Spin } from 'antd';
import { useEffect, useState } from 'react';
import NFTCard from './NFTCard';
import Pagination from '../common/Pagination';
import { useToast } from '@chakra-ui/react';
import { addNftToFavorite, fetchMyNfts, getMyFavoriteNfts } from '@/api/layerxApiCalls/api';
import HeartFilledIcon from '@/icons/HeartFilledIcon';
import { HeartIcon } from 'lucide-react';

export default function FavoriteNfts({ activeTab }: { activeTab: string }) {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [favNfts, setFavNfts] = useState<AllFavNftsResponse | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const user = useStore((state) => state.user);

  const onAddToFavClick = async (nftDetail: FavoriteNftResponse) => {
    try {
      const res = await addNftToFavorite(nftDetail?.identifier || '');
      if (res?.message) {
        if (user?.wallet_address) {
          fetchMyFavoriteNfts(user?.wallet_address, currentPage, 9);
        }
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

  const removeFromFavorites = async (nftDetail: FavoriteNftResponse) => {
    try {
      const res = await addNftToFavorite(nftDetail?.identifier || '');
      if (res?.message) {
        if (user?.wallet_address) {
          fetchMyFavoriteNfts(user?.wallet_address, currentPage, 9);
        }
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

  const fetchMyFavoriteNfts = async (walletAddress: string, page: number, perPage: number) => {
    try {
      setLoading(true);
      const res = await getMyFavoriteNfts(walletAddress, page, perPage);
      res && setFavNfts(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: 'Something went wrong while fetching favorite NFTs',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    if (user?.wallet_address && activeTab === '3') {
      fetchMyFavoriteNfts(user?.wallet_address, currentPage, 9);
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
      ) : favNfts?.results?.length ? (
        <>
          {favNfts?.results?.map((nft) => (
            <div className="bg-[#000000]/100 border border-[#33A7FF]/30 rounded-xl overflow-hidden">
              <div className="aspect-square w-full">
                <div className="w-full h-full py-2 flex items-center justify-center">
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

                  <div className="flex items-center space-x-4">
                    <button className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
                      {nft?.is_favorite ? (
                        <HeartFilledIcon
                          onClick={() => removeFromFavorites(nft)}
                          color="#f91880"
                          width="24px"
                          height="24px"
                        />
                      ) : (
                        <HeartIcon onClick={() => onAddToFavClick(nft)} color="#f91880" />
                      )}
                    </button>
                    {/* <button className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {favNfts?.results.length ? (
            <Pagination
              totalPages={favNfts?.total_pages ?? 1}
              page={currentPage}
              setPage={setCurrentPage}
            />
          ) : null}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-white/60">You don't have any Favorite NFTs yet</p>
        </div>
      )}
    </div>
  );
}
