'use client';

import { Box, Image, Text } from '@chakra-ui/react';
import backgroundImage from '../../../assets/background.png';
import { Tabs } from 'antd';
import Link from 'next/link';
import BackArrowIcon from '@/icons/ArrowBack';
import { ChevronRight, Users, Vote, Coins } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { GetClients } from '@/api/apiCalls/user';
import { useRouter } from 'next/navigation';
import Icons from '@/config/icon';
import Countdown from 'react-countdown';
import { useAccount } from 'wagmi';
import { useSelector } from '@/store';
import * as ReactDOMServer from 'react-dom/server';
import { getInvestors, getLotteryResults } from '@/api/apiCalls/user';
import { useConnect } from 'wagmi';

function IXOCard({
  ixo,
  lotteryWinnersMap,
  isLoading,
  type,
  participants,
}: {
  ixo: any;
  lotteryWinnersMap: Record<number, string[]>;
  isLoading: boolean;
  type: 'current' | 'upcoming' | 'past';
  participants?: any;
}) {
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const progress = (ixo.raised / ixo.target) * 100;
  const { connect, connectors } = useConnect();
  const user = useSelector((state) => state.user);

  const handleClick = (id: any) => {
    router.push(`/Invest/${id}`);
  };

  // Remove or modify this console.log
  // console.log('Lottery Winner Check:', {
  //   userId: user?.id,
  //   winners: lotteryWinnersMap[ixo?.id],
  //   isWinner: lotteryWinnersMap[ixo?.id]?.includes(user?.id as string),
  // });

  useEffect(() => {
    console.log('lotteryWinnersMap>>>', lotteryWinnersMap);
  }, [lotteryWinnersMap]);

  return (
    <Box
      borderRadius="12px"
      border="1px solid #363D22"
      background="#000"
      padding="20px 15px 15px 15px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={'20px'}
      mb={'16px'}
      width={'100%'}>
      <Box display={'flex'} gap={'22px'} width={'100%'}>
        <Box style={{ width: '74px', height: '74px', position: 'relative', borderRadius: '12px' }}>
          <img
            src={ixo?.avatar ? ixo?.avatar : ''}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px' }}>
            {ixo?.participate_chain_id == 97 && <Icons name="bsc_test_icon_97"></Icons>}
            {ixo?.participate_chain_id == 56 && <Icons name="bsc_icon_56"></Icons>}
            {ixo?.participate_chain_id == 11155111 && <Icons name="eth_sep_icon_11155111"></Icons>}
            {ixo?.participate_chain_id == 1 && <Icons name="eth_icon_1"></Icons>}
            {ixo?.participate_chain_id == 900 && <Icons name="solana_icon_900"></Icons>}
          </div>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div
              style={{
                fontSize: '18px',
                fontWeight: '800',
                fontFamily: 'Plus Jakarta Sans',
                color: '#fff',
              }}>
              <span>{ixo?.title}</span>

              <Status
                task={ixo}
                lotteryWinner={
                  lotteryWinnersMap[ixo?.id]
                    ? lotteryWinnersMap[ixo?.id].includes(user?.id as string)
                    : false
                }
                loading={isLoading}
              />
            </div>
          </Box>
          <div className="socials">
            {ixo?.website_url && (
              <>
                {ixo?.website_url.startsWith('https://www.') ? (
                  <a href={ixo?.website_url}>
                    <div className="icon-wrap">
                      <Icons name="globe-icon-socials" />
                    </div>
                  </a>
                ) : ixo?.website_url.startsWith('www.') ? (
                  <a href={'https://' + ixo?.website_url}>
                    <div className="icon-wrap">
                      <Icons name="globe-icon-socials" />
                    </div>
                  </a>
                ) : (
                  <a href={'https://www.' + ixo?.website_url}>
                    <div className="icon-wrap">
                      <Icons name="globe-icon-socials" />
                    </div>
                  </a>
                )}
              </>
            )}

            {ixo?.twitter_url && (
              <>
                {ixo?.twitter_url.startsWith('https://www.') ? (
                  <a href={ixo?.twitter_url}>
                    <div className="icon-wrap">
                      <Icons name="x-icon-socials" />
                    </div>
                  </a>
                ) : ixo?.twitter_url.startsWith('www.') ? (
                  <a href={'https://' + ixo?.twitter_url}>
                    <div className="icon-wrap">
                      <Icons name="x-icon-socials" />
                    </div>
                  </a>
                ) : (
                  <a href={'https://www.' + ixo?.twitter_url}>
                    <div className="icon-wrap">
                      <Icons name="x-icon-socials" />
                    </div>
                  </a>
                )}
              </>
            )}

            {ixo?.discord_url && (
              <>
                {ixo?.discord_url.startsWith('https://www.') ? (
                  <a href={ixo?.discord_url}>
                    <div className="icon-wrap">
                      <Icons name="discord-icon-socials" />
                    </div>
                  </a>
                ) : ixo?.discord_url.startsWith('www.') ? (
                  <a href={'https://' + ixo?.discord_url}>
                    <div className="icon-wrap">
                      <Icons name="discord-icon-socials" />
                    </div>
                  </a>
                ) : (
                  <a href={'https://www.' + ixo?.discord_url}>
                    <div className="icon-wrap">
                      <Icons name="discord-icon-socials" />
                    </div>
                  </a>
                )}
              </>
            )}

            {ixo?.telegram_url && (
              <>
                {ixo?.telegram_url.startsWith('https://www.') ? (
                  <a href={ixo?.telegram_url}>
                    <div className="icon-wrap">
                      <Icons name="telegram-icon-socials" />
                    </div>
                  </a>
                ) : ixo?.telegram_url.startsWith('www.') ? (
                  <a href={'https://' + ixo?.telegram_url}>
                    <div className="icon-wrap">
                      <Icons name="telegram-icon-socials" />
                    </div>
                  </a>
                ) : (
                  <a href={'https://www.' + ixo?.telegram_url}>
                    <div className="icon-wrap">
                      <Icons name="telegram-icon-socials" />
                    </div>
                  </a>
                )}
              </>
            )}
          </div>
        </Box>
      </Box>

      {type !== 'past' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <p
              style={{
                color: '#fff',
                fontSize: '12px',
                fontWeight: '400',
                fontFamily: 'Plus Jakarta Sans',
              }}>
              {type === 'current'
                ? 'Sale Progress'
                : type === 'upcoming'
                ? `Score:${ixo?.completed_percent}%`
                : ''}
            </p>
            {type === 'current' && (
              <h4
                style={{
                  color: '#BEF642',
                  fontSize: '12px',
                  fontWeight: '400',
                  fontFamily: 'Plus Jakarta Sans',
                }}>
                {ixo?.sale_progress} / {ixo?.detail_launch_price * ixo?.detail_token_for_sale} USD
              </h4>
            )}
            {type === 'upcoming' && <Rating percent={ixo?.completed_percent} />}
          </div>
          <div
            style={{
              width: '100%',
              height: '3px',
              background: '#191916',
              borderRadius: '3px',
              position: 'relative',
            }}>
            <div
              style={{
                width:
                  type === 'current'
                    ? (ixo?.sale_progress * 100) /
                        (ixo?.detail_launch_price * ixo?.detail_token_for_sale) +
                      '%'
                    : type === 'upcoming'
                    ? ixo?.completed_percent + '%'
                    : '',
                position: 'absolute',
                height: '3px',
                background: '#BEF642',
                borderRadius: '3px',
              }}></div>
          </div>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: type === 'past' ? '20px' : '5px',
          width: '100%',
        }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', width: '100%' }}>
          <div className={`${type === 'past' ? 'details-item-past' : 'details-item'}`}>
            <h3>Launch Price</h3>
            <p>{parseFloat(ixo?.detail_launch_price)} USD</p>
            {type !== 'past' && (
              <div className="icon-wrap">
                <Icons name="LaunchPrice-icon" />
              </div>
            )}
          </div>
          <div className={`${type === 'past' ? 'details-item-past' : 'details-item'}`}>
            <h3>Tokens for Sale</h3>
            <p>
              {parseFloat(ixo?.detail_token_for_sale)} {ixo?.detail_token_symbol}
            </p>
            {type !== 'past' && (
              <div className="icon-wrap">
                <Icons name="TokensForSale-icon" />
              </div>
            )}
          </div>
        </div>
        {type !== 'past' && (
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', width: '100%' }}>
            <div className="details-item">
              <h3>Winning Tickets</h3>
              <p>{parseFloat(ixo?.detail_winning_ticket)}</p>
              <div className="icon-wrap">
                <Icons name="WinningTickets-icon" />
              </div>
            </div>
            <div className="details-item">
              <h3>Amount / Ticket</h3>
              <p>{parseFloat(ixo?.max_user_deposit)} USD</p>
              <div className="icon-wrap">
                <Icons name="AmountTicket-icon" />
              </div>
            </div>
          </div>
        )}
        {type === 'past' && (
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', width: '100%' }}>
            <div className="details-item-past">
              <h3>Total Raised</h3>
              <p>{ixo?.sale_progress} USD</p>
            </div>
            <div className="details-item-past">
              <h3>Participants</h3>
              <p>{participants ? participants : 'Loading...'}</p>
            </div>
          </div>
        )}
      </div>

      {type === 'current' && (
        <div className="btn-wrap">
          {isLoading ? (
            <button className="disable">
              <p>Not Available</p>
            </button>
          ) : ixo?.is_blacklisted ||
            (lotteryWinnersMap[ixo?.id] &&
              !lotteryWinnersMap[ixo?.id].includes(user?.id as string)) ? (
            <button className="disable">
              <p>Not Available</p>
            </button>
          ) : (
            <Countdown
              date={ixo.sale_start}
              intervalDelay={0}
              precision={3}
              renderer={(props) =>
                props.completed ? (
                  <button
                    className="main"
                    onClick={() => {
                      console.log('Id>>>', ixo?.id);
                      if (address) {
                        handleClick(ixo?.id);
                      } else {
                        const connector = connectors[0];
                        if (connector) {
                          connect({ connector });
                        }
                      }
                    }}>
                    <Icons name="lightning-icon"></Icons>
                    <p>{address ? 'Participate' : 'Connect Wallet'}</p>
                  </button>
                ) : (
                  <div
                    className="flex items-center justify-center gap-x-1"
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      background: '#47473B',
                      borderRadius: '100px',
                    }}>
                    <p className="" style={{ color: 'black', fontWeight: '700' }}>
                      {props.days}d
                    </p>
                    <p className="" style={{ color: 'black', fontWeight: '700' }}>
                      {props.hours}h
                    </p>
                    <p className="" style={{ color: 'black', fontWeight: '700' }}>
                      {props.minutes}m
                    </p>
                    <p className="" style={{ color: 'black', fontWeight: '700' }}>
                      {props.seconds}s
                    </p>
                  </div>
                )
              }></Countdown>
          )}
        </div>
      )}

      {type === 'upcoming' && (
        <div className="btn-wrap">
          {ixo?.status === 'Open' && (
            <button className="main" onClick={() => window.open(ixo.profile_link, '_blank')}>
              <p>Jump to Tasks</p>
            </button>
          )}
          {ixo?.status === 'TBA' && (
            <button className="disable">
              <p>TBA</p>
            </button>
          )}
        </div>
      )}

      {type === 'past' && (
        <div className="btn-wrap">
          <button
            onClick={() => window.open(ixo.profile_link, '_blank')}
            style={{
              border: '1px solid #BEF642',
              borderRadius: '50px',
              backgroundColor: 'transparent',
            }}>
            <p
              style={{
                color: '#FFF',
                fontSize: '14px',
                fontWeight: '800',
                fontFamily: 'Plus Jakarta Sans',
              }}>
              View project
            </p>
          </button>
        </div>
      )}

      {type !== 'past' && (
        <p
          style={{
            color: '#82827E',
            fontSize: '12px',
            fontWeight: '400',
            fontFamily: 'Plus Jakarta Sans',
            width: '100%',
            textAlign: 'center',
            marginTop: '-5px',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push(`/ixos/ixosSingle/${ixo?.id}`);
          }}>
          View project
        </p>
      )}
    </Box>
  );
}

