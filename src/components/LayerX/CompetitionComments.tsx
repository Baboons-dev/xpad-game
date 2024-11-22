import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Image,
  useToast,
  Menu,
  MenuList,
  MenuButton,
  Button,
  Input,
} from '@chakra-ui/react';
import SendMessageImage from '../../assets/sendMessage.svg';
import SendMessageActive from '../../assets/addCommentActive.svg';
import ProfilePicture from '../../assets/profilePicture.png';
import React, { useEffect, useState } from 'react';
import Trophy from '../../assets/TrophyStraight.png';
import { CommentsResponse, User } from '../../types/type';
import { useSelector, useStore } from '@/store';
import TimeAgo from './Timer';
import CommentDropDown from '../../icons/CommentDropDown';
import {
  addCompetitionComments,
  deleteCompetitionComment,
  getCompetitionComments,
  updateCompetitionComment,
} from '../../api/layerxApiCalls/api';
import storage from '../../utils/storage';
import LoadingSpinner from './LoadingSpinner';
import { CloseIcon } from '@chakra-ui/icons';
import CloseIconGray from '@/icons/CloseIconGrey';
// import { useRouter } from 'next/router';

interface CompetitionCommentsProps {
  id: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function CompetitionComments(props: CompetitionCommentsProps) {
  const { id, isOpen, onClose, onOpen } = props;
  // const router = useRouter();
  const toast = useToast();
  const userName = storage.get('userName');
  const selectedCompetitionId = id;
  const [loading, setLoading] = useState(false);
  const [editCommentId, setEditCommentId] = useState<any>(null);
  const [allComments, setAllComments] = useState<CommentsResponse[]>();
  const [editText, setEditText] = useState('');
  const [commentToDeleteId, setCommentToDeleteId] = useState<number | null>(null);
  const [value, setValue] = React.useState('');

  const [actionInProgress, setActionInProgress] = useState(false);
  // const setNumberOfComments = useAppStore((state: AppStoreState) => state.setNumberOfComments);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (selectedCompetitionId) {
      selectedCompetitionId && fetchComments(selectedCompetitionId);
    } else {
      const comptId = location && location?.pathname?.split('/').pop();
      comptId && fetchComments(Number(comptId));
    }
  }, []);

  const fetchComments = async (id: number) => {
    try {
      setActionInProgress(true); // Indicate that an action is in progress
      setLoading(true);
      const res = await getCompetitionComments(id);
      setAllComments(res);
      setNumberOfComments(res?.length);
    } catch (error: unknown) {
      toast({
        title: 'Something went wrong while fetching comments',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setActionInProgress(false); // Reset action in progress state
    }
  };

  const handleEditClick = (comment: CommentsResponse) => {
    setEditCommentId(comment.id);
    setEditText(comment.comment);
  };

  const removeCommentToEditFromState = () => {
    setEditCommentId('');
    setEditText('');
  };

  const handleCancelClick = () => {
    setEditCommentId(null);
    setEditText('');
  };

  const handleUpdateClick = (id: number) => {
    onUpdateComment(id, editText);
    setEditCommentId(null);
  };

  const handleInputChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  useEffect(() => {
    if (actionInProgress) {
      isOpen && onOpen(); // Make sure the drawer stays open when action is in progress
    }
  }, [actionInProgress, onOpen]);

  const onUpdateComment = async (id: number, editText: string) => {
    try {
      setActionInProgress(true);
      selectedCompetitionId &&
        (await updateCompetitionComment(id, editText, selectedCompetitionId));
      selectedCompetitionId && fetchComments(selectedCompetitionId);
    } catch (error: unknown) {
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Something went wrong while updating comments',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setActionInProgress(false); // Reset action in progress state
    }
  };

  const onDeleteClick = async (id: any) => {
    try {
      setActionInProgress(true);
      await deleteCompetitionComment(id); // Await the deleteComment function
      selectedCompetitionId && fetchComments(selectedCompetitionId);
    } catch (error: unknown) {
      console.error('Error caught in catch block:', error);
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Something went wrong while deleting comment',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setActionInProgress(false);
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      addCompetitionComment();
    }
  };

  const addCompetitionComment = async () => {
    try {
      const data = {
        competition: selectedCompetitionId,
        comment: value,
      };
      setActionInProgress(true);
      await addCompetitionComments(selectedCompetitionId || 0, data);
      setValue('');
      selectedCompetitionId && fetchComments(selectedCompetitionId);
    } catch (error: unknown) {
      setLoading(false);
      toast({
        title: 'Something went wrong while adding comment',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setActionInProgress(false); // Reset action in progress state
    }
  };

  const onCommentUserNameClick = (owner: User) => {
    if (owner?.wallet_address === user?.wallet_address) {
      // router.push('/my-profile');
    } else {
      // router.push(`/users-profile/${owner?.username}`, { state: { owner } });
    }
  };

  console.log('user', user);

  console.log('allComments', allComments);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Drawer isOpen={isOpen} placement={'right'} onClose={onClose} size="full">
          <DrawerOverlay />
          <DrawerContent
            bg="black"
            border="1px solid #2C2C2C"
            width={['95% !important', '95% !important']}
            height={['97% !important', '97% !important']}
            borderRadius={['44px', '44px']}
            left={['unset !important', 'unset !important']}
            right={['unset !important', 'unset !important']}
            marginTop={['13px', '13px', 'unset']}>
            <Box
              display={['none', 'none', 'flex']}
              borderRadius="15px"
              background="#2C2C2C"
              width="58px"
              height="52px"
              position="absolute"
              left="-92px"
              onClick={onClose}
              // display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer">
              <CloseIconGray />
            </Box>

            <DrawerHeader p={'0px'}>
              <Box
                borderRadius=" 24px"
                background="rgba(255, 255, 255, 0.05)"
                height="65px"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                position="relative"
                margin={['18px', '18px', 'unset']}
                width="-webkit-fill-available">
                <Image
                  position="absolute"
                  top="0px"
                  left="0px"
                  src={Trophy.src}
                  width={['75px']}
                  height={['75px']}
                  objectFit="contain"
                  transform="rotate(-29.01deg)"
                />
                <Text
                  color="#fff"
                  textAlign="center"
                  fontFamily="Plus Jakarta Sans"
                  fontSize={['16px', '16px', '24px']}
                  fontStyle=" normal"
                  fontWeight="800"
                  lineHeight="normal">
                  Comments
                </Text>
                <Box
                  position="absolute"
                  right="10px"
                  borderRadius="15px"
                  background="rgba(255, 255, 255, 0.05)"
                  width="48px"
                  height="48px"
                  onClick={onClose}
                  display={['flex', 'flex', 'none']}
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer">
                  <CloseIcon color="white" />
                </Box>
              </Box>
            </DrawerHeader>
            <DrawerBody p={0} className="custom-scroll">
              <Box
                margin={['23px 20px 20px 20px', '23px 20px 20px 20px', '23px 0px 0px 0px']}
                // marginTop="23px"
                display="flex"
                flexDirection="column"
                gap="15px"
                // minH={allComments && allComments?.length === 0 ? 'unset' : '-webkit-fill-available'}
                // height={
                //   allComments && allComments?.length === 0 ? '520px' : '-webkit-fill-available'
                // }
                height="-webkit-fill-available">
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="15px"
                  overflow="auto"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '0px', // Hides scrollbar in WebKit browsers (Chrome, Safari)
                      backgroundColor: 'transparent',
                    },
                    '*::-webkit-scrollbar-corner': {
                      background: 'transparent',
                    },
                  }}
                  style={{
                    scrollbarWidth: 'none', // Hides scrollbar in Firefox
                  }}>
                  {allComments?.length ? (
                    allComments.map((comment, i) => (
                      <Box display="flex" gap="10px" key={i}>
                        <Box>
                          {comment?.user?.avatar ? (
                            <Box height="40px" width="40px">
                              <Image
                                src={comment?.user?.avatar}
                                objectFit="cover"
                                borderRadius="50%"
                                height="inherit"
                                width="inherit"
                                cursor="pointer"
                                onClick={() => onCommentUserNameClick(comment?.user)}
                              />
                            </Box>
                          ) : (
                            <Box height="40px" width="40px">
                              <Image
                                src={ProfilePicture.src}
                                objectFit="cover"
                                height="inherit"
                                width="inherit"
                                borderRadius="50%"
                                cursor="pointer"
                                onClick={() => onCommentUserNameClick(comment?.user)}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box
                          display="flex"
                          gap="5px"
                          flexDirection="column"
                          padding="12px"
                          borderRadius="16px"
                          background="rgba(255, 255, 255, 0.09)"
                          width="-webkit-fill-available">
                          <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Box display="flex" gap="10px">
                              <Text
                                color="#FFF"
                                fontFamily="Plus Jakarta Sans"
                                fontSize=" 14px"
                                fontStyle="normal"
                                fontWeight="700"
                                lineHeight="22px"
                                cursor="pointer"
                                onClick={() => onCommentUserNameClick(comment?.user)}>
                                {comment?.user?.username}
                              </Text>
                              <Box
                                height="14px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center">
                                <Text
                                  color="rgba(255, 255, 255, 0.50)"
                                  fontFamily="Plus Jakarta Sans"
                                  fontSize="14px"
                                  fontStyle="normal"
                                  fontWeight="500"
                                  lineHeight="22px">
                                  .
                                </Text>
                              </Box>
                              <Text
                                color="rgba(255, 255, 255, 0.50)"
                                fontFamily="Plus Jakarta Sans"
                                fontSize={['10px', '14px']}
                                fontStyle="normal"
                                fontWeight="500"
                                lineHeight="22px">
                                <TimeAgo timestamp={comment?.created_at} />
                              </Text>
                            </Box>

                            {comment?.user?.username === user?.username && (
                              <Menu placement="bottom-end">
                                {({ isOpen, onClose }) => (
                                  <>
                                    <MenuButton
                                      display="flex"
                                      width=" unset"
                                      backgroundColor=" transparent"
                                      rightIcon={isOpen ? <CommentDropDown /> : <CommentDropDown />}
                                      height=" unset"
                                      justifyContent="flex-end"
                                      as={Button}
                                      _hover={{
                                        color: 'white',
                                        bg: 'transparent',
                                      }}
                                      _active={{
                                        color: 'white',
                                        bg: 'transparent',
                                      }}></MenuButton>
                                    <MenuList
                                      padding="8px"
                                      borderRadius="8px"
                                      backgroundColor="#585858"
                                      boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.03), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 2px 4px 0px rgba(0, 0, 0, 0.02)"
                                      borderWidth="none !important"
                                      zIndex={2}>
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        height="36px"
                                        paddingRight="12px"
                                        paddingLeft="12px"
                                        cursor="pointer"
                                        onClick={() => {
                                          setCommentToDeleteId(null);
                                          handleEditClick(comment);
                                          onClose(); // Close the menu after clicking
                                        }}>
                                        <Text
                                          color="#FFF"
                                          fontFamily="Plus Jakarta Sans"
                                          fontSize=" 14px"
                                          fontStyle=" normal"
                                          fontWeight=" 500"
                                          lineHeight="22px" /* 157.143% */
                                        >
                                          Edit comment
                                        </Text>
                                      </Box>
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        height="36px"
                                        paddingRight="12px"
                                        paddingLeft="12px"
                                        cursor="pointer"
                                        onClick={() => {
                                          removeCommentToEditFromState();
                                          setCommentToDeleteId(comment?.id);
                                          onClose();
                                        }}>
                                        <Text
                                          color="#FF4D4F"
                                          fontFamily="Plus Jakarta Sans"
                                          fontSize=" 14px"
                                          fontStyle=" normal"
                                          fontWeight=" 500"
                                          lineHeight="22px">
                                          Delete comment
                                        </Text>
                                      </Box>
                                    </MenuList>
                                  </>
                                )}
                              </Menu>
                            )}
                          </Box>

                          <Box>
                            {editCommentId === comment.id ? (
                              <Box>
                                <Input
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  placeholder="Edit your comment"
                                  size="sm"
                                  borderRadius="8px"
                                  // background="rgba(255, 255, 255, 0.09)"
                                  border="none"
                                  height="40px"
                                  padding="8px"
                                  color="white"
                                  focusBorderColor="none"
                                />
                                <Box
                                  marginTop="12px"
                                  gap="5px"
                                  display="flex"
                                  justifyContent="flex-end">
                                  <Button
                                    borderRadius="8px"
                                    background="rgba(255, 255, 255, 0.15)"
                                    onClick={() => handleCancelClick()}
                                    color="#FFF"
                                    fontSize="14px"
                                    fontWeight="500"
                                    _hover={{
                                      color: '#fff',
                                      bg: 'rgba(255, 255, 255, 0.12)',
                                    }}>
                                    Cancel
                                  </Button>
                                  <Button
                                    borderRadius="8px"
                                    borderTop="1px solid #04D3FF"
                                    background="#118BCF"
                                    onClick={() => {
                                      handleUpdateClick(comment.id);
                                    }}
                                    color="#FFF"
                                    fontSize="14px"
                                    fontWeight="500"
                                    _hover={{
                                      color: '#fff',
                                      bg: '#04D3FF',
                                    }}>
                                    Save changes
                                  </Button>
                                </Box>
                              </Box>
                            ) : (
                              <Text
                                color="#FFF"
                                fontFamily="Plus Jakarta Sans"
                                fontSize=" 14px"
                                fontStyle="normal"
                                fontWeight="500"
                                lineHeight="22px">
                                {comment?.comment}
                              </Text>
                            )}
                          </Box>

                          {commentToDeleteId === comment?.id && (
                            <Box
                              marginTop="12px"
                              gap="5px"
                              display="flex"
                              justifyContent="flex-end">
                              <Button
                                borderRadius="8px"
                                background=" rgba(255, 255, 255, 0.15)"
                                color="#FFF"
                                fontSize="14px"
                                fontWeight="500"
                                onClick={() => {
                                  setCommentToDeleteId(null);
                                }}
                                _hover={{
                                  color: '#fff',
                                  bg: 'rgba(255, 255, 255, 0.12)',
                                }}>
                                Cancel
                              </Button>
                              <Button
                                borderRadius="8px"
                                onClick={() => {
                                  onDeleteClick(comment?.id);
                                }}
                                color="#FFF"
                                fontSize="14px"
                                fontWeight="500"
                                background=" #FF4D4F"
                                _hover={{
                                  color: 'white',
                                  bg: '#FF4D4F',
                                }}>
                                Delete comment
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box marginTop="10px">
                      <Text
                        color=" rgba(255, 255, 255, 0.50)"
                        textAlign="center"
                        fontFamily="Plus Jakarta Sans"
                        fontSize="16px"
                        fontStyle=" normal"
                        fontWeight="500">
                        No comments to display.
                      </Text>
                    </Box>
                  )}
                </Box>
                <Box position="relative" width="100%" marginTop="auto">
                  {/* {!accessToken ? (
                    <Box
                      borderRadius="16px"
                      background="rgba(255, 255, 255, 0.09)"
                      height="64px"
                      paddingLeft="40px"
                      paddingRight="40px"
                      fontStyle=" normal"
                      fontWeight=" 500"
                      lineHeight="22px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={['5px', '5px', '5px', '10px', '10px']}>
                      <Text
                        color=" rgba(255, 255, 255, 0.50)"
                        textAlign="center"
                        fontFamily="Plus Jakarta Sans"
                        fontSize="16px"
                        fontStyle=" normal"
                        fontWeight="500">
                        Please login to comment
                      </Text>
                      <Button
                        width="113px"
                        borderRadius="15px"
                        backgroundColor="#118BCF"
                        padding="16px 32px"
                        color=" #FFF"
                        fontSize="16px"
                        fontWeight=" 600"
                        h="44px"
                        _hover={{
                          color: 'white',
                          bg: '#43BDD7',
                        }}
                        onClick={loginWithXpad}>
                        Login
                      </Button>
                    </Box>
                  ) : ( */}
                  <Box>
                    {user?.avatar ? (
                      <Image
                        src={user?.avatar}
                        alt="Left Image"
                        position="absolute"
                        left="10px"
                        top="50%"
                        transform="translateY(-50%)"
                        boxSize="20px"
                        borderRadius="50%"
                        height="34px"
                        width="34px"
                      />
                    ) : (
                      <Image
                        src={ProfilePicture.src}
                        alt="Left Image"
                        position="absolute"
                        left="10px"
                        top="50%"
                        transform="translateY(-50%)"
                        boxSize="20px"
                        borderRadius="50%"
                        height="34px"
                        width="34px"
                      />
                    )}
                    <Input
                      value={value}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Add a comment"
                      size="sm"
                      borderRadius="16px"
                      background="rgba(255, 255, 255, 0.09)"
                      border="none"
                      height="54px"
                      paddingLeft="60px"
                      paddingRight="40px"
                      focusBorderColor="rgba(255, 255, 255, 0.10)"
                      _placeholder={{
                        color: 'rgba(255, 255, 255, 0.50)',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '15px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: '22px' /* 146.667% */,
                      }}
                      color="#FFF"
                      fontSize=" 15px"
                      fontStyle=" normal"
                      fontWeight=" 500"
                      lineHeight="22px" /* 146.667% */
                      marginRight="10px"
                    />
                    <Box
                      position="absolute"
                      right="10px"
                      top="50%"
                      transform="translateY(-50%)"
                      cursor="pointer"
                      onClick={addCompetitionComment}
                      zIndex="1">
                      <Image
                        src={value ? SendMessageActive.src : SendMessageImage.src}
                        alt="Right Image"
                        boxSize="20px"
                      />
                    </Box>
                  </Box>
                  {/* // )} */}
                </Box>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default CompetitionComments;
