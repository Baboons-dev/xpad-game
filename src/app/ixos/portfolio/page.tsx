'use client';

import React, { useEffect, useState } from 'react';
import { Decimal } from 'decimal.js';
//import '../../assets/scss/portfolio-page.scss';
import { GetFundraiseData, ClaimTokens, getClaimedTokens } from '@/api/apiCalls/user';
import Icons from '@/config/icon';
import { filePath } from '@/api/axios';
import { Modal } from 'antd';
import { useSelector } from '@/store';
import router from 'next/router';
import { Box, Text, Image } from '@chakra-ui/react';
import backgroundImage from '../../../assets/background.png';

import Link from 'next/link';
import BackArrowIcon from '@/icons/ArrowBack';
import { Tabs } from 'antd';
import Breadcrumbs from '@/components/Breadcrumbs';

interface ClientData {
  title: string;
  avatar_url: string | null;
  website_url: string | null;
  twitter_url: string | null;
  discord_url: string | null;
  telegram_url: string | null;
}

interface ClaimRequest {
  payout_part: number;
  amount: string;
  claimed: boolean;
  payout_requested: boolean;
  unlock_date: string;
  percentage: number;
}

interface FundraiseData {
  client_id: number;
  client_title: string;
  client_data: ClientData;
  total_deposit: string;
  tokens_to_receive: string;
  detail_token_symbol: string;
  tge_date: string;
  detail_tge_percent: string;
  detail_vesting: number;
  tge_release: string;
  claimable_percentage: string;
  claim_requests: ClaimRequest[];
}

interface TokensClaimed {
  client_id: number;
  wallet_address: string;
  tokensent: string;
  totalsent: string;
  tx: {
    hash: string;
    chain_id: number;
  };
}

