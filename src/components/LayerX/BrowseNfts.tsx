import React, { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
import { Button, useToast } from '@chakra-ui/react';
import { AllNftsResponse } from '@/types/type';
import { addNftToCompetition, fetchMyNfts } from '@/api/layerxApiCalls/api';
import { useStore } from '@/store';
import Pagination from '@/components/common/Pagination';

interface Props {
  competitionId: number;
  onSuccess: () => void;
}

export default function BrowseNfts({ competitionId, onSuccess }: Props) {
  const toast = useToast();
  const user = useStore((state) => state.user);
  const [myNfts, setMyNfts] = useState<AllNftsResponse | null>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNfts = async () => {
    setLoading(true);

    fetchMyNfts(page, 8, user?.wallet_address)
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
    if (user?.wallet_address) {
      fetchNfts();
    }
  }, [page]);

  const onSelect = (selectedNft: string) => {
    setLoading(true);

    addNftToCompetition(competitionId, selectedNft)
      .then(() => {
        setLoading(false);
        toast({
          title: 'Success!',
          description: 'You have participated in the competition',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        onSuccess();
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: 'Error!',
          description: 'Something went wrong while participating. Please try again',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      });
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">Please connect your wallet to view your NFTs</p>
      </div>
    );
  }

  if (loading) {
    return (
      <Flex style={{ padding: 32 }} justify={'center'} align={'center'}>
        <Spin />
      </Flex>
    );
  }

  return (
    <>
      <Flex vertical style={{ marginTop: 12 }}>
        <Flex gap={8}>
          {myNfts?.data?.map((nft) => (
            <Flex key={nft.id} flex={1 / 2}>
              <div
                onClick={() => setSelectedNft(nft.identifier)}
                style={{
                  position: 'relative',
                }}
                className="aspect-square w-full bg-black rounded-lg h-full flex items-center justify-center bg-black/100 nft-card">
                <img
                  src={nft.image_url}
                  className="object-contain image"
                  alt={nft.name}
                  style={{
                    height: '98%',
                    width: '98%',
                  }}
                  loading="lazy"
                />

                <span style={{ display: 'contents' }}>
                  <Button
                    className="button"
                    border="1px solid #33A7FF"
                    color="white"
                    backgroundColor="#33A7FF"
                    fontSize="16px"
                    position="absolute"
                    fontWeight="600"
                    _hover={{
                      color: '#33A7FF',
                      bg: '#000',
                    }}
                    onClick={() => onSelect(nft.identifier)}>
                    Select
                  </Button>
                </span>
              </div>
            </Flex>
          ))}
        </Flex>
        {!!myNfts?.data?.length && (
          <Pagination totalPages={myNfts?.total_pages ?? 1} page={page} setPage={setPage} />
        )}
      </Flex>
      <style jsx global>{`
        .nft-card .button {
          display: none;
        }

        .nft-card:hover .button {
          display: block;
        }

        .nft-card:hover .image {
          filter: blur(2px);
        }

        .nft-card:hover {
          border: 1px solid #33a7ff;
        }
      `}</style>
    </>
  );
}
