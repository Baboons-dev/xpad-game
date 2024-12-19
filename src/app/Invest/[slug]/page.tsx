'use client';
import React, { useEffect, useState } from 'react';
import Icons from '@/config/icon';
//import '../../../assets/scss/participate-page.scss';
import { GetSingleClient, patchFund, sendFund } from '@/api/apiCalls/user';
import { useParams, useRouter } from 'next/navigation';

import {
  Button,
  ConfigProvider,
  InputNumber,
  InputNumberProps,
  message,
  Modal,
  Slider,
} from 'antd';
import {
  useAccount,
  useBalance,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
  useConnect,
} from 'wagmi';
import abi from '../../../utils/erc20.json';
import { parseEther } from 'viem';
import { getLotteryResults } from '@/api/apiCalls/user';
import { useSelector, useStore } from '@/store';
import styled from '@emotion/styled';
import { useAppKit } from '@reown/appkit/react';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

const ParticipatePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  max-width: 1600px;
  margin-top: 193px;
  margin-bottom: 193px;
  position: relative;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  align-items: center;
  width: 100%;
`;

export default function ParticipatePage() {
  const { address, chain, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();
  const [client, setClient] = useState<any>(null);
  const { open, close } = useAppKit();
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [inputValue, setInputValue] = useState(1);
  const [isLotteryWinner, setIsLotteryWinner] = useState<boolean>(false);
  const user = useStore((state) => state.user);
  const { slug }: any = useParams();
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const { data: balance } = useBalance({
    address: address,
    token: client?.participate_token_contract,
  });
  const {
    data: hash,
    isSuccess,
    isError,
    writeContract,
    error,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const getClient = async () => {
    setInitialLoading(true);
    try {
      const res = await GetSingleClient(slug);
      if (res) {
        setClient(res?.client);
      }
    } catch (e) {
      console.error('Error fetching client:', e);
    } finally {
      setInitialLoading(false);
    }
  };

  const checkLotteryWinner = async () => {
    if (!client || !client.id || !address) return;
    setInitialLoading(true);
    try {
      const lotteryResults = await getLotteryResults(client.id);
      const isWinner = lotteryResults.winners.some(
        (winner: any) => winner.wallet_address === address
      );
      setIsLotteryWinner(isWinner);
    } catch (error) {
      console.error('Error checking lottery winner:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    getClient();
  }, [slug]);

  useEffect(() => {
    if (client && address) {
      checkLotteryWinner();
    }
  }, [client, address]);

  useEffect(() => {
    if (address && chain && client && client.participate_chain_id) {
      if (chain.id !== client.participate_chain_id) {
        message.error('This network is not supported for participate');
        switchChain({
          chainId: client.participate_chain_id,
        });
      }
    }
  }, [address, chain, client]);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
  };

  useEffect(() => {
    // if (!(isAuthenticated && address)) {
    //   router.push('/login');
    // }
  }, [isAuthenticated, address]);

  const sendToken = async () => {
    if (!address) {
      message.warning('Please connect your wallet first');
      open({ view: 'Connect' });
      return;
    }

    if (inputValue <= max() && chain && client.wallet) {
      setTransactionLoading(true);
      try {
        await writeContract({
          abi,
          address: client.participate_token_contract,
          functionName: 'transfer',
          args: [client.wallet, parseEther(inputValue.toString())],
        });
      } catch (error) {
        console.error('Error initiating transaction:', error);
        setTransactionLoading(false);
        setErrorModal(true);
      }
    } else {
      message.error('Allocation is max or client wallet error');
    }
  };

  // const sendToken = async () => {
  //   if (inputValue <= max() && chain && client.wallet) {
  //     setLoading(true);

  //     // Set a timeout to stop loading after 2 minutes (120000 milliseconds)
  //     const loadingTimeout = setTimeout(() => {
  //       setLoading(false);
  //     }, 120000); // 2 minutes

  //     try {
  //       // The writeContract function triggers the transaction
  //       await writeContract({
  //         abi,
  //         address: client.participate_token_contract,
  //         functionName: 'transfer',
  //         args: [client.wallet, parseEther(inputValue.toString())],
  //       });

  //       // If the transaction completes before the timeout, clear the timeout and stop loading
  //       clearTimeout(loadingTimeout);
  //       setLoading(false);

  //     } catch (error) {
  //       console.error('Error during transaction:', error);

  //       // Stop the loading animation in case of an error
  //       clearTimeout(loadingTimeout);
  //       setLoading(false);
  //       message.error('Transaction failed. Please try again.');
  //     }
  //   } else {
  //     setLoading(false);
  //     message.error('Allocation is max or client wallet error');
  //   }
  // };
  useEffect(() => {
    if (isError) {
      setTransactionLoading(false);
      setErrorModal(true);
      console.log(error);
    } else if (hash && isSuccess && client?.id && chain?.id) {
      const confirmTransaction = async () => {
        try {
          await sendFund(client.id, hash, chain.id, inputValue);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          message.success('Transaction successfully processed...');
          getClient();
          setTransactionLoading(false);
          setSuccessModal(true);
        } catch (error) {
          console.error('Error confirming transaction:', error);
          setTransactionLoading(false);
          setErrorModal(true);
        }
      };

      confirmTransaction();
    }
  }, [isSuccess, isError, hash]);

  useEffect(() => {
    if (isConfirmed && hash) {
      getClient();
    }
  }, [hash, isConfirmed]);

  useEffect(() => {
    // if (
    //   !(isAuthenticated && isConnected && user.wallet_address && user.wallet_address === address)
    // ) {
    //   router.push('/login');
    // }
  }, [isAuthenticated, isConnected, user, address]);

  const totalDeposited = client?.sale_progress;
  const totalToDeposit =
    client?.detail_launch_price * client?.detail_token_for_sale;
  const saleRemaining = totalToDeposit - totalDeposited;

  const max = () => {
    if (client && balance) {
      if (Number(balance?.formatted) < client.allocation) {
        return Number(balance?.formatted);
      } else {
        return client.allocation;
      }
    }
    return 0;
  };

  const maxReal = () => {
    if (client && balance) {
      if (Number(saleRemaining) < client.allocation) {
        return Number(saleRemaining);
      } else {
        return max();
      }
    }
    return 0;
  };

  useEffect(() => {
    if (!isConnected && !address) {
      message.warning('Please connect your wallet first');
      open({ view: 'Connect' });
    }
  }, [isConnected, address]);

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            addonBg: 'transparent',
            colorBgContainer: 'transparent',
            colorBorder: 'transparent',
            activeBorderColor: 'transparent',
            hoverBorderColor: 'transparent',
            colorText: '#BEF642',
            colorTextPlaceholder: 'rgba(190, 246, 66, 0.25)',
            controlOutline: 'none',
            algorithm: true,
            fontFamily: "'Plus Jakarta Sans'",
            fontSize: 12,
          },
          Button: {
            colorPrimary: '#BEF642',
            colorPrimaryHover: '#BEF642',
            colorPrimaryActive: '#BEF642',
            primaryColor: '#000000',
            borderRadius: 50,
            controlHeight: 44,
            fontSize: 14,

            colorTextLightSolid: '#000000',
          },
        },
      }}>
      <Box position="absolute" w="100%" zIndex={0} top="62px">
        <Image
          src={'/background.png'}
          style={{
            position: 'absolute',
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
          }}
          alt="background"
          width={1920}
          height={1080}
        />
        <ParticipatePageWrapper>
          <p
            style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#fff',
              fontFamily: 'Plus Jakarta Sans',
              position: 'absolute',
              top: '-108px',
              transform: 'translateY(-50%)',
            }}>
            NOVA Real Chain
          </p>
          <CardContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Icons name="kinetix-icon"></Icons>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#BEF642',
                  }}>
                  Initial X Offering (IXO) powered by
                </p>{' '}
                <Icons name="xpad-icon"></Icons>
              </div>
            </div>

            {initialLoading ? (
              <div className="card-main">
                <div className="skeleton-loader">
                  <div
                    className="skeleton-item"
                    style={{
                      width: '100%',
                      height: '24px',
                      marginBottom: '16px',
                    }}></div>
                  <div
                    className="skeleton-item"
                    style={{
                      width: '80%',
                      height: '20px',
                      marginBottom: '12px',
                    }}></div>
                  <div
                    className="skeleton-item"
                    style={{
                      width: '60%',
                      height: '20px',
                      marginBottom: '12px',
                    }}></div>
                  <div
                    className="skeleton-item"
                    style={{
                      width: '40%',
                      height: '20px',
                      marginBottom: '12px',
                    }}></div>
                  <div
                    className="skeleton-item"
                    style={{
                      width: '100%',
                      height: '40px',
                      marginBottom: '16px',
                    }}></div>
                  <div
                    className="skeleton-item"
                    style={{ width: '100%', height: '48px' }}></div>
                </div>
              </div>
            ) : client ? (
              isConnected ? (
                client.status === 'Live' &&
                !client.is_blacklisted &&
                chain &&
                chain.id === client.participate_chain_id ? (
                  isLotteryWinner ? (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          backgroundColor: '#191916',
                          padding: '30px 15px',
                          borderRadius: '15px',
                          width: '100%',
                          marginTop: '20px',
                          position: 'relative',
                        }}>
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <p
                              style={{
                                fontSize: '12px',
                                fontWeight: '700',
                                color: '#BEF642',
                                fontFamily: 'Plus Jakarta Sans',
                              }}>
                              {client.sale_progress} /{' '}
                              {client.detail_launch_price *
                                client.detail_token_for_sale}{' '}
                              USD
                            </p>
                            <p
                              style={{
                                fontSize: '12px',
                                fontWeight: '700',
                                color: '#FFF',
                                fontFamily: 'Plus Jakarta Sans',
                              }}>
                              Your Allocation: {client.max_user_deposit}{' '}
                              {balance?.symbol}
                            </p>
                          </div>
                          <div
                            style={{
                              width: '100%',
                              height: '4px',
                              borderRadius: '20px',
                              backgroundColor: '#000',
                              position: 'relative',
                              marginTop: '8px',
                            }}>
                            <div
                              style={{
                                width: `${
                                  (client.sale_progress * 100) /
                                  (client.detail_launch_price *
                                    client.detail_token_for_sale)
                                }%`,
                                height: '8px',
                                borderRadius: '20px',
                                marginTop: '-2px',
                                backgroundColor: '#BEF642',
                              }}></div>
                          </div>

                          <div
                            style={{
                              marginTop: '15px',
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}>
                            <p
                              style={{
                                fontSize: '12px',
                                fontWeight: '300',
                                color: '#FFF',
                                fontFamily: 'Plus Jakarta Sans',
                              }}>
                              Balance: {balance?.formatted} {balance?.symbol}
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#000',
                            borderRadius: '50px',
                            padding: '14px 20px 14px 17px',
                          }}>
                          <InputNumber
                            min={0}
                            max={maxReal()}
                            value={inputValue}
                            onChange={onChange}
                            placeholder="0"
                          />
                          <div
                            style={{ cursor: 'pointer' }}
                            className="max max-button"
                            onClick={() => setInputValue(maxReal())}>
                            <p
                              style={{
                                fontSize: '12px',
                                fontWeight: '500',
                                color: '#BEF642',
                              }}>
                              Max: {maxReal()} {balance?.symbol}
                            </p>
                          </div>
                        </div>
                        <div style={{ marginTop: '15px' }}>
                          {client.sold_out ? (
                            <Button disabled type="primary">
                              <span
                                style={{
                                  fontWeight: '800',
                                  fontFamily: 'Plus Jakarta Sans',
                                }}>
                                {' '}
                                Sold Out
                              </span>
                            </Button>
                          ) : (
                            <Button
                              className="confirm-btn"
                              onClick={() => sendToken()}
                              loading={transactionLoading}
                              style={{ width: '100%' }}
                              type="primary"
                              disabled={
                                inputValue > client.allocation ||
                                transactionLoading ||
                                inputValue === 0
                              }>
                              <span
                                style={{
                                  fontWeight: '800',
                                  fontFamily: 'Plus Jakarta Sans',
                                }}>
                                Confirm
                              </span>
                            </Button>
                          )}
                        </div>
                        {transactionLoading && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              width: '100%',
                              height: '120%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column',
                              gap: '15px',
                              backgroundColor: 'rgba(25, 25, 22, 0.97)',
                              borderRadius: '15px',
                              padding: '0px 28px',
                              backdropFilter: 'blur(2px)',
                            }}>
                            <div
                              style={{
                                animation: 'rotateAndFade 2s infinite',
                                width: '30px', // Adjust size if needed
                                height: '30px',
                                display: 'flex', // To ensure alignment for the icon
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Icons name="loading-spin-icon" />
                            </div>
                            <p
                              style={{
                                fontSize: '18px',
                                fontWeight: '800',
                                fontFamily: 'Plus Jakarta Sans',
                                color: '#fff',
                              }}>
                              Processing...
                            </p>
                            <p
                              style={{
                                fontSize: '14px',
                                fontWeight: '500',
                                fontFamily: 'Plus Jakarta Sans',
                                color: '#fff',
                                textAlign: 'center',
                              }}>
                              We are processing your deposit request. This may
                              take up to 1 minute.
                            </p>
                            <p
                              style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                fontFamily: 'Plus Jakarta Sans',
                                color: '#bef642',
                                textAlign: 'center',
                              }}>
                              Please open your Metamask app to approve the
                              transaction and keep this app open until it's
                              complete.
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="card-main">
                      <div className="not-winner-message">
                        <p style={{ color: '#FFF' }}>Not a lottery winner</p>
                        <p style={{ color: '#FFF' }}>
                          You are not eligible to participate in this IXO.
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="card-main">
                    <div className="error-message">
                      {client.is_blacklisted
                        ? 'Not whitelisted'
                        : isConnected
                        ? 'Please change your network to participate in this IXO'
                        : 'Please connect your wallet to participate in this IXO'}
                    </div>
                  </div>
                )
              ) : (
                <div className="card-main">
                  <div className="error-message">Connecting to wallet...</div>
                </div>
              )
            ) : (
              <div className="card-main">
                <div className="error-message">Failed to load client data</div>
              </div>
            )}
          </CardContainer>

          {/* Success Modal */}
          <Modal
            centered
            wrapClassName="ModalWrap"
            className="ModalElement"
            open={successModal}
            //open={true}
            footer={false}
            closable={false}
            height={343}
            width="100%"
            styles={{
              body: {
                padding: 0,
                borderRadius: '15px',
              },
              content: {
                padding: 0,
                borderRadius: '15px',
              },
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: '15px',
                alignItems: 'center',
                backgroundImage: 'url("/Vector.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '343px',
                width: '100%',
                backgroundColor: '#191916',
                borderRadius: '13px',
                paddingBottom: '30px',
                paddingLeft: '15px',
                paddingRight: '15px',
              }}>
              <Image
                src="/img.svg"
                alt="success"
                width={100}
                height={100}></Image>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#BEF642',
                  fontFamily: 'Plus Jakarta Sans',
                }}>
                Investment Completed!
              </p>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#FFF',
                  fontFamily: 'Plus Jakarta Sans',
                  marginTop: '-10px',
                }}>
                Thank you for investing in this IXO.
              </h3>

              <Button
                type="primary"
                className="modal-btn"
                style={{ width: '100%' }}
                onClick={() => {
                  setSuccessModal(false); // Close the modal
                  router.push('/'); // Redirect to homepage
                }}>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Plus Jakarta Sans',
                  }}>
                  Close
                </p>
              </Button>
            </div>
          </Modal>

          {/* Error Modal */}
          <Modal
            centered
            wrapClassName="ModalWrap"
            className="ModalElement"
            open={errorModal}
            //open={true}
            footer={false}
            closable={false}
            height={357}
            width="100%"
            styles={{
              body: {
                padding: 0,
                borderRadius: '15px',
              },
              content: {
                padding: 0,
                borderRadius: '15px',
              },
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: '15px',
                alignItems: 'center',
                backgroundImage: 'url("/Vector.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '357px',
                width: '100%',
                backgroundColor: '#191916',
                borderRadius: '13px',
                paddingBottom: '30px',
                paddingLeft: '15px',
                paddingRight: '15px',
              }}>
              <Image
                src="/SHIT..svg"
                alt="success"
                width={197}
                height={160}></Image>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#FF527B',
                  fontFamily: 'Plus Jakarta Sans',
                }}>
                Error Occurred!
              </p>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#FFF',
                  fontFamily: 'Plus Jakarta Sans',
                  marginTop: '-10px',
                  textAlign: 'center',
                }}>
                Sh*t. The pool was filled before your transaction was processed
                by the network. Better luck next time!
              </h3>

              <Button
                type="primary"
                className="modal-btn"
                style={{ width: '100%' }}
                onClick={() => {
                  setErrorModal(false); // Close the modal
                  router.push('/'); // Redirect to homepage
                }}>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Plus Jakarta Sans',
                  }}>
                  Back to home
                </p>
              </Button>
            </div>
          </Modal>
        </ParticipatePageWrapper>
      </Box>
    </ConfigProvider>
  );
}
