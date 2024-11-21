import React, { useState } from 'react';
import { Flex, Modal } from 'antd';
import { Box, Text } from '@chakra-ui/react';
import BackArrowIcon from '@/icons/ArrowBack';
import BrowseNfts from '@/components/LayerX/BrowseNfts';

interface Props {
  competitionId: number;
  onSuccess: () => void;
  handleClose: () => void;
}

type ParticipateType = 'Browse NFTs' | 'Mint NFT';

export default function ParticipateModal(props: Props) {
  const { competitionId, handleClose, onSuccess } = props;
  const [type, setType] = useState<ParticipateType>();

  return (
    <Modal
      title={
        <Flex gap={8} align={'center'} style={{ marginBottom: 12 }}>
          {type !== undefined && (
            <Box onClick={() => setType(undefined)}>
              <BackArrowIcon height={'14px'} />
            </Box>
          )}
          <Text color="white" fontSize="20px" fontWeight="800" fontFamily="Plus Jakarta Sans">
            {type ?? 'Participate'}
          </Text>
        </Flex>
      }
      open
      onCancel={handleClose}
      footer={null}
      className={'modal'}>
      {type === 'Browse NFTs' ? (
        <BrowseNfts competitionId={competitionId} onSuccess={onSuccess} />
      ) : type === 'Mint NFT' ? (
        <></>
      ) : (
        <Flex gap={12} style={{ paddingTop: 12 }}>
          {['Browse NFTs', 'Mint NFT'].map((item: ParticipateType) => (
            <Box
              key={item}
              display={'flex'}
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
              border={'1px solid #FFFFFF1A'}
              style={{
                borderRadius: 12,
                padding: 20,
                height: 100,
              }}
              color={'white'}
              _hover={{
                border: '1px solid #33A7FF',
                color: '#33A7FF',
              }}
              cursor={'pointer'}
              onClick={() => setType(item)}>
              <Text fontWeight={500} fontFamily="Plus Jakarta Sans">
                {item}
              </Text>
            </Box>
          ))}
        </Flex>
      )}
    </Modal>
  );
}
