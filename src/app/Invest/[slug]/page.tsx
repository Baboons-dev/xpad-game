'use client';
import React, { useEffect, useState } from 'react';
import Icons from '@/config/icon';
//import '../../../assets/scss/participate-page.scss';
import { GetSingleClient, patchFund, sendFund } from '@/api/apiCalls/user';
import { useParams, useRouter } from 'next/navigation';
import { Button, InputNumber, InputNumberProps, message, Modal, Slider } from 'antd';
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

const ParticipatePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  max-width: 1600px;
  margin-top: 193px;
  margin-bottom: 193px;
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
  const { data: hash, isSuccess, isError, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
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
  const totalToDeposit = client?.detail_launch_price * client?.detail_token_for_sale;
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
    <ParticipatePageWrapper>
      <CardContainer>
        <div className="card-header-wrap">
          <Icons name="kinetix-icon"></Icons>
          <div className="intro">
            <p>Initial X Offering (IXO) powered by</p> <Icons name="xpad-icon"></Icons>
          </div>
        </div>
        {initialLoading ? (
          <div className="card-main">
            <div className="skeleton-loader">
              <div
                className="skeleton-item"
                style={{ width: '100%', height: '24px', marginBottom: '16px' }}></div>
              <div
                className="skeleton-item"
                style={{ width: '80%', height: '20px', marginBottom: '12px' }}></div>
              <div
                className="skeleton-item"
                style={{ width: '60%', height: '20px', marginBottom: '12px' }}></div>
              <div
                className="skeleton-item"
                style={{ width: '40%', height: '20px', marginBottom: '12px' }}></div>
              <div
                className="skeleton-item"
                style={{ width: '100%', height: '40px', marginBottom: '16px' }}></div>
              <div className="skeleton-item" style={{ width: '100%', height: '48px' }}></div>
            </div>
          </div>
        ) : client ? (
          isConnected ? (
            client.status === 'Live' &&
            !client.is_blacklisted &&
            chain &&
            chain.id === client.participate_chain_id ? (
              isLotteryWinner ? (
                <div className="card-main">
                  <div className="stats">
                    <div className="text-wrap">
                      <h3>
                        {client.sale_progress} /{' '}
                        {client.detail_launch_price * client.detail_token_for_sale} USD
                      </h3>
                      <h4>
                        Your Allocation: {client.max_user_deposit} {balance?.symbol}
                      </h4>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar-item max-w-[100%]"
                        style={{
                          width:
                            (client.sale_progress * 100) /
                              (client.detail_launch_price * client.detail_token_for_sale) +
                            `%`,
                        }}></div>
                    </div>
                    <div className="balance-wrap">
                      <p>
                        Balance: {balance?.formatted} {balance?.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="input-wrap">
                    <InputNumber min={0} max={maxReal()} value={inputValue} onChange={onChange} />
                    <div
                      style={{ cursor: 'pointer' }}
                      className="max max-button"
                      onClick={() => setInputValue(maxReal())}>
                      <p>
                        Max: {maxReal()} {balance?.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="btn-wrap">
                    {client.sold_out ? (
                      <button disabled>
                        <p>Sold Out</p>
                      </button>
                    ) : (
                      <Button
                        className="confirm-btn"
                        onClick={() => sendToken()}
                        loading={transactionLoading}
                        disabled={
                          inputValue > client.allocation || transactionLoading || inputValue === 0
                        }>
                        <p>Confirm</p>
                      </Button>
                    )}
                  </div>
                  {transactionLoading && (
                    <div className="loading-event-wrap">
                      <Icons name="loading-spin-icon"></Icons>
                      <h4>Processing...</h4>
                      <h4 style={{ fontSize: '14px', fontWeight: '400', opacity: '0.5' }}>
                        We are processing your deposit request, please wait patiently.
                      </h4>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card-main">
                  <div className="not-winner-message">
                    <p>Not a lottery winner</p>
                    <p>You are not eligible to participate in this IXO.</p>
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
        footer={false}
        closable={false}>
        <div className="ModalInnerWrap">
          <div className="modal-header-wrap">
            <Icons name="kinetix-icon"></Icons>
            <div className="intro">
              <p>Initial X Offering (IXO) powered by</p> <Icons name="xpad-icon"></Icons>
            </div>
          </div>

          <div className="modal-body-wrap">
            <div className="kinetix-modal-bg">
              <Icons name="kinetix-modal-bg"></Icons>
            </div>

            <div className="modal-row-wrap">
              <div className="text-wrap">
                <p>Investment Completed!</p>
                <h3>The transaction has been completed successfully!</h3>
                <h3
                  style={{
                    opacity: '0.5',
                    marginTop: '10px',
                    fontWeight: '500',
                  }}>
                  Note: In can take up to 3 minutes before your transaction will appear. Please
                  relax.
                </h3>
              </div>
              <button
                className="modal-btn"
                onClick={() => {
                  setSuccessModal(false); // Close the modal
                  router.push('/'); // Redirect to homepage
                }}>
                <p>Close</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        centered
        wrapClassName="ModalWrap"
        className="ModalElement"
        open={errorModal}
        footer={false}
        closable={false}>
        <div className="ModalInnerWrap">
          <div className="modal-header-wrap">
            <Icons name="kinetix-icon"></Icons>
            <div className="intro">
              <p>Initial X Offering (IXO) powered by</p> <Icons name="xpad-icon"></Icons>
            </div>
          </div>

          <div className="modal-body-wrap">
            <div className="kinetix-modal-bg error-bg">
              <Icons name="kinetix-error-modal-bg"></Icons>
            </div>

            <div className="modal-row-wrap error-modal">
              <div className="text-wrap">
                <p> Error Occurred!</p>
                <h3>
                  Sh*t. The pool was filled before your transaction was processed by the network.
                  Better luck next time!
                </h3>
              </div>
              <button
                className="modal-btn"
                onClick={() => {
                  setErrorModal(false); // Close the modal
                  router.push('/'); // Redirect to homepage
                }}>
                <p>Back to home</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </ParticipatePageWrapper>
  );
}
