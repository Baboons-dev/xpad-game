'use client';

import { Heart, Share2 } from 'lucide-react';
import axios from 'axios';
import { Avatar, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { AllNftsResponse, AllNftsResponseData } from '@/types/type';
import Pagination from '../common/Pagination';
import NFTCard from './NFTCard';

// interface NftCardProps {
//   nft: AllNftsResponseData;
// }

// function NFTCard({ nft }: NftCardProps) {
//   return (
//     <div className="bg-black border border-[#33A7FF]/10 rounded-xl overflow-hidden">
//       <div className="aspect-square w-full bg-black">
//         <div className="w-full h-full flex items-center justify-center bg-black/100">
//           <img
//             src={nft.image_url}
//             className="w-full h-full object-contain"
//             alt={nft.name}
//             loading="lazy"
//           />
//         </div>
//       </div>

//       <div className="p-4 border-t border-[#33A7FF]/10 bg-black">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Avatar src={nft.owner.profile_picture} className="h-8 w-8 ring-1 ring-[#33A7FF]/20" />
//             <div className="flex flex-col">
//               <span className="text-sm font-medium text-white">{nft.name}</span>
//               <span className="text-xs text-[#33A7FF]">@{nft.owner.twitter_username}</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
//               <Heart className="h-5 w-5" />
//             </button>
//             <button className="text-[#33A7FF]/60 hover:text-[#33A7FF] transition-colors">
//               <Share2 className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
