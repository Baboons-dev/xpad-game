'use client';
import { Box, Image, Text, Divider } from '@chakra-ui/react';
import backgroundImage from '../../assets/background.png';
import MintBannerImage from '../../assets/MintBanner.png';
import Link from 'next/link';
import MintContent from '@/components/LayerX/MintContent';
import HomePageOption from '@/components/LayerX/HomePageOptions';
import HomeMasonary from '@/components/LayerX/HomeMasonary';

export default function LayerXPage() {
  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh" pb="80px">
      <Box position="relative" w="100%" zIndex={0}>
        <Image src={backgroundImage.src} h="auto" objectFit="contain" position="absolute" />
        <Box position="relative" margin="36px 16px 0px 16px">
          <Image src={MintBannerImage.src} h="auto" objectFit="contain" />
          <MintContent buttonText="Explore all NFTs" redirectUrl="/layerx/nfts" />
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
          backgroundColor="rgba(255, 255, 255, 0.10)"
          heading={'Compete with Your NFTs'}
          paddingTopMain="30px"
          redirectUrl="/layerx/competitions"
          buttonText="View Competitions"
          subHeading="Join the excitement! Enter your NFTs, gather votes, and compete for the top 3 spots. Show off your creations and win!"
        />
        <Box>
          <Text
            color="#FFF"
            fontFamily="Plus Jakarta Sans"
            fontSize=" 24px"
            fontStyle="normal"
            textAlign="center"
            marginBottom="6px"
            fontWeight="800"
            lineHeight="normal">
            NFT Showcase
          </Text>
          <HomeMasonary />
          <Box display="flex" justifyContent="center" marginTop="6px">
            <Box
              borderRadius="8px"
              background="#337BFF"
              height="42px"
              display="flex"
              width="165px"
              justifyContent="center"
              alignItems="center"
              cursor={'pointer'}
              transition="all 0.3s"
              _hover={{
                bg: '#337BFF',
                color: '#000',
              }}>
              <Link href={'/layerx/nfts'}>
                <Text
                  fontFamily="Plus Jakarta Sans"
                  color={'#FFF'}
                  fontSize="14px"
                  fontWeight="700">
                  Explore all NFTs
                </Text>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
