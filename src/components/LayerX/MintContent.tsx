import React from 'react';
import { Box, Image, Text, Link } from '@chakra-ui/react';
import MintStaticImg1 from '../../assets/MintStaticImg1.png';
import MintStaticImg2 from '../../assets/MintStaticImg2.png';
import MintStaticImg3 from '../../assets/MintStaticImg3.png';

interface MintContentProps {
  buttonText: string;
  redirectUrl: string;
}

export default function MintContent(props: MintContentProps) {
  const {
    buttonText,
    redirectUrl,
  } = props;
  return (
    <>
      <Box marginBottom="46px" marginTop="46px" display="flex" flexDirection="column" gap="6px" justifyContent="center" alignItems="center">
        <Text
          color="#337BFF"
          fontFamily="Plus Jakarta Sans"
          fontSize="38px"
          textAlign="center"
          fontStyle="normal"
          fontWeight="800"
          lineHeight="normal">
          X NFTs
        </Text>
        <Text
          color="#A0A0A0"
          fontFamily="Plus Jakarta Sans"
          fontSize="14px"
          fontStyle="normal"
          fontWeight="400"
          textAlign="center"
          lineHeight="normal">
          Convert X posts into unique, ownable NFTs. Participate in competitions with your
          collectibles! Start minting now!
        </Text>
        <Link href={redirectUrl} height='42px' background='#00000000' border='1px solid #337BFF' borderRadius='8px' width='165px' display='flex' justifyContent='center' alignItems='center' marginTop='16px'>
                <Text
                  fontFamily="Plus Jakarta Sans"
                  color={'#337BFF'}
                  fontSize="14px"
                  fontWeight="700">
                  {buttonText}
                </Text>
              </Link>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Image src={MintStaticImg1?.src} height="115px" />
        <Image src={MintStaticImg2?.src} height="115px" />
        <Image src={MintStaticImg3?.src} height="115px" />
      </Box>
    </>
  );
}
