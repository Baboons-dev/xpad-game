'use client';
import { useUser } from '@/hooks';
import { useStore } from '@/store';
import ProfilePicture from '../assets/profilePicture.png';
import { Box, Image, Text } from '@chakra-ui/react';
import XpIcon from '@/icons/XpIcon';
import { useRouter } from 'next/navigation';

export function TopBar() {
  const router = useRouter();
  const { logout } = useUser();
  const user = useStore((state) => state.user);
  return (
    <Box
      className="Header top-bar"
      display="flex"
      justifyContent="space-between"
      height="64px"
      padding="12px 16px"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="50"
      backgroundColor="black"
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      maxWidth={'500px'}
      margin={'auto'}>
      <Box display="flex" gap="10px" flexDirection="row" alignItems="center">
        {user?.avatar ? (
          <Box
            padding="0px"
            height="40px"
            width="40px"
            zIndex="2"
            borderRadius="8px"
            border="1px solid rgba(255, 255, 255, 0.16)"
            overflow="hidden">
            <Image
              src={user?.avatar}
              alt="Description"
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="center"
              borderRadius="7px"
            />
          </Box>
        ) : (
          <Box
            padding="0px"
            height="40px"
            width="40px"
            zIndex="2"
            borderRadius="8px"
            border="1px solid rgba(255, 255, 255, 0.16)"
            overflow="hidden">
            <Image
              src={ProfilePicture.src}
              alt="Description"
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="center"
              borderRadius="700px"
            />
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => router.push('/profile')}>
          <Text
            color="#FFF"
            fontSize="14px"
            fontStyle="normal"
            fontWeight="800"
            fontFamily="Plus Jakarta Sans"
            lineHeight="normal">
            {user?.username}
          </Text>
        </Box>
      </Box>

      <Box display="flex" gap="13px" flexDirection="row">
        <Box display="flex" justifyContent="center" alignItems="center">
          <XpIcon />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text
            color=" #fff"
            fontSize="16px"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans"
            lineHeight="normal">
            {user?.points.toLocaleString()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
