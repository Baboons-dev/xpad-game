'use client';

import { Box, Image, Text, Divider } from '@chakra-ui/react';
import backgroundImage from '../../assets/background.png';
import MintBannerImage from '../../assets/MintBanner.png';
import Link from 'next/link';
import { NftIcon, CompetitionIcon, MintIcon } from '@/components/LayerX/icons';
import MintContent from '@/components/LayerX/MintContent';
import HomePageOptions from '@/components/LayerX/HomePageOptions';
import HomePageOption from '@/components/LayerX/HomePageOptions';

export default function LayerXPage() {
  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh" pb="80px">
      <Box position="relative" w="100%" zIndex={0}>
        <Image src={backgroundImage.src} h="auto" objectFit="contain" position="absolute" />
        <Box position="relative" margin="36px 16px 0px 16px">
          <Image src={MintBannerImage.src} h="auto" objectFit="contain" />
          <MintContent />
        </Box>

        <HomePageOption
          backgroundColor="unset"
          paddingTopMain="12px"
          heading={'Mint your NFT'}
          buttonText="Start Minting"
          redirectUrl="/layerx/mint"
          subHeading="Easily transform any post on X into an NFT. Showcase it, own it, and use it to compete in exciting challenges!"
        />
        <HomePageOption
          showIcon={true}
          backgroundColor="rgba(255, 255, 255, 0.05)"
          heading={'Compete with Your NFTs'}
          paddingTopMain="30px"
          redirectUrl="/layerx/competitions"
          buttonText="View Competitions"
          subHeading="Join the excitement! Enter your NFTs, gather votes, and compete for the top 3 spots. Show off your creations and win!"
        />
      </Box>
    </Box>
  );
}
