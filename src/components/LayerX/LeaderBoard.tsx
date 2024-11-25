import React, { useEffect, useState } from 'react';
import { Button, Modal, Spin } from 'antd';
import { Box, Divider, Image, Text, useToast } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { LeaderBoardApiResponse } from '@/types/type';
import { getLeaderBoardData } from '@/api/apiCalls/nft';
import ProfileIconGrey from '@/icons/ProfileGrey';

interface LeaderBoardProps {
  isLeaderboardOpen: boolean;
  setIsLeaderboardOpen: (isLeaderboardOpen: boolean) => void;
}

export default function LeaderBoard(props: LeaderBoardProps) {
  const { isLeaderboardOpen, setIsLeaderboardOpen } = props;
  const params = useParams();
  const toast = useToast();
  const selectedCompetitionId = params.id;
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoardApiResponse[]>();

  const fetchLeaderBoardRanking = async (competitionId: number) => {
    try {
      setIsDataLoading(true);
      const res = await getLeaderBoardData(competitionId);
      //   const res1 = [
      //     {
      //       email: "abc",
      //       first_name: "Neelm",
      //       id: 1,
      //       last_name: "Waqar",
      //       profile_picture: "abcbc",
      //       username: "neelam",
      //       vote_count: 1,
      //       wallet_address: "jddjjdjdj",
      //     },
      //     {
      //       email: "abc",
      //       first_name: "Neelm",
      //       id: 2,
      //       last_name: "Waqar",
      //       profile_picture: "abcbc",
      //       username: "neelam",
      //       vote_count: 1,
      //       wallet_address: "jddjjdjdj",
      //     },
      //     {
      //       email: "abc",
      //       first_name: "Neelm",
      //       id: 3,
      //       last_name: "Waqar",
      //       profile_picture: "abcbc",
      //       username: "neelam",
      //       vote_count: 1,
      //       wallet_address: "jddjjdjdj",
      //     },
      //   ];
      setLeaderBoardData(res?.data);
      setIsDataLoading(false);
    } catch (error: any) {
      setIsDataLoading(false);
      toast({
        title: 'Something went wrong while fetching leaderboard',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    selectedCompetitionId && fetchLeaderBoardRanking(Number(selectedCompetitionId));
  }, [isLeaderboardOpen]);

  const onOwnerClick = (owner: LeaderBoardApiResponse) => {
    console.log('owner', owner);
  };

  return (
    <>
      <Modal
        title={
          <Text
            color="white"
            fontSize="20px"
            fontWeight="800"
            fontFamily="Plus Jakarta Sans"
            marginBottom="20px">
            Competition Leaderboard
          </Text>
        }
        open={isLeaderboardOpen}
        onCancel={() => setIsLeaderboardOpen(false)}
        footer={null}
        className="leaderboard-modal">
        <>
          {isDataLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" marginTop="10px">
              <Spin />
            </Box>
          ) : leaderBoardData && leaderBoardData?.length > 0 ? (
            <Box className="space-y-3 mt-4">
              {leaderBoardData &&
                leaderBoardData.map((data, i) => (
                  <>
                    <Box
                      key={i}
                      padding="20px"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center">
                      <Box display="flex" gap="18px">
                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                          width="30px">
                          <Text
                            color={
                              i === 0
                                ? '#FFBC00'
                                : i === 1
                                ? '#B8B8B8'
                                : i === 2
                                ? '#FF993A'
                                : '#FFF'
                            }
                            textAlign="center"
                            fontFamily="Plus Jakarta Sans"
                            fontSize="18px"
                            fontStyle="normal"
                            fontWeight="800"
                            lineHeight="normal">
                            {i + 1}
                          </Text>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          gap="10px"
                          justifyContent="center"
                          alignItems="center">
                          {data?.owner?.profile_picture ? (
                            <Box height="34px" width="34px">
                              <Image
                                src={data?.owner?.profile_picture}
                                objectFit="cover"
                                borderRadius="50%"
                                height="inherit"
                                width="inherit"
                              />
                            </Box>
                          ) : (
                            <ProfileIconGrey />
                          )}

                          <Text
                            color="#fff"
                            textAlign="center"
                            fontFamily="Plus Jakarta Sans"
                            fontSize="15px"
                            fontStyle=" normal"
                            fontWeight="600"
                            lineHeight="normal"
                            cursor="pointer"
                            textDecoration="none" // Ensure the bg on hover works
                            _hover={{
                              textDecoration: 'underline',
                              color: '#04D3FF',
                            }}
                            onClick={() => {
                              onOwnerClick(data);
                            }}>
                            {data?.owner?.twitter_username}
                          </Text>
                        </Box>
                      </Box>
                      <Box>
                        <Text
                          color="#3AFF65"
                          textAlign="center"
                          fontFamily="Plus Jakarta Sans"
                          fontSize="16px"
                          fontStyle=" normal"
                          fontWeight="600"
                          lineHeight="normal">
                          {data?.vote_count}
                        </Text>
                      </Box>
                    </Box>
                    {i !== leaderBoardData?.length - 1 && (
                      <Divider
                        border="1px solid rgba(255, 255, 255, 0.10) !important"
                        width="99%"
                      />
                    )}
                  </>
                ))}
            </Box>
          ) : (
            <Box className="space-y-3 mt-4">
              <Text color="white" fontSize="14px">
                No Data found
              </Text>
            </Box>
          )}
        </>
      </Modal>
    </>
  );
}