interface Client {
  id: number;
  status: string;
}

interface Investor {
  username: string;
  total_deposit: number;
  tokens_to_receive: number;
  total_claimed: number;
}

interface InvestorsResponse {
  total_investors: number;
  investors: Investor[];
}

export default function FundraisePage() {
  const [activeTab, setActiveTab] = useState('1');
  const [filteredIXOs, setFilteredIXOs] = useState<any[]>([]);
  const [allIXOs, setAllIXOs] = useState<any[]>([]);
  const [lotteryWinnersMap, setLotteryWinnersMap] = useState<Record<number, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [investorsData, setInvestorsData] = useState<Record<number, InvestorsResponse>>({});
  const user = useSelector((state) => state.user);

  const fetchLotteryWinners = async (clientId: number) => {
    try {
      const results = await getLotteryResults(clientId);
      console.log('results>>>>>>>>>>>>>>>', results);
      console.log('user>>>>>>>>>>>>>>>', user);

      return results.winners.map((winner: any) => winner?.id);
    } catch (error) {
      console.error(`Error fetching lottery winners for client ${clientId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllLotteryWinners = async () => {
      setIsLoading(true);
      const winnersMap: Record<number, string[]> = {};
      for (const client of allIXOs as Client[]) {
        if (client.status === 'Live') {
          winnersMap[client.id] = await fetchLotteryWinners(client.id);
        }
      }
      setLotteryWinnersMap(winnersMap);
      setIsLoading(false);
    };

    if (allIXOs.length > 0) {
      fetchAllLotteryWinners();
    }
  }, [allIXOs]);

  useEffect(() => {
    const fetchInvestorsData = async () => {
      try {
        const investorsDataMap: Record<number, InvestorsResponse> = {};
        for (const client of allIXOs as Client[]) {
          const investorsData = await getInvestors(client.id);
          investorsDataMap[client.id] = investorsData;
        }
        setInvestorsData(investorsDataMap);
      } catch (error) {
        console.error('Failed to fetch investors data:', error);
      }
    };

    if (allIXOs.length > 0) {
      fetchInvestorsData();
    }
  }, [allIXOs]);

  useEffect(() => {
    const fetchIXOs = async () => {
      try {
        const response = await GetClients();
        const clientData = response.client || [];
        console.log('clientData', response?.client);
        setAllIXOs(clientData);
      } catch (error) {
        console.error('Error fetching IXOs:', error);
      }
    };

    fetchIXOs();
  }, []);

  const determineStatus = (item: any): 'current' | 'upcoming' | 'past' => {
    const status = item.status?.toLowerCase();

    switch (status) {
      case 'closed':
        return 'past';
      case 'live':
        return 'current';
      case 'open':
        return 'upcoming';
      default:
        return 'upcoming'; // default fallback
    }
  };

  useEffect(() => {
    const status = activeTab === '1' ? 'current' : activeTab === '2' ? 'upcoming' : 'past';
    setFilteredIXOs(allIXOs.filter((ixo) => determineStatus(ixo) === status));
  }, [activeTab, allIXOs]);

  // const fetchLotteryWinners = async (clientId: number) => {
  //   try {
  //     const results = await getLotteryResults(clientId);
  //     return results.winners.map((winner: any) => winner.wallet_address);
  //   } catch (error) {
  //     console.error(`Error fetching lottery winners for client ${clientId}:`, error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   const fetchAllLotteryWinners = async () => {
  //     setIsLoading(true);
  //     const winnersMap: Record<number, string[]> = {};
  //     for (const client of clients as Client[]) {
  //       if (client.status === 'Live') {
  //         winnersMap[client.id] = await fetchLotteryWinners(client.id);
  //       }
  //     }
  //     setLotteryWinnersMap(winnersMap);
  //     setIsLoading(false);
  //   };

  //   if (clients.length > 0) {
  //     fetchAllLotteryWinners();
  //   }
  // }, [clients]);

  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh" pb="80px">
      <Box position="relative" w="100%" zIndex={0}>
        <Image src={backgroundImage.src} h="auto" objectFit="contain" position="absolute" />
        <Box position="relative" margin="24px 16px 29px 16px">
          <Box display="flex" alignItems="center">
            <Link href="/ixos">
              <Box>
                <BackArrowIcon />
              </Box>
            </Link>
            <Box width="100%" display="flex" justifyContent="center">
              <Text
                color="#BEF642"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="800"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans">
                IXO Fundraising
              </Text>
            </Box>
          </Box>
        </Box>

        <Box margin="0px 16px 24px 16px" position="relative">
          <Tabs
            defaultActiveKey="1"
            className="ixo-tabs"
            onChange={(key) => setActiveTab(key)}
            items={[
              {
                label: 'Current',
                key: '1',
                children: (
                  <Box className="space-y-4">
                    {filteredIXOs.map((ixo) => (
                      <IXOCard
                        key={ixo.id}
                        ixo={ixo}
                        lotteryWinnersMap={lotteryWinnersMap}
                        isLoading={isLoading}
                        type="current"
                      />
                    ))}
                  </Box>
                ),
              },
              {
                label: 'Upcoming',
                key: '2',
                children: (
                  <Box className="space-y-4">
                    {filteredIXOs.map((ixo) => (
                      <IXOCard
                        key={ixo.id}
                        ixo={ixo}
                        lotteryWinnersMap={lotteryWinnersMap}
                        isLoading={isLoading}
                        type="upcoming"
                      />
                    ))}
                  </Box>
                ),
              },
              {
                label: 'Past',
                key: '3',
                children: (
                  <Box className="space-y-4">
                    {filteredIXOs.map((ixo) => {
                      const clientInvestors = investorsData[ixo?.id];
                      return (
                        <IXOCard
                          key={ixo.id}
                          ixo={ixo}
                          lotteryWinnersMap={lotteryWinnersMap}
                          isLoading={isLoading}
                          type="past"
                          participants={clientInvestors?.total_investors}
                        />
                      );
                    })}
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
    </Box>
  );
}

export const Status = ({
  task,
  lotteryWinner = false,
  loading = false,
}: {
  task: any;
  lotteryWinner?: boolean;
  loading?: boolean;
}) => {
  if (loading) {
    return (
      <div className="status-wrap" style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className="skeleton-loader"
          style={{
            width: '80px',
            height: '20px',
            backgroundColor: '#2a2a2a',
            borderRadius: '4px',
            animation: 'pulse 1.5s infinite ease-in-out',
          }}></div>
      </div>
    );
  }

  return (
    <>
      {task.status === 'Live' && (
        <div
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            color: task.is_blacklisted || !lotteryWinner ? '#F44566' : '#BEF642',
          }}>
          <svg
            width="8"
            height="11"
            viewBox="0 0 8 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.03593 10.4991C1.89593 10.4991 1.76593 10.4491 1.62593 10.4091C1.25593 10.2291 1.07593 9.85906 1.16593 9.49906L1.71593 6.84906H0.89593C0.52593 6.84906 0.21593 6.61906 0.0759301 6.29906C-0.0640699 5.97905 -0.0140699 5.61906 0.25593 5.38906L4.58593 0.779055C4.85593 0.509055 5.31593 0.409055 5.63593 0.599055C6.00593 0.779055 6.18593 1.14906 6.09593 1.50906L5.54593 4.15906H6.36593C6.73593 4.15906 7.04593 4.38906 7.18593 4.70906C7.32593 5.02906 7.27593 5.38906 7.00593 5.61906L2.66593 10.2291C2.48593 10.4091 2.25593 10.4991 2.02593 10.4991H2.03593Z"
              fill={task.is_blacklisted || !lotteryWinner ? '#F44566' : '#BEF642'}
            />
          </svg>
          {task.is_blacklisted ? (
            <span style={{ color: '#F44566' }} className="ixo-card-status">
              Not whitelisted
            </span>
          ) : !lotteryWinner ? (
            <span style={{ color: '#F44566' }} className="ixo-card-status">
              Not lottery winner
            </span>
          ) : (
            <span style={{ color: '#BEF642' }} className="ixo-card-status">
              Whitelisted
            </span>
          )}
        </div>
      )}
      {task.status === 'Open' && (
        <div
          className="status-wrap"
          style={{ display: 'flex', alignItems: 'center', color: '#5FA8FF' }}>
          <span style={{ color: '#5FA8FF' }} className="ixo-card-status">
            Whitelist ongoing...
          </span>
        </div>
      )}
      {task.status === 'TBA' && (
        <div
          className="status-wrap"
          style={{ display: 'flex', alignItems: 'center', color: '#82827E' }}>
          <span className="ixo-card-status">TBA</span>
        </div>
      )}
    </>
  );
};

const Rating = ({ percent }: { percent: string }) => {
  let percent_val = parseFloat(percent);
  const svgString = encodeURIComponent(
    ReactDOMServer.renderToStaticMarkup(
      <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.54212 11.9972C2.38212 11.9972 2.21213 11.9472 2.05212 11.8872C1.61212 11.6672 1.39212 11.2272 1.50212 10.7872L2.16212 7.60723H1.17212C0.732125 7.60723 0.352125 7.33723 0.182125 6.94723C0.0221247 6.56723 0.0721245 6.12723 0.402124 5.84723L5.61212 0.327228C5.94212 -0.00277182 6.49212 -0.112772 6.87212 0.107228C7.31212 0.327228 7.53212 0.767228 7.42212 1.20723L6.76213 4.38723H7.75212C8.19212 4.38723 8.57212 4.65723 8.74212 5.04723C8.90212 5.42723 8.85213 5.86723 8.52213 6.14723L3.31212 11.6772C3.09212 11.8972 2.82212 12.0072 2.54212 12.0072V11.9972ZM2.81212 6.46723C2.97212 6.46723 3.14212 6.51723 3.25212 6.68723C3.36212 6.84723 3.41212 6.95723 3.36212 7.12723L2.65212 10.8472L7.75212 5.42723H6.16212C6.00212 5.42723 5.83212 5.37723 5.72212 5.20723C5.61212 5.09723 5.56212 4.93723 5.61212 4.76723L6.32212 1.04723L1.22212 6.52723L2.81212 6.47723V6.46723Z"
          fill={percent_val === 0 ? '#41413F' : percent_val < 40 ? '#F44566' : '#BEF642'}
        />
      </svg>
    )
  );
  const svgString2 = encodeURIComponent(
    ReactDOMServer.renderToStaticMarkup(
      <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.54388 11.99C2.38407 11.99 2.21428 11.9401 2.05447 11.8801C1.615 11.6604 1.39526 11.2209 1.50513 10.7815L2.16434 7.60529H1.17553C0.736057 7.60529 0.356514 7.33562 0.186719 6.94609C0.0269113 6.56655 0.0768504 6.12707 0.406453 5.84741L5.61018 0.334055C5.93979 0.00445166 6.48913 -0.105416 6.86867 0.114319C7.30814 0.334055 7.52787 0.773525 7.41801 1.213L6.7588 4.38917H7.74761C8.18708 4.38917 8.56662 4.65884 8.73642 5.04837C8.89622 5.42792 8.84629 5.86739 8.51668 6.14705L3.32294 11.6704C3.1032 11.8901 2.83353 12 2.55387 12L2.54388 11.99Z"
          fill={percent_val < 40 ? '#F44566' : '#BEF642'}
        />
      </svg>
    )
  );
  return (
    <div className="star-rating2">
      <div
        className={'f'}
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${svgString}")`,
        }}></div>
      <span style={{ width: percent_val + '%' }}>
        <div
          className={'s'}
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,${svgString2}")`,
          }}></div>
      </span>
    </div>
  );
};
