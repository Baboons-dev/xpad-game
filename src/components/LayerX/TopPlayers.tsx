import { TopNfts } from '@/types/type';
import { Box, Button, Image, Text, Icon } from '@chakra-ui/react';
import ProfilePicture from '../../assets/profilePicture.png';
import { Spin } from 'antd';
import React from 'react';

interface TopPlayersProps {
  topNfts: TopNfts[];
  loading: boolean;
}

export default function TopPlayers(props: TopPlayersProps) {
  const { topNfts, loading } = props;

  console.log('topNfts', topNfts);
  return (
    <>
      {loading ? (
        <Box height="50px" justifyContent="center" alignItems="center">
          <Spin />
        </Box>
      ) : topNfts?.length === 0 ? (
        <Box>No players found</Box>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection={['column', 'column', 'row']}
            gap="24px"
            marginTop="24px">
            {topNfts.map((player: any, i: any) => (
              <Box
                borderRadius="12px"
                border="1px solid rgba(255, 255, 255, 0.10)"
                background="#191916"
                width={['100%', '100%', '33%']}
                padding="16px"
                key={i}
                position="relative">
                {/* <Box position="absolute" top="-30px" right=" 14px">
                  <Icon as={icons[i % icons.length]} />
                </Box> */}
                <Box
                  borderRadius="12px"
                  objectFit="cover"
                  overflow="auto"
                  width="-webkit-fill-available">
                  <Image
                    maxHeight="214px"
                    height="214px"
                    src={player?.display_image_url}
                    objectFit="cover"
                    width="inherit"
                    borderRadius="12px"
                  />
                </Box>

                <Box marginTop="28px" display="flex" gap="6px" alignItems="center">
                  {player?.owner?.profile_picture ? (
                    <Box width="40px" height="40px" borderRadius="50%" marginRight="4px">
                      <Image
                        src={player?.owner?.profile_picture}
                        objectFit="cover"
                        borderRadius="50%"
                        height="inherit"
                        width="inherit"
                      />
                    </Box>
                  ) : (
                    <Box width="40px" height="40px" borderRadius="50%">
                      <Image
                        src={ProfilePicture.src}
                        objectFit="cover"
                        height="inherit"
                        width="inherit"
                        borderRadius="50%"
                      />
                    </Box>
                  )}
                  {player?.owner?.twitter_username ? (
                    <Text
                      color="#FFFFFF"
                      fontSize="14px"
                      fontWeight="600"
                      cursor="pointer"
                      //   onClick={(event) => {
                      //     onOwnerClick(player?.owner);
                      //     event.stopPropagation();
                      //   }}
                    >
                      {player?.owner?.twitter_username}
                    </Text>
                  ) : (
                    <Text color=" rgba(255, 255, 255, 0.10)" fontSize="14px" fontWeight="600">
                      Anonymous
                    </Text>
                  )}
                  {/* <VerifiedLogo /> */}
                </Box>
                <Box marginTop="14px" display="flex" gap="16px" alignItems="center">
                  <Box
                    padding="0px 24px"
                    borderRadius="15px"
                    background="rgba(255, 255, 255, 0.05)"
                    height="82px"
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    style={{
                      aspectRatio: '1',
                    }}>
                    <Text
                      color=" #FFF"
                      textAlign="center"
                      fontFamily="Plus Jakarta Sans"
                      fontSize="36px"
                      fontStyle="normal"
                      fontWeight="700"
                      lineHeight="normal">
                      {i + 1}
                    </Text>
                  </Box>
                  <Box
                    padding="10px"
                    width="-webkit-fill-available"
                    display="flex"
                    height="82px"
                    flexDirection="column"
                    borderRadius="15px"
                    background=" rgba(255, 255, 255, 0.05)"
                    justifyContent="center"
                    alignItems="center">
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      gap="3px">
                      {/* <VotesIcon color={"#FFFFFF"} /> */}
                      <Text
                        color="#FFF"
                        textAlign="center"
                        fontFamily="Plus Jakarta Sans"
                        fontSize="16px"
                        fontStyle="normal"
                        fontWeight="600"
                        lineHeight="normal">
                        Votes
                      </Text>
                    </Box>
                    <Text
                      color="#04D3FF"
                      textAlign="center"
                      fontFamily="Plus Jakarta Sans"
                      fontSize="24px"
                      fontStyle="normal"
                      fontWeight="600"
                      lineHeight="normal">
                      {player?.votes && player?.votes}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