export default function PortfolioPage() {
  const { user } = useSelector((state: any) => state.user || {});
  const [vestedPotfolioData, setVestedPotfolioData] = useState<FundraiseData[]>([]);
  const [claimedPotfolioData, setClaimedPotfolioData] = useState<FundraiseData[]>([]);
  const [countdown, setCountdown] = useState<{ [key: number]: string }>({});
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [vestedPotfolioData]);

  const fetchData = async () => {
    try {
      const data = await GetFundraiseData();

      // Filter vestedPotfolioData
      const vestedPortfolioData = data.filter((item: FundraiseData) =>
        item.claim_requests.some(
          (request) => !request.claimed || (request.payout_requested && !request.claimed)
        )
      );

      const claimedPortfolioData = data.filter((item: FundraiseData) =>
        item.claim_requests.every((request) => request.claimed)
      );

      setVestedPotfolioData(vestedPortfolioData);
      setClaimedPotfolioData(claimedPortfolioData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateCountdown = () => {
    setCountdown((prevCountdown) => {
      const newCountdown: { [key: number]: string } = {};
      vestedPotfolioData.forEach((data) => {
        const nextClaimDate = getNextClaimDate(data);
        newCountdown[data.client_id] = calculateCountdown(nextClaimDate);
      });
      return newCountdown;
    });
  };

  const calculateCountdown = (targetDate: Date | null) => {
    if (!targetDate) return 'No upcoming claims';

    const now = new Date().getTime();
    const timeLeft = targetDate.getTime() - now;

    if (timeLeft < 0) {
      return 'Claiming is now available!';
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const getNextClaimDate = (data: FundraiseData) => {
    const unclaimedRequests = data.claim_requests
      .filter((request) => !request.claimed && !request.payout_requested)
      .sort((a, b) => new Date(a.unlock_date).getTime() - new Date(b.unlock_date).getTime());

    return unclaimedRequests.length > 0 ? new Date(unclaimedRequests[0].unlock_date) : null;
  };

  const isClaimingLocked = (data: FundraiseData) => {
    const unclaimedRequest = data.claim_requests?.find(
      (request) => !request.claimed && !request.payout_requested
    );

    // Check for current claimable requests
    const currentClaimableRequests = data.claim_requests?.filter(
      (request) =>
        new Date(request.unlock_date) <= new Date() && !request.claimed && !request.payout_requested
    );

    if (!unclaimedRequest && (!currentClaimableRequests || currentClaimableRequests.length === 0)) {
      return true;
    }

    if (!unclaimedRequest) return false;

    const unlockDate = new Date(unclaimedRequest.unlock_date);
    return new Date() < unlockDate;
  };

  // State for success modal visibility
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  // State for error modal visibility
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  // Function to show the success modal
  const showSuccessModal = () => {
    setIsSuccessModalVisible(true);
  };

  // Function to show the error modal
  const showErrorModal = () => {
    setIsErrorModalVisible(true);
  };

  // Function to close the success modal
  const handleSuccessOk = () => {
    setIsSuccessModalVisible(false);
  };

  // Function to close the error modal
  const handleErrorOk = () => {
    setIsErrorModalVisible(false);
  };

  const handleClaim = async (fundraiseData: FundraiseData) => {
    try {
      const unclaimedRequests = fundraiseData.claim_requests.filter(
        (request: ClaimRequest) => !request.claimed
      );

      if (!unclaimedRequests.length) {
        throw new Error('No unclaimed requests available');
      }

      const response = await ClaimTokens(fundraiseData.client_id);
      await fetchData();
      showSuccessModal();
    } catch (error) {
      console.error('Error claiming tokens:', error);
      showErrorModal();
    }
  };

  const renderVestedPortfolio = () => (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingBottom: '70px',
        }}>
        {vestedPotfolioData.map((data: FundraiseData) => {
          const claimedAmount = data.claim_requests
            .filter((request) => request.claimed)
            .reduce((total, request) => total + parseFloat(request.amount), 0);

          const remainingVested = data.claim_requests
            .filter((request) => !request.claimed)
            .reduce((total, request) => total + parseFloat(request.amount), 0);

          const currentClaimableRequests: ClaimRequest[] =
            data.claim_requests?.filter(
              (request) =>
                new Date(request.unlock_date) <= new Date() &&
                !request.claimed &&
                !request.payout_requested
            ) || [];

          const upcomingClaimRequest: ClaimRequest | undefined = data.claim_requests?.find(
            (request) =>
              new Date(request.unlock_date) > new Date() &&
              !request.claimed &&
              !request.payout_requested
          );

          const requestedClaims: ClaimRequest[] = data.claim_requests?.filter(
            (request) =>
              new Date(request.unlock_date) <= new Date() &&
              !request.claimed &&
              request.payout_requested
          );

          const totalTokensToReceive = parseFloat(data.tokens_to_receive);

          const claimedPercentage =
            totalTokensToReceive > 0 ? (claimedAmount / totalTokensToReceive) * 100 : 0;

          const totalVestedPercentage =
            remainingVested > 0 ? (remainingVested / totalTokensToReceive) * 100 : 0;

          return (
            <div
              key={data.client_id}
              style={{
                width: '100%',
                padding: '20px 15px',
                borderRadius: '12px',
                border: '1px solid #363D22',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}>
                  <img
                    src={
                      filePath(data.client_data.avatar_url)
                        ? filePath(data.client_data.avatar_url)
                        : '/xpad_ico.pn'
                    }
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', // This ensures the image covers the container while maintaining aspect ratio
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p
                    style={{
                      fontSize: '18px',
                      fontWeight: '800',
                      color: '#fff',
                      fontFamily: 'Plus Jakarta Sans',
                    }}>
                    {data.client_title}
                  </p>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {data.client_data.website_url && (
                      <>
                        {data.client_data.website_url.startsWith('') ? (
                          <a href={data.client_data.website_url}>
                            <div className="icon-wrap">
                              <Icons name="globe-icon-socials" />
                            </div>
                          </a>
                        ) : data.client_data.website_url.startsWith('www.') ? (
                          <a href={'https://' + data.client_data.website_url}>
                            <div className="icon-wrap">
                              <Icons name="globe-icon-socials" />
                            </div>
                          </a>
                        ) : (
                          <a href={'https://www.' + data.client_data.website_url}>
                            <div className="icon-wrap">
                              <Icons name="globe-icon-socials" />
                            </div>
                          </a>
                        )}
                      </>
                    )}

                    {data.client_data.twitter_url && (
                      <>
                        {data.client_data.twitter_url.startsWith('') ? (
                          <a href={data.client_data.twitter_url}>
                            <div className="icon-wrap">
                              <Icons name="x-icon-socials" />
                            </div>
                          </a>
                        ) : data.client_data.twitter_url.startsWith('www.') ? (
                          <a href={'https://' + data.client_data.twitter_url}>
                            <div className="icon-wrap">
                              <Icons name="x-icon-socials" />
                            </div>
                          </a>
                        ) : (
                          <a href={'https://www.' + data.client_data.twitter_url}>
                            <div className="icon-wrap">
                              <Icons name="x-icon-socials" />
                            </div>
                          </a>
                        )}
                      </>
                    )}

                    {data.client_data.discord_url && (
                      <>
                        {data.client_data.discord_url.startsWith('') ? (
                          <a href={data.client_data.discord_url}>
                            <div className="icon-wrap">
                              <Icons name="discord-icon-socials" />
                            </div>
                          </a>
                        ) : data.client_data.discord_url.startsWith('www.') ? (
                          <a href={'https://' + data.client_data.discord_url}>
                            <div className="icon-wrap">
                              <Icons name="discord-icon-socials" />
                            </div>
                          </a>
                        ) : (
                          <a href={'https://www.' + data.client_data.discord_url}>
                            <div className="icon-wrap">
                              <Icons name="discord-icon-socials" />
                            </div>
                          </a>
                        )}
                      </>
                    )}

                    {data.client_data.telegram_url && (
                      <>
                        {data.client_data.telegram_url.startsWith('') ? (
                          <a href={data.client_data.telegram_url}>
                            <div className="icon-wrap">
                              <Icons name="telegram-icon-socials" />
                            </div>
                          </a>
                        ) : data.client_data.telegram_url.startsWith('www.') ? (
                          <a href={'https://' + data.client_data.telegram_url}>
                            <div className="icon-wrap">
                              <Icons name="telegram-icon-socials" />
                            </div>
                          </a>
                        ) : (
                          <a href={'https://www.' + data.client_data.telegram_url}>
                            <div className="icon-wrap">
                              <Icons name="telegram-icon-socials" />
                            </div>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                <div className="profile-data-item">
                  <h2>Invested</h2>
                  <h3>{data.total_deposit} USD</h3>
                </div>
                <div className="profile-data-item">
                  <h2>Total Vested ({totalVestedPercentage})%</h2>

                  <h3>
                    {remainingVested.toFixed(2)} {data.detail_token_symbol}{' '}
                  </h3>
                </div>
                <div className="profile-data-item">
                  <h2>Claimed ({claimedPercentage}%)</h2>
                  <h3>
                    {claimedAmount} {data.detail_token_symbol}
                  </h3>
                </div>

                <div className="profile-data-item">
                  {requestedClaims.length > 0 && (
                    <>
                      <h2>
                        Requested Claims (
                        {requestedClaims
                          .reduce((total, request) => total + request.percentage, 0)
                          .toFixed(2)}
                        %)
                      </h2>

                      <h3>
                        {requestedClaims
                          .reduce((total, request) => total + parseFloat(request.amount), 0)
                          .toFixed(2)}{' '}
                        {data.detail_token_symbol}
                      </h3>
                    </>
                  )}
                </div>

                <div className="profile-data-item">
                  {currentClaimableRequests.length == 0 && upcomingClaimRequest && (
                    <>
                      <h2>Upcoming Claim ({upcomingClaimRequest.percentage}%)</h2>

                      <h3 key={upcomingClaimRequest.amount} style={{ color: '#BEF642' }}>
                        {upcomingClaimRequest.amount} {data.detail_token_symbol}
                      </h3>
                    </>
                  )}
                </div>

                {currentClaimableRequests.length > 0 && (
                  <div className="profile-data-item Claimable">
                    <>
                      <h2>
                        Claimable (
                        {currentClaimableRequests
                          .reduce((total, request) => total + request.percentage, 0)
                          .toFixed(2)}
                        %)
                      </h2>
                      <h3 style={{}}>
                        {currentClaimableRequests
                          .reduce((total, request) => total + parseFloat(request.amount), 0)
                          .toFixed(2)}{' '}
                        {data.detail_token_symbol}
                      </h3>
                    </>
                  </div>
                )}
              </div>

              <div className="profile-btn-wrap">
                <button
                  onClick={() => handleClaim(data)}
                  disabled={isClaimingLocked(data)}
                  className={isClaimingLocked(data) ? 'btn-style-2' : 'btn-style-1'}
                  style={{
                    borderRadius: '50px',
                  }}>
                  {getButtonLabel(data)}
                </button>

                {/* Success Modal */}
                <Modal
                  centered
                  visible={isSuccessModalVisible}
                  //visible={true}
                  footer={null} // Remove default footer
                  onCancel={handleSuccessOk} // Close modal when clicking outside or on the X button
                  styles={{
                    content: {
                      backgroundColor: 'transparent',
                    },
                  }}>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <Icons name="kinetix-icon" />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        justifyContent: 'center',
                        marginTop: '10px',
                      }}>
                      <p
                        style={{
                          color: '#BEF642',
                          fontSize: '14px',
                          fontWeight: '500',
                          fontFamily: 'Plus Jakarta Sans',
                        }}>
                        Initial X Offering (IXO) powered by
                      </p>{' '}
                      <Icons name="xpad-icon" />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        backgroundColor: '#191916',
                        borderRadius: '15px',
                        padding: '30px 15px',
                        marginTop: '20px',
                        width: '100%',
                        position: 'relative',
                        backgroundImage: 'url(/Vector.svg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}>
                      <Image src="/img.svg" alt="kinetix-modal-bg" height="160px" w="156px" />

                      <p
                        style={{
                          color: '#BEF642',
                          fontSize: '18px',
                          fontWeight: '700',
                          fontFamily: 'Plus Jakarta Sans',
                          textAlign: 'center',
                          marginTop: '15px',
                        }}>
                        You&apos;ve Requested a Claim!
                      </p>
                      <h3
                        style={{
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '700',
                          fontFamily: 'Plus Jakarta Sans',
                          textAlign: 'center',
                          marginTop: '5px',
                          lineHeight: 'normal',
                        }}>
                        We have received your claim request successfully.
                      </h3>
                      <h3
                        style={{
                          opacity: '0.5',
                          color: 'rgba(255, 255, 255, 0.50)',
                          fontSize: '12px',
                          fontWeight: '700',
                          fontFamily: 'Plus Jakarta Sans',
                          textAlign: 'center',
                          marginTop: '16px',
                          lineHeight: 'normal',
                        }}>
                        Note: It can take up to 48 hours to receive your tokens. Please be patient.
                      </h3>

                      <button
                        style={{
                          marginTop: '15px',
                          borderRadius: '50px',
                          backgroundColor: '#BEF642',
                          height: '44px',
                          width: '100%',
                        }}
                        onClick={handleSuccessOk}
                        className="btn-style-1">
                        <p
                          style={{
                            color: '#000000',
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: 'Plus Jakarta Sans',
                          }}>
                          Close
                        </p>
                      </button>
                    </div>
                  </div>
                </Modal>

                {/* Error Modal */}
                <Modal
                  centered
                  wrapClassName="ModalWrap"
                  className="ModalElement"
                  visible={isErrorModalVisible}
                  //visible={true}
                  footer={null} // Remove default footer
                  onCancel={handleErrorOk} // Close modal when clicking outside or on the X button
                  styles={{
                    content: {
                      backgroundColor: 'transparent',
                    },
                  }}>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <Icons name="kinetix-icon" />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        justifyContent: 'center',
                        marginTop: '10px',
                      }}>
                      <p
                        style={{
                          color: '#BEF642',
                          fontSize: '14px',
                          fontWeight: '500',
                          fontFamily: 'Plus Jakarta Sans',
                        }}>
                        Initial X Offering (IXO) powered by
                      </p>{' '}
                      <Icons name="xpad-icon" />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        backgroundColor: '#191916',
                        borderRadius: '15px',
                        padding: '30px 15px',
                        marginTop: '20px',
                        width: '100%',
                        position: 'relative',
                        backgroundImage: 'url(/Vector.svg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}>
                      <Image src="/img.svg" alt="kinetix-modal-bg" height="160px" w="156px" />

                      <p
                        style={{
                          color: '#BEF642',
                          fontSize: '18px',
                          fontWeight: '700',
                          fontFamily: 'Plus Jakarta Sans',
                          textAlign: 'center',
                          marginTop: '15px',
                        }}>
                        Error Occurred!
                      </p>
                      <h3
                        style={{
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '700',
                          fontFamily: 'Plus Jakarta Sans',
                          textAlign: 'center',
                          marginTop: '5px',
                          lineHeight: 'normal',
                        }}>
                        Sh*t. An error occurred while submitting your claim request. Please try
                        again later.
                      </h3>

                      <button
                        style={{
                          marginTop: '15px',
                          borderRadius: '50px',
                          backgroundColor: '#BEF642',
                          height: '44px',
                          width: '100%',
                        }}
                        onClick={handleErrorOk}
                        className="btn-style-1">
                        <p
                          style={{
                            color: '#000000',
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: 'Plus Jakarta Sans',
                          }}>
                          Close
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* <div className="modal-row-wrap error-modal">
                    <div className="text-wrap">
                      <p> Error Occurred!</p>
                      <h3>
                        Sh*t. An error occurred while submitting your claim request. Please try
                        again later.
                      </h3>
                    </div>
                    <button className="modal-btn" onClick={handleErrorOk}>
                      <p>Close</p>
                    </button>
                  </div> */}
                </Modal>

                {/* <Modal
                  title="Error"
                  visible={isErrorModalVisible}
                  onOk={handleErrorOk}
                  onCancel={handleErrorOk} // Close modal on cancel too
                >
                  <p>There was an error claiming the tokens. Please try again.</p>
                </Modal> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const renderClaimedPortfolio = () => {
    return (
      <>
        <div
          className="IXO-card-container claimed-portfolio"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '70px' }}>
          {/* Render portfolio items if there are any */}
          {claimedPotfolioData.length > 0 ? (
            claimedPotfolioData.map((data) => {
              const totalInvested = new Decimal(data.total_deposit);

              const claimedAmount = data.claim_requests
                .filter((request) => request.claimed)
                .reduce((total, request) => total + parseFloat(request.amount), 0);

              const totalTokensToReceive = parseFloat(data.tokens_to_receive);

              const claimedPercentage =
                totalTokensToReceive > 0 ? (claimedAmount / totalTokensToReceive) * 100 : 0;

              return (
                <div
                  key={data.client_id}
                  className="IXO-card-item"
                  style={{
                    padding: '20px 15px',
                    borderRadius: '12px',
                    border: '1px solid #363D22',
                  }}>
                  <div
                    className="profile-info-wrap"
                    style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div
                      className="profile-img-container"
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                      }}>
                      <img
                        src={
                          filePath(data.client_data.avatar_url)
                            ? filePath(data.client_data.avatar_url)
                            : '/xpad_logo'
                        }
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover', // Ensures the image covers the container while maintaining aspect ratio
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p
                        style={{
                          fontSize: '18px',
                          fontWeight: '800',
                          color: '#fff',
                          fontFamily: 'Plus Jakarta Sans',
                        }}>
                        {data.client_title}
                      </p>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        {data.client_data.website_url && (
                          <>
                            {data.client_data.website_url.startsWith('') ? (
                              <a href={data.client_data.website_url}>
                                <div className="icon-wrap">
                                  <Icons name="globe-icon-socials" />
                                </div>
                              </a>
                            ) : data.client_data.website_url.startsWith('www.') ? (
                              <a href={'https://' + data.client_data.website_url}>
                                <div className="icon-wrap">
                                  <Icons name="globe-icon-socials" />
                                </div>
                              </a>
                            ) : (
                              <a href={'https://www.' + data.client_data.website_url}>
                                <div className="icon-wrap">
                                  <Icons name="globe-icon-socials" />
                                </div>
                              </a>
                            )}
                          </>
                        )}

                        {data.client_data.twitter_url && (
                          <>
                            {data.client_data.twitter_url.startsWith('') ? (
                              <a href={data.client_data.twitter_url}>
                                <div className="icon-wrap">
                                  <Icons name="x-icon-socials" />
                                </div>
                              </a>
                            ) : data.client_data.twitter_url.startsWith('www.') ? (
                              <a href={'https://' + data.client_data.twitter_url}>
                                <div className="icon-wrap">
                                  <Icons name="x-icon-socials" />
                                </div>
                              </a>
                            ) : (
                              <a href={'https://www.' + data.client_data.twitter_url}>
                                <div className="icon-wrap">
                                  <Icons name="x-icon-socials" />
                                </div>
                              </a>
                            )}
                          </>
                        )}

                        {data.client_data.discord_url && (
                          <>
                            {data.client_data.discord_url.startsWith('') ? (
                              <a href={data.client_data.discord_url}>
                                <div className="icon-wrap">
                                  <Icons name="discord-icon-socials" />
                                </div>
                              </a>
                            ) : data.client_data.discord_url.startsWith('www.') ? (
                              <a href={'https://' + data.client_data.discord_url}>
                                <div className="icon-wrap">
                                  <Icons name="discord-icon-socials" />
                                </div>
                              </a>
                            ) : (
                              <a href={'https://www.' + data.client_data.discord_url}>
                                <div className="icon-wrap">
                                  <Icons name="discord-icon-socials" />
                                </div>
                              </a>
                            )}
                          </>
                        )}

                        {data.client_data.telegram_url && (
                          <>
                            {data.client_data.telegram_url.startsWith('') ? (
                              <a href={data.client_data.telegram_url}>
                                <div className="icon-wrap">
                                  <Icons name="telegram-icon-socials" />
                                </div>
                              </a>
                            ) : data.client_data.telegram_url.startsWith('www.') ? (
                              <a href={'https://' + data.client_data.telegram_url}>
                                <div className="icon-wrap">
                                  <Icons name="telegram-icon-socials" />
                                </div>
                              </a>
                            ) : (
                              <a href={'https://www.' + data.client_data.telegram_url}>
                                <div className="icon-wrap">
                                  <Icons name="telegram-icon-socials" />
                                </div>
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="profile-data-wrap"
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}>
                    <div className="profile-data-item">
                      <h2>Invested</h2>
                      <h3>{totalInvested.toFixed(2)} USDT</h3>
                    </div>
                    <div className="profile-data-item">
                      <h2>Total Vested (0%)</h2>
                      <h3>0 {data.detail_token_symbol}</h3>
                    </div>
                    <div className="profile-data-item">
                      <h2>Claimed {claimedPercentage}</h2>
                      <h3>
                        {totalTokensToReceive} {data.detail_token_symbol}
                      </h3>
                    </div>
                  </div>

                  <div className="profile-btn-wrap">
                    <button
                      className="btn-style-3"
                      style={{
                        padding: '10px 20px',
                        borderRadius: '50px',
                        backgroundColor: '#47473B',
                        color: '#000000',
                      }}>
                      <p>Claimed 100%</p>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            // Render message if no projects to display
            <p
              style={{
                opacity: '0.4',
                marginTop: '40px',
                color: '#fff',
                width: '100%',
                textAlign: 'center',
              }}>
              All 100% paid out IXOs are shown here.
            </p>
          )}
        </div>
      </>
    );
  };

  const renderKycNotice = () => {
    if (!user) return null;

    switch (user.kyc_status) {
      case 'incomplete':
        return (
          <div className="kyc-status-item mb-[50px]">
            <Icons name="kyc-not-done-icon" />
            <p>
              Note: Before you can start investing in an IXO, you are required to complete a KYC
              verification. Please{' '}
              <span className="span-item" onClick={() => router.push('/settings')}>
                complete your KYC
              </span>{' '}
              to proceed with your investment.
            </p>
          </div>
        );
      case 'waiting':
      case 'inreview':
        return (
          <div className="kyc-status-item mb-[50px]">
            <Icons name="kyc-in-review-icon" />
            <p>
              Note: Your KYC verification is in review. You can start an investment once your
              account is verified.
            </p>
          </div>
        );
      case 'approved':
        return null;
      case 'rejected':
        return (
          <div className="kyc-status-item mb-[50px]">
            <Icons name="kyc-not-done-icon" />
            <p>Your KYC verification was rejected. Please contact support for assistance.</p>
          </div>
        );
      case 'blocked':
        return (
          <div className="kyc-status-item mb-[50px]">
            <Icons name="kyc-not-done-icon" />
            <p>Your account has been blocked. Please contact support for assistance.</p>
          </div>
        );
      default:
        return null;
    }
  };

  // New helper function to determine button label
  const getButtonLabel = (data: FundraiseData) => {
    const nextClaimDate = getNextClaimDate(data);

    if (!nextClaimDate) {
      return 'No Upcoming Claims';
    }

    const now = new Date();
    if (nextClaimDate <= now) {
      const claimableRequest = data.claim_requests.find(
        (request) =>
          !request.claimed && !request.payout_requested && new Date(request.unlock_date) <= now
      );
      if (claimableRequest) {
        return `Claim ${claimableRequest.amount} ${data.detail_token_symbol}`;
      }
    }

    return `Next claim in ${calculateCountdown(nextClaimDate)}`;
  };

  return (
    <>
      <Box position="relative" w="100%" zIndex={0}>
        <Image
          src={backgroundImage.src}
          alt="background"
          h="auto"
          objectFit="contain"
          position="absolute"
        />
        <Box position="relative" margin="0px 16px 29px 16px">
          <Box
            display="flex"
            alignItems="center"
            padding="36px 0px 0px 0px"
            style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Box style={{ width: '100%' }}>
              <Breadcrumbs
                backLink="/"
                items={[{ label: 'IXOs', link: '/ixos' }]}
                activeTab={
                  activeTab === '1'
                    ? `IXO Portfolio / Vested Portfolio`
                    : 'IXO Portfolio / Claimed Portfolio'
                }
                color="#BEF642"
              />
            </Box>
            <Box width="100%" display="flex" justifyContent="center">
              <Text
                color="#BEF642"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="800"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans">
                IXO Portfolio
              </Text>
            </Box>
          </Box>
        </Box>

        <Box
          padding="0px 16px 0px 16px"
          w="100%"
          position="relative"
          style={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs
            defaultActiveKey="1"
            className="ixo-tabs"
            style={{ width: '100%' }}
            onChange={(key) => setActiveTab(key)}
            items={[
              {
                label: 'Vested Portfolio',
                key: '1',
                children: (
                  <Box className="space-y-4" style={{ width: '100%' }}>
                    {renderVestedPortfolio()}
                  </Box>
                ),
              },
              {
                label: 'Claimed portfolio',
                key: '2',
                children: (
                  <Box className="space-y-4" style={{ width: '100%' }}>
                    {renderClaimedPortfolio()}
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </Box>
      <style jsx global>{`
        .ixo-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ixo-tabs .ant-tabs-tab {
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Plus Jakarta Sans';
        }

        .ixo-tabs .ant-tabs-tab:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .ixo-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #bef642;
        }

        .ixo-tabs .ant-tabs-ink-bar {
          background: #bef642;
        }
      `}</style>
    </>
  );
}

//  <div className="portfolio-page">
//    <div className="kyc-status-banner-warp">{renderKycNotice()}</div>
//    <h2 style={{ color: 'white' }}>Hello</h2>

//
//    {renderClaimedPortfolio()}
//  </div>;
