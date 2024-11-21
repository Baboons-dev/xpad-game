'use client';

import { AllNftsResponseData } from '@/types/type';
import { Avatar } from 'antd';
import { Heart, Share2 } from 'lucide-react';

interface NFTCardProps {
  nft: AllNftsResponseData;
}

export default function NFTCard({ nft }: NFTCardProps) {
  // const onAddToFavClick = async () => {
  //   try {
  //     const res = await addNftToFavorite(nftDetail?.identifier || '');
  //     if (res?.message === 'NFT liked') {
  //       const tokenId = location && location?.pathname?.split('/').pop();
  //       tokenId && fetchData(tokenId);
  //       // setNftLiked(true);
  //     }
  //   } catch (error: unknown) {
  //     toast({
  //       title: 'Something went wrong while adding NFT to favorites',
  //       status: 'error',
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

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

          <div className="flex items-center space-x-4">
            <button className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
