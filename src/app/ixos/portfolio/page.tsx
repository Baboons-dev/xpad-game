'use client';

import { Box, Image, Text } from '@chakra-ui/react';
import backgroundImage from '../../../assets/background.png';
import Link from 'next/link';
import BackArrowIcon from '@/icons/ArrowBack';
import { useEffect, useState } from 'react';
import { GetFundraiseData, ClaimTokens, getClaimedTokens } from '@/api/apiCalls/user';
import { Modal } from 'antd';
import Icons from '@/config/icon';
//import { filePath } from '@/api/axios';
import router from 'next/router';
import { useSelector, useStore } from '@/store';
import { Decimal } from 'decimal.js';
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
  unlock_date: string;
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
  const user = useStore((state) => state.user);
  const [fundraiseData, setFundraiseData] = useState<FundraiseData[]>([]);
  const [countdown, setCountdown] = useState<{ [key: number]: string }>({});
  const [claimedTokensData, setClaimedTokensData] = useState<{ [key: number]: TokensClaimed[] }>(
    {}
  );
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [fundraiseData]);

  const fetchData = async () => {
    try {
      const data = await GetFundraiseData();
      setFundraiseData(data);
      initializeCountdown(data);

      const claimedTokensPromises = data.map((project: any) => getClaimedTokens(project.client_id));
      const claimedTokensResults = await Promise.all(claimedTokensPromises);

      const claimedTokensMap = data.reduce((acc: any, project: any, index: number) => {
        acc[project.client_id] = claimedTokensResults[index];
        return acc;
      }, {} as { [key: number]: TokensClaimed[] });

      setClaimedTokensData(claimedTokensMap);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const initializeCountdown = (data: FundraiseData[]) => {
    const initialCountdown: { [key: number]: string } = {};
    data.forEach((item) => {
      const nextClaimDate = getNextClaimDate(item);
      initialCountdown[item.client_id] = calculateCountdown(nextClaimDate);
    });
    setCountdown(initialCountdown);
  };

  const updateCountdown = () => {
    setCountdown((prevCountdown) => {
      const newCountdown: { [key: number]: string } = {};
      fundraiseData.forEach((data) => {
        const nextClaimDate = getNextClaimDate(data);
        newCountdown[data.client_id] = calculateCountdown(nextClaimDate);
      });
      return newCountdown;
    });
  };

  const calculateCountdown = (targetDate: Date | null) => {
    if (!targetDate) {
      return 'No upcoming claims';
    }

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
    const nextClaimRequest = data.claim_requests?.find(
      (request) => !request.claimed && new Date(request.unlock_date) > new Date()
    );

    if (!nextClaimRequest) {
      return null;
    }

    return new Date(nextClaimRequest.unlock_date);
  };

  const isClaimingLocked = (data: FundraiseData) => {
    const unclaimedRequest = data.claim_requests?.find((request) => !request.claimed);

    if (!unclaimedRequest) {
      return true;
    }

    const unlockDate = new Date(unclaimedRequest.unlock_date);
    return new Date() < unlockDate;
  };

  const calculateClaimableAmount = (
    data: FundraiseData
  ): { amount: Decimal; percentage: Decimal } => {
    const claimableRequest = data.claim_requests?.find(
      (request) => !request.claimed && new Date(request.unlock_date) <= new Date()
    );

    if (!claimableRequest) {
      return {
        amount: new Decimal(0),
        percentage: new Decimal(0),
      };
    }

    return {
      amount: new Decimal(claimableRequest.amount),
      percentage: new Decimal(claimableRequest.payout_part),
    };
  };

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

  const handleClaim = async (clientId: number) => {
    try {
      const projectData = fundraiseData.find((data) => data.client_id === clientId);
      if (!projectData) {
        throw new Error('Project not found');
      }

      const unclaimedRequest = projectData.claim_requests.find((request) => !request.claimed);
      if (!unclaimedRequest) {
        throw new Error('No unclaimed requests available');
      }

      if (new Date(unclaimedRequest.unlock_date) > new Date()) {
        throw new Error('Claim not yet available');
      }

      const response = await ClaimTokens(clientId);
      console.log(response.message);
      await fetchData();
      showSuccessModal();
    } catch (error) {
      console.error('Error claiming tokens:', error);
      showErrorModal();
    }
  };

  const renderVestedPortfolio = () => (
    <>
      <h2 className="card-title">Vested Portfolio</h2>
      <div className="IXO-card-container vested-portfolio">
        {fundraiseData
          ?.filter((data) => {
            const claimedTokens = claimedTokensData[data.client_id] || [];
            const latestClaim = claimedTokens[claimedTokens.length - 1];

            const [claimedValue] = latestClaim
              ? latestClaim.totalsent.split(' ')
              : ['0', '(0.00%)'];

            const franske = new Decimal(data.tokens_to_receive);
            const franskeee = franske.toFixed(6);

            const franskee = new Decimal(claimedValue);
            const remainingToPay = new Decimal(franskeee).minus(franskee);

            // Filter projects where remainingToPay is equal to or less than 0
            return remainingToPay.greaterThan(0);
          })
          .map((data) => {
            const { amount: claimableAmount, percentage: claimablePercentage } =
              calculateClaimableAmount(data);
            const totalClaimed = data?.claim_requests?.reduce(
              (acc, cr) => acc.plus(new Decimal(cr?.amount || 0)),
              new Decimal(0)
            );

            const nextClaimDate = getNextClaimDate(data);

            const claimedTokens = claimedTokensData[data.client_id] || [];
            const latestClaim = claimedTokens[claimedTokens.length - 1];

            const [claimedValue, claimedPercentage] = latestClaim
              ? latestClaim.totalsent.split(' ')
              : ['0', '(0.00%)'];

            const totalVested = new Decimal(data.tokens_to_receive);
            const remainingVested = totalVested
              .minus(new Decimal(claimedValue))
              .minus(claimableAmount);

            const totalInvested = new Decimal(data.total_deposit);

            const dataWithoutPercent = claimedPercentage.replace('%', '');
            const dataWithoutPercentFix = dataWithoutPercent.replace(/[()]/g, '');
            const totalClaimedClean = parseFloat(dataWithoutPercentFix);

            const claimableFormatted = claimablePercentage.toFixed(2);

            const startValue = new Decimal(100);

            const totalVestedPercent = startValue
              .minus(totalClaimedClean)
              .minus(claimableFormatted);

            const payoutParts = data?.detail_vesting + 1;

            return (
              <div key={data.client_id} className="IXO-card-item">
                <div className="profile-info-wrap">
                  <div className="profile-img-container">
                    <div className="profile-img-wrap">
                      {/* <img
                        src={
                          filePath(data.client_data.avatar_url)
                            ? filePath(data.client_data.avatar_url)
                            : '/xpad_logo'
                        }
                        alt=""
                      /> */}
                    </div>
                  </div>

                  <div className="text-wrap">
                    <div className="flex-wrap">
                      <p>{data.client_title}</p>
                    </div>
                    <div className="socials">
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
                <div className="profile-data-wrap">
                  <div className="profile-data-item">
                    <h2>Invested</h2>
                    <h3>{totalInvested.toFixed(2)} USD</h3>
                  </div>
                  <div className="profile-data-item">
                    <h2>Total Vested ({totalVestedPercent.toFixed(2)}%)</h2>
                    {payoutParts === data?.claim_requests?.filter((r) => r.claimed).length ? (
                      <h3>0 {data.detail_token_symbol} </h3>
                    ) : (
                      <h3>
                        {remainingVested.toFixed(2)} {data.detail_token_symbol}{' '}
                      </h3>
                    )}
                  </div>
                  <div className="profile-data-item">
                    <h2>Claimed {claimedPercentage}</h2>
                    <h3>
                      {Number(claimedValue).toFixed(2)} {data.detail_token_symbol}
                    </h3>
                  </div>
                  <div className="profile-data-item Claimable">
                    {isClaimingLocked(data) ? (
                      <h2>
                        {payoutParts === data?.claim_requests?.filter((r) => r.claimed).length
                          ? `Requested Claim`
                          : `Upcoming Claim`}{' '}
                        ({claimablePercentage.toFixed(2)}%)
                      </h2>
                    ) : (
                      <h2>Claimable ({claimablePercentage.toFixed(2)}%)</h2>
                    )}
                    <h3>
                      {claimableAmount.toFixed(2)} {data.detail_token_symbol}
                    </h3>
                  </div>
                </div>
                <div className="profile-btn-wrap">
                  {payoutParts === data?.claim_requests?.filter((r) => r.claimed).length ? (
                    <button disabled={true} className={'btn-style-2'}>
                      No Upcoming Claims
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaim(data.client_id)}
                      disabled={isClaimingLocked(data)}
                      className={isClaimingLocked(data) ? 'btn-style-2' : 'btn-style-1'}>
                      {data.claim_requests.every((request) => request.claimed)
                        ? 'No Upcoming Claims'
                        : isClaimingLocked(data)
                        ? `Vesting ${countdown[data.client_id] || 'Calculating...'}`
                        : `Claim ${claimableAmount.toFixed(2)} ${data.detail_token_symbol}`}
                    </button>
                  )}

                  {/* Success Modal */}
                  <Modal
                    centered
                    wrapClassName="ModalWrap"
                    className="ModalElement"
                    visible={isSuccessModalVisible}
                    footer={null} // Remove default footer
                    onCancel={handleSuccessOk} // Close modal when clicking outside or on the X button
                  >
                    <div className="ModalInnerWrap">
                      <div className="modal-header-wrap">
                        <Icons name="kinetix-icon"></Icons>
                        <div className="intro">
                          <p>Initial X Offering (IXO) powered by</p>{' '}
                          <Icons name="xpad-icon"></Icons>
                        </div>
                      </div>

                      <div className="modal-body-wrap">
                        <div className="kinetix-modal-bg">
                          <Icons name="kinetix-modal-bg"></Icons>
                        </div>

                        <div className="modal-row-wrap">
                          <div className="text-wrap">
                            <p>You&apos;ve Requested a Claim!</p>
                            <h3>We have received your claim request successfully.</h3>
                            <h3
                              style={{
                                opacity: '0.5',
                                marginTop: '10px',
                                fontWeight: '500',
                              }}>
                              Note: It can take up to 48 hours to receive your tokens. Please be
                              patient.
                            </h3>
                          </div>
                          <button className="modal-btn" onClick={handleSuccessOk}>
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
                    visible={isErrorModalVisible}
                    footer={null} // Remove default footer
                    onCancel={handleErrorOk} // Close modal when clicking outside or on the X button
                  >
                    <div className="ModalInnerWrap">
                      <div className="modal-header-wrap">
                        <Icons name="kinetix-icon"></Icons>
                        <div className="intro">
                          <p>Initial X Offering (IXO) powered by</p>{' '}
                          <Icons name="xpad-icon"></Icons>
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
                              Sh*t. An error occurred while submitting your claim request. Please
                              try again later.
                            </h3>
                          </div>
                          <button className="modal-btn" onClick={handleErrorOk}>
                            <p>Close</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>

                  <Modal
                    title="Error"
                    visible={isErrorModalVisible}
                    onOk={handleErrorOk}
                    onCancel={handleErrorOk} // Close modal on cancel too
                  >
                    <p>There was an error claiming the tokens. Please try again.</p>
                  </Modal>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );

  const renderClaimedPortfolio = () => {
    // Filtered portfolio items
    const filteredPortfolio = fundraiseData?.filter((data) => {
      const claimedTokens = claimedTokensData[data.client_id] || [];
      const latestClaim = claimedTokens[claimedTokens.length - 1];

      const [claimedValue] = latestClaim ? latestClaim.totalsent.split(' ') : ['0', '(0.00%)'];

      const franske = new Decimal(data.tokens_to_receive).toFixed(6);
      const franskee = new Decimal(claimedValue);
      const remainingToPay = new Decimal(franske).minus(franskee);

      // Filter projects where remainingToPay is equal to or less than 0
      return remainingToPay.lessThanOrEqualTo(0);
    });
    return (
      <>
        <h2 className="card-title mt-[60px]">Claimed Portfolio</h2>
        <div className="IXO-card-container claimed-portfolio">
          {/* Render portfolio items if there are any */}
          {filteredPortfolio.length > 0 ? (
            filteredPortfolio.map((data) => {
              const { amount: claimableAmount, percentage: claimablePercentage } =
                calculateClaimableAmount(data);

              const totalInvested = new Decimal(data.total_deposit);
              const claimedTokens = claimedTokensData[data.client_id] || [];
              const latestClaim = claimedTokens[claimedTokens.length - 1];
              const [claimedValue, claimedPercentage] = latestClaim
                ? latestClaim.totalsent.split(' ')
                : ['0', '(0.00%)'];

              const franske = new Decimal(data.tokens_to_receive).toFixed(6);
              const franskee = new Decimal(claimedValue);
              const remainingToPay = new Decimal(franske).minus(franskee);

              const dataWithoutPercent = claimedPercentage.replace('%', '');
              const dataWithoutPercentFix = dataWithoutPercent.replace(/[()]/g, '');
              const totalClaimedClean = parseFloat(dataWithoutPercentFix);
              const claimableFormatted = claimablePercentage.toFixed(2);

              const startValue = new Decimal(100);
              const totalVestedPercent = startValue
                .minus(totalClaimedClean)
                .minus(claimableFormatted);

              return (
                <div key={data.client_id} className="IXO-card-item">
                  <div className="profile-info-wrap">
                    <div className="profile-img-container">
                      <div className="profile-img-wrap">
                        {/* <img
                          src={
                            filePath(data.client_data.avatar_url)
                              ? filePath(data.client_data.avatar_url)
                              : '/xpad_logo'
                          }
                          alt=""
                        /> */}
                      </div>
                    </div>

                    <div className="text-wrap">
                      <div className="flex-wrap">
                        <p>{data.client_title}</p>
                      </div>
                      <div className="socials">
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
                  <div className="profile-data-wrap">
                    <div className="profile-data-item">
                      <h2>Invested</h2>
                      <h3>{totalInvested.toFixed(2)} USDT</h3>
                    </div>
                    <div className="profile-data-item">
                      <h2>Total Vested 0%</h2>
                      <h3>0 {data.detail_token_symbol}</h3>
                    </div>
                    <div className="profile-data-item">
                      <h2>Claimed {claimedPercentage}</h2>
                      <h3>
                        {Number(claimedValue).toFixed(2)} {data.detail_token_symbol}
                      </h3>
                    </div>
                  </div>
                  <div className="profile-btn-wrap">
                    <button className="btn-style-3">
                      <p>Claimed 100%</p>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            // Render message if no projects to display
            <p style={{ opacity: '0.4', marginTop: '-10px' }}>
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

  return (
    <div className="portfolio-page">
      <div className="kyc-status-banner-warp">{renderKycNotice()}</div>

      {renderVestedPortfolio()}
      {renderClaimedPortfolio()}
    </div>
  );
}
