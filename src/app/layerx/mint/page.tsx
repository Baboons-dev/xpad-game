'use client';

import { addTweetScreenShot, saveNFT } from '@/api/apiCalls/nft';
import BackArrowIcon from '@/icons/ArrowBack';
import { useSelector } from '@/store';
import { ABI, SMART_CONTRACT_ADDRESS } from '@/utils/nft-contract-abi';
import { config } from '@/utils/wallet-configs';
import { Box, Image, Text } from '@chakra-ui/react';
import { useAppKit } from '@reown/appkit/react';
import { Button, ConfigProvider, Input, message } from 'antd';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount, useChainId, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';
import backgroundImage from '../../../assets/background.png';
import { LoadingOutlined } from '@ant-design/icons';

export default function MintPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const chaiId = useChainId();
  const setIShowOpenWalletAppModal = useSelector.use.setIShowOpenWalletAppModal();
  const { open, close } = useAppKit();
  const [isMinted, setIsMinted] = useState(false);
  const [mintUrl, setMintUrl] = useState('');

  const handleMint = async () => {
    setLoading(true);
    try {
      const res = await addTweetScreenShot({ tweet_url: url });
      const json_cid = res.data.json_cid;
      const json_url = res.data.json_url;

      if (!json_cid) {
        throw new Error('json_cid not found');
      }
      //setIShowOpenWalletAppModal(true);
      const resMint = await writeContractAsync({
        abi: ABI,
        address: SMART_CONTRACT_ADDRESS,
        functionName: 'safeMint',
        args: [json_url],
      });
      // setIShowOpenWalletAppModal(false);
      if (resMint) {
        const rec = await waitForTransactionReceipt(config, {
          chainId: chaiId,
          hash: resMint,
        });
      }
      const resSaveDb = await saveNFT(resMint);

      if (resSaveDb) {
        console.log('resSaveDb>>>>>>>>>>>>>>>>', resSaveDb);
        setIsMinted(true);
        setMintUrl(resSaveDb?.data?.image_url);
      }

      message.success('NFT minted successfully!');
      setUrl('');
    } catch (error) {
      console.error('Error minting NFT', error);
      message.error('Failed to mint NFT');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBg: '#000',
            activeBorderColor: '#000',
            hoverBg: '#000',
            hoverBorderColor: '#000',
            colorBgContainer: '#000',
            colorText: '#fff',
            colorTextPlaceholder: 'rgba(255, 255, 255, 0.50)',
            borderRadius: 8,
            colorBorder: '#000',
            addonBg: '#000',
            colorPrimary: '#000',
            controlHeightLG: 48,
          },
          Button: {
            colorPrimary: '#337BFF',
            colorPrimaryHover: '#33A7FF',
            colorPrimaryActive: '#337BFF',
            colorBgContainerDisabled: 'rgba(51, 123, 255, 0.5)',
            colorTextDisabled: '#fff',
            borderRadiusLG: 8,
            borderColorDisabled: 'rgba(51, 123, 255, 0.3)',
          },
        },
      }}>
      <Box w="100%" display="flex" flexDirection="column" minHeight="100vh" pb="80px">
        <Box position="relative" w="100%" zIndex={0}>
          <Image src={backgroundImage.src} h="auto" objectFit="contain" position="absolute" />
          <Box position="relative" margin="24px 16px 29px 16px">
            <Box display="flex" alignItems="center">
              <Link href="/layerx">
                <Box>
                  <BackArrowIcon />
                </Box>
              </Link>
              <Box width="100%" display="flex" justifyContent="center">
                <Text
                  color="#33A7FF"
                  fontSize="20px"
                  fontStyle="normal"
                  fontWeight="800"
                  lineHeight="normal"
                  fontFamily="Plus Jakarta Sans">
                  Mint NFT
                </Text>
              </Box>
            </Box>
          </Box>

          <Box margin="0px 16px 24px 16px" position="relative">
            {isMinted ? (
              <Box
                borderRadius="20px"
                border="1px solid rgba(255, 255, 255, 0.10)"
                background="#1A1A1A"
                padding="30px 20px 20px 20px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="24px">
                {mintUrl ? (
                  <Image
                    src={mintUrl}
                    alt="minted"
                    width={'321px'}
                    height={'345px'}
                    style={{ borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                  />
                ) : (
                  <Box
                    width={'321px'}
                    height={'345px'}
                    style={{
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      gap: '6px',
                    }}>
                    <IconMint />
                    <Box style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                      <Text
                        color="rgba(160, 160, 160, 1)"
                        fontSize="14px"
                        fontWeight="400"
                        fontFamily="Plus Jakarta Sans">
                        Processing your NFT...
                      </Text>
                      <LoadingOutlined style={{ color: 'rgba(160, 160, 160, 1)' }} />
                    </Box>
                  </Box>
                )}
                <Button
                  onClick={() => {
                    setIsMinted(false);
                    setMintUrl('');
                    setLoading(false);
                    setUrl('');
                  }}
                  size="large"
                  type="primary"
                  style={{ width: '100%', marginTop: '8px' }}>
                  Close
                </Button>
              </Box>
            ) : (
              <Box
                borderRadius="20px"
                border="1px solid rgba(255, 255, 255, 0.10)"
                background="#1A1A1A"
                padding="30px 20px 20px 20px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="24px">
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  width="100%"
                  gap="16px">
                  <IconMint />
                  <Box
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    gap="16px"
                    width="100%"
                    paddingBottom={'20px'}
                    borderBottom={'1px solid rgba(255, 255, 255, 0.10)'}>
                    <Text
                      color="white"
                      fontSize="28px"
                      fontWeight="800"
                      fontFamily="Plus Jakarta Sans">
                      Mint your own NFT
                    </Text>
                    <Text
                      color="#A0A0A0"
                      fontSize="14px"
                      fontWeight="400"
                      fontFamily="Plus Jakarta Sans"
                      textAlign="center">
                      Minting an NFT is as simple as pasting a URL from a post on X into the modal
                      below. Could it be any easier?
                    </Text>
                  </Box>

                  <Box width="100%" marginTop={'4px'}>
                    <Input
                      placeholder="Click to paste link"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      size="large"
                    />
                  </Box>

                  {address ? (
                    <Button
                      onClick={handleMint}
                      loading={loading}
                      disabled={!url}
                      size="large"
                      type="primary"
                      style={{ width: '100%', marginTop: '8px' }}
                      iconPosition={'end'}>
                      {loading ? 'Processing...' : 'Mint now!'}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        open({ view: 'Connect' });
                      }}
                      size="large"
                      type="primary"
                      style={{ width: '100%', marginTop: '8px' }}>
                      Connect wallet
                    </Button>
                  )}
                  {loading && (
                    <Text
                      color="#A0A0A0"
                      fontSize="14px"
                      fontWeight="400"
                      fontFamily="Plus Jakarta Sans"
                      textAlign="center"
                      width="100%">
                      We are currently processing the creation of your NFT. Please be patient as we
                      complete this process.
                    </Text>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ConfigProvider>
  );
}

const IconMint = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
      <g clip-path="url(#clip0_662_3237)">
        <path
          d="M49.9091 0H11.0909C4.96557 0 0 4.88417 0 10.9091V49.0909C0 55.1158 4.96557 60 11.0909 60H49.9091C56.0344 60 61 55.1158 61 49.0909V10.9091C61 4.88417 56.0344 0 49.9091 0Z"
          fill="#337BFF"
          fill-opacity="0.15"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30.9257 13H31.0743C34.0881 13 36.4505 13 38.3248 13.2094C40.2374 13.4231 41.7872 13.867 43.1104 14.8584C43.9114 15.4586 44.6159 16.1851 45.1979 17.0112C46.1593 18.3757 46.5897 19.9739 46.797 21.9463C47 23.8792 47 26.3154 47 29.4234V29.5101C47 31.0913 47 32.4924 46.9751 33.7317C46.902 37.377 46.6254 39.9626 45.1979 41.9888C44.6159 42.8149 43.9114 43.5414 43.1104 44.1416C41.7872 45.133 40.2374 45.5769 38.3248 45.7906C36.4505 46 34.0881 46 31.0743 46H30.9257C27.9119 46 25.5495 46 23.6752 45.7906C21.7626 45.5769 20.2128 45.133 18.8896 44.1416C18.1176 43.5632 17.4354 42.8675 16.8659 42.0784C16.8445 42.0487 16.8232 42.0188 16.8021 41.9888C15.8407 40.6243 15.4103 39.0261 15.203 37.0537C15 35.1208 15 32.6846 15 29.5766V29.4234C15 26.3154 15 23.8792 15.203 21.9463C15.4103 19.9739 15.8407 18.3757 16.8021 17.0112C17.3841 16.1851 18.0886 15.4586 18.8896 14.8584C20.2128 13.867 21.7626 13.4231 23.6752 13.2094C25.5495 13 27.9119 13 30.9257 13ZM23.9404 15.7331C22.2371 15.9234 21.1701 16.2875 20.3365 16.9121C19.7444 17.3557 19.2237 17.8926 18.7935 18.5032C18.1878 19.3629 17.8348 20.4633 17.6503 22.2198C17.4632 24 17.4615 26.2989 17.4615 29.5C17.4615 32.7011 17.4632 35 17.6503 36.7802C17.7163 37.4084 17.8038 37.9527 17.9168 38.4321C18.3687 37.5362 18.7432 36.8768 19.187 36.3135C20.9345 34.0952 23.5394 32.7814 26.3102 32.7207C27.3471 32.698 28.4516 32.926 30.2553 33.2982C30.3098 33.3094 30.365 33.3208 30.4209 33.3323L30.4603 33.3405C30.7427 32.8581 30.992 32.4713 31.2523 32.141C34.3888 28.1609 39.9825 27.3746 44.0376 30.3438C44.1996 30.4624 44.3642 30.5959 44.538 30.7478C44.5385 30.3471 44.5385 29.9315 44.5385 29.5C44.5385 26.2989 44.5368 24 44.3497 22.2198C44.1652 20.4633 43.8122 19.3629 43.2065 18.5032C42.7763 17.8926 42.2556 17.3557 41.6635 16.9121C40.8299 16.2875 39.7629 15.9234 38.0596 15.7331C36.3333 15.5402 34.1041 15.5385 31 15.5385C27.8959 15.5385 25.6667 15.5402 23.9404 15.7331ZM44.5012 34.2184C43.4888 33.177 43.0187 32.711 42.6126 32.4136C39.6153 30.219 35.4809 30.8002 33.1625 33.742C32.906 34.0675 32.6226 34.5359 32.0983 35.4814C31.9329 35.7798 31.7476 36.1178 31.5343 36.5069L27.7293 43.4493C28.6999 43.4613 29.7827 43.4615 31 43.4615C34.1041 43.4615 36.3333 43.4598 38.0596 43.2669C39.7629 43.0766 40.8299 42.7125 41.6635 42.0879C42.2556 41.6443 42.7763 41.1074 43.2065 40.4968C44.0822 39.2538 44.4073 37.5536 44.5012 34.2184ZM24.9579 43.3559C24.9724 43.3236 24.9882 43.2916 25.0055 43.2601L29.169 35.6637C27.6923 35.3634 26.9941 35.2448 26.3625 35.2586C24.3145 35.3035 22.3891 36.2745 21.0975 37.9141C20.6356 38.5004 20.255 39.2689 19.3331 41.1703C19.638 41.5079 19.9735 41.816 20.3365 42.0879C21.1701 42.7125 22.2371 43.0766 23.9404 43.2669C24.2614 43.3028 24.5998 43.332 24.9579 43.3559ZM24.8462 24.4231C24.8462 21.8528 26.8666 19.7692 29.359 19.7692C31.8513 19.7692 33.8718 21.8528 33.8718 24.4231C33.8718 26.9933 31.8513 29.0769 29.359 29.0769C26.8666 29.0769 24.8462 26.9933 24.8462 24.4231ZM29.359 22.3077C28.2261 22.3077 27.3077 23.2548 27.3077 24.4231C27.3077 25.5914 28.2261 26.5385 29.359 26.5385C30.4919 26.5385 31.4103 25.5914 31.4103 24.4231C31.4103 23.2548 30.4919 22.3077 29.359 22.3077Z"
          fill="#337BFF"
        />
      </g>
      <defs>
        <clipPath id="clip0_662_3237">
          <rect width="61" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
