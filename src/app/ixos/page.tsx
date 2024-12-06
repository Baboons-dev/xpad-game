'use client';

import { Box, Image, Text } from '@chakra-ui/react';
import backgroundImage from '../../assets/background.png';
import topImg from '../../assets/ixoTopImg.svg';
import bottomImg from '../../assets/ixoSecoundImg.svg';
import { useRouter } from 'next/navigation';
import { Swords, Coins } from 'lucide-react';

export default function IXOsPage() {
  const router = useRouter();

  const cards = [
    {
      title: 'IXO Fundraising',
      icon: <Coins className="w-6 h-6 text-[#BEF642]" />,
      description:
        'Explore and join Live and Upcoming IXOs (Initial X Offers). Secure your spot and start investing today!',
      buttonText: 'Explore all IXOs',
      onClick: () => router.push('/ixos/fundraise'),
      borderColor: '#BEF642',
      iconBg: '#BEF642',
    },
    {
      title: 'Your Portfolio',
      icon: <Swords className="w-6 h-6 text-[#BEF642]" />,
      description:
        'Track your IXO portfolio, gain insights into your investments, the vesting schedules and claim your tokens!',
      buttonText: 'View my investments',
      onClick: () => router.push('/ixos/portfolio'),
      borderColor: '#BEF642',
      iconBg: '#BEF642',
    },
  ];

  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh">
      <Box position="relative" w="100%">
        <Image
          src={backgroundImage.src}
          h="auto"
          objectFit="contain"
          position="absolute"
          zIndex={-1}
        />
        <Box
          style={{
            padding: '36px 16px 24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '46px',
            alignItems: 'center',
          }}>
          <Image src={topImg.src} h="193px" w="238px" alt="topImg" />

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: '38px',
                fontWeight: '800',
                color: '#BEF642',
                fontFamily: 'Plus Jakarta Sans',
                textAlign: 'center',
              }}>
              Fundraising on X
            </Text>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#A0A0A0',
                fontFamily: 'Plus Jakarta Sans',
                textAlign: 'center',
              }}>
              xPad enables decentralized fundraising on X, using engagement-based participation, no
              tokens required, and blockchain transparency.
            </Text>
          </Box>

          <Card card={cards[0]} icon={true} />

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              paddingBottom: '60px',
            }}>
            <Image src={bottomImg.src} h="174px" w="269px" alt="bottomImg" />
            <Card card={cards[1]} icon={false} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

interface CardProps {
  card: any;

  icon?: boolean;
}
const Card = ({ card, icon }: CardProps) => {
  return (
    <Box
      borderRadius="20px"
      border="1px solid rgba(255, 255, 255, 0.10)"
      padding={icon ? '30px 20px 20px 20px' : '20px'}
      background={icon ? 'rgba(255, 255, 255, 0.10)' : '#000000'}
      transition="all 0.3s"
      width="100%">
      <Box display="flex" flexDirection="column" alignItems="center" gap="16px" width="100%">
        {icon && (
          <Box
            width="61px"
            height="60px"
            borderRadius="8px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={`${card.iconBg}15`}>
            {card.icon}
          </Box>
        )}

        <Text
          fontFamily="Plus Jakarta Sans"
          color="#FFF"
          fontSize="28px"
          fontStyle="normal"
          fontWeight="800"
          lineHeight="normal"
          textAlign="center">
          {card.title}
        </Text>
        <Text
          fontFamily="Plus Jakarta Sans"
          color="#A0A0A0"
          fontSize="14px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
          textAlign="center">
          {card.description}
        </Text>
      </Box>

      <Box
        marginTop="16px"
        marginBottom="16px"
        display="flex"
        flexDirection="row"
        alignItems="center">
        <Box as="hr" width="100%" border="1px solid rgba(255, 255, 255, 0.10)" />
      </Box>

      <Box
        borderRadius="8px"
        border={`1px solid ${card.borderColor}`}
        height="42px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        transition="all 0.3s"
        backgroundColor="#BEF642"
        _hover={{
          bg: card.borderColor,
          color: '#000',
        }}
        onClick={card.onClick}>
        <Text
          fontFamily="Plus Jakarta Sans"
          color="#000"
          fontSize="14px"
          fontWeight="700"
          _hover={
            {
              //color: '#fff',
            }
          }>
          {card.buttonText}
        </Text>
      </Box>
    </Box>
  );
};
