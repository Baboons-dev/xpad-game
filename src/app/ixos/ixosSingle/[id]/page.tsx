'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getLotteryResults, GetSingleClient } from '@/api/apiCalls/user';
import { Box, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import BackArrowIcon from '@/icons/ArrowBack';
import backgroundImage from '@/assets/background.png';
import Icons from '@/config/icon';
import { Status } from '../../fundraise/page';
import { useAccount } from 'wagmi';
import checked from '@/assets/CheckboxChecked.svg';
import linkIcon from '@/assets/LinkIcon.svg';
import statusOn from '@/assets/statusOn.svg';
import statusOff from '@/assets/statusOf.svg';

type TabType = 'whitelist' | 'ixoDetails' | 'about';

const page = () => {
  const { id }: any = useParams();
  const [ixo, setIxo] = useState<any>(null);
  const { address } = useAccount();
  const [lotteryWinnersMap, setLotteryWinnersMap] = useState<Record<number, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('whitelist');

  const fetchData = async () => {
    try {
      const res = await GetSingleClient(id);
      console.log('Single Page>>', res?.client);
      setIxo(res?.client);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchLotteryWinners = async (clientId: number) => {
    try {
      const results = await getLotteryResults(clientId);
      return results.winners.map((winner: any) => winner.wallet_address);
    } catch (error) {
      console.error(`Error fetching lottery winners for client ${clientId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllLotteryWinners = async () => {
      setIsLoading(true);
      const winnersMap: Record<number, string[]> = {};
      if (ixo?.status === 'Live') {
        winnersMap[ixo.id] = await fetchLotteryWinners(ixo.id);
      }
      setLotteryWinnersMap(winnersMap);
      setIsLoading(false);
    };

    fetchAllLotteryWinners();
  }, [ixo]);

  return (
    <>
      {ixo !== null && (
        <Box style={{ width: '100%', position: 'relative', marginTop: '-24px' }}>
          <Image
            src={backgroundImage.src}
            h="auto"
            objectFit="contain"
            position="absolute"
            zIndex={1}
          />
          <Box position="relative" margin="24px 16px 29px 16px" zIndex={2}>
            <Box display="flex" alignItems="center" style={{ paddingTop: '36px' }}>
              <Link href="/ixos/fundraise">
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
          <Box zIndex={2} style={{ padding: '0px 16px' }}>
            <Box
              style={{
                borderRadius: '15px',
                background: '#000',
                border: '1px solid #363D22',
                width: '100%',
                position: 'relative',
              }}
              zIndex={3}>
              <Box style={{ width: '100%', display: 'flex', gap: '22px', padding: '20px' }}>
                <Box
                  style={{
                    width: '74px',
                    height: '74px',
                    position: 'relative',
                    borderRadius: '12px',
                  }}>
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
                    {ixo?.participate_chain_id == 11155111 && (
                      <Icons name="eth_sep_icon_11155111"></Icons>
                    )}
                    {ixo?.participate_chain_id == 1 && <Icons name="eth_icon_1"></Icons>}
                    {ixo?.participate_chain_id == 900 && <Icons name="solana_icon_900"></Icons>}
                  </div>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
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
                          address && lotteryWinnersMap[ixo?.id]
                            ? lotteryWinnersMap[ixo?.id].includes(address as string)
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
              {/* //////////////////////////////////Tabs/////////////////////////////////////////// */}
              <Box
                style={{
                  width: '100%',
                  padding: '0px 10px',
                  backgroundColor: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '20px',
                }}>
                <div
                  className={`tab-item ${activeTab === 'whitelist' ? 'tab-item-active' : ''}`}
                  onClick={() => setActiveTab('whitelist')}>
                  <p>Whitelist</p>
                </div>
                <div
                  className={`tab-item ${activeTab === 'ixoDetails' ? 'tab-item-active' : ''}`}
                  onClick={() => setActiveTab('ixoDetails')}>
                  <p>IXO Details</p>
                </div>
                <div
                  className={`tab-item ${activeTab === 'about' ? 'tab-item-active' : ''}`}
                  onClick={() => setActiveTab('about')}>
                  <p>About</p>
                </div>
              </Box>
              <Box
                style={{
                  width: '100%',
                  padding: ' 15px 10px 10px 10px',
                  backgroundColor: '#191916',
                  borderRadius: '0px 0px 15px 15px',
                }}>
                {activeTab === 'whitelist' && <Whitelist ixo={ixo} />}
                {activeTab === 'ixoDetails' && <IXODetails ixo={ixo} />}
                {activeTab === 'about' && <About ixo={ixo} />}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default page;

const Whitelist = (props: { ixo: any }) => {
  const { ixo } = props;
  return (
    <Box
      style={{
        width: '100%',
        backgroundColor: '#000',
        borderRadius: '10px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
      <WhitelistSubComponent />
      <WhitelistSubComponent />
      <WhitelistSubComponent />
    </Box>
  );
};

const IXODetails = (props: { ixo: any }) => {
  const { ixo } = props;
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#191916',
      }}>
      <Box style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IXODetailsSubComponent
          title="Launch Price"
          value={`${parseFloat(ixo?.detail_launch_price)} USD`}
          icon={<Icons name="LaunchPrice-icon" />}
        />
        <IXODetailsSubComponent
          title="XPAD Raise"
          value={`${(ixo?.detail_launch_price * ixo?.detail_token_for_sale).toFixed(0)} USD`}
          icon={<Icons name="XPADRaise-icon" />}
        />
      </Box>
      <Box style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IXODetailsSubComponent
          title="Ticket Size"
          value={`${parseFloat(ixo?.max_user_deposit)} USD`}
          icon={<Icons name="AmountTicket-icon" />}
        />
        <IXODetailsSubComponent
          title="Winning Tickets"
          value={`${parseFloat(ixo.detail_winning_ticket)}`}
          icon={<Icons name="WinningTickets-icon" />}
        />
      </Box>
      <Box style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IXODetailsSubComponent
          title="Tokens for Sale"
          value={`  ${parseFloat(ixo?.detail_token_for_sale)}
                      ${ixo?.detail_token_symbol}`}
          icon={<Icons name="TokensForSale-icon" />}
        />
        <IXODetailsSubComponent
          title="Participants"
          value={`${ixo?.total_joined_users}`}
          icon={<Icons name="Participants-icon" />}
        />
      </Box>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          padding: '12px',
          backgroundColor: '#000',
          borderRadius: '7px',
          position: 'relative',
        }}>
        <Text
          style={{
            fontSize: '12px',
            fontWeight: '400',
            color: '#41413F',
            fontFamily: 'Plus Jakarta Sans',
          }}>
          Vesting
        </Text>
        <Box style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Box style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Image src={statusOn.src} h="auto" w="auto" alt="Img" />
            <Text
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#fff',
                fontFamily: 'Plus Jakarta Sans',
              }}>
              {`${parseFloat(ixo?.detail_tge_percent)}% TGE`}
            </Text>
          </Box>
          <Box style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Image src={statusOff.src} h="auto" w="auto" alt="Img" />
            <Text
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#fff',
                fontFamily: 'Plus Jakarta Sans',
              }}>
              {((100 - ixo?.detail_tge_percent) / ixo?.detail_vesting).toFixed(2)}% Monthly for{' '}
              {parseFloat(ixo?.detail_vesting)} Months
            </Text>
          </Box>
        </Box>
        <Box style={{ position: 'absolute', right: '12px', top: '12px' }}>
          <Icons name="Vesting-icon" />
        </Box>
      </Box>
    </div>
  );
};

const About = (props: { ixo: any }) => {
  const { ixo } = props;
  const gotoLink = (link: string) => {
    window.location.href = link;
  };
  function getChainName(chainId: any) {
    const chainNames: any = {
      97: 'BSC Testnet',
      56: 'Binance Smart Chain',
      11155111: 'Sepolia ETH',
      1: 'Ethereum',
      900: 'Solana',
    };

    return chainNames[chainId] || 'Unknown Chain';
  }
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <Text
        style={{
          fontSize: '14px',
          fontWeight: '700',
          fontFamily: 'Plus Jakarta Sans',
          color: '#fff',
        }}>
        Project Description
      </Text>
      <Text
        style={{
          fontSize: '12px',
          fontWeight: '400',
          fontFamily: 'Plus Jakarta Sans',
          color: 'rgba(255, 255, 255, 0.50)',
          marginBottom: '10px',
        }}
        dangerouslySetInnerHTML={{ __html: ixo?.about }}></Text>
      <Box style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
        <a
          style={{
            fontSize: '12px',
            fontWeight: '500',
            fontFamily: 'Plus Jakarta Sans',
            color: '#5FA8FF',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          href={ixo?.about_white_paper_url ? ixo?.about_white_paper_url : '#'}
          target="_blank">
          Whitepaper
        </a>
        <a
          style={{
            fontSize: '12px',
            fontWeight: '500',
            fontFamily: 'Plus Jakarta Sans',
            color: '#5FA8FF',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          href={ixo?.about_deck_url ? ixo?.about_deck_url : '#'}
          target="_blank">
          Deck
        </a>
      </Box>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          marginBottom: '15px',
        }}>
        <Image
          src={`${ixo?.about_video_placeholder ? ixo?.about_video_placeholder : ''}`}
          w="100px"
          h="56px"
          alt="vedio"
          borderRadius="5px"
          style={{ cursor: 'pointer' }}
          onClick={() => gotoLink(ixo?.about_video_url)}
        />
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: '700',
              fontFamily: 'Plus Jakarta Sans',
              color: '#fff',
            }}>
            {ixo?.about_video_title}
          </Text>
          <Text
            style={{
              fontSize: '10px',
              fontWeight: '500',
              fontFamily: 'Plus Jakarta Sans',
              color: '#82827E',
            }}>
            {ixo?.about_video_duration}
          </Text>
        </Box>
      </Box>
      <Text
        style={{
          fontSize: '12px',
          fontWeight: '700',
          fontFamily: 'Plus Jakarta Sans',
          color: '#fff',
        }}>
        Core Metrics
      </Text>
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Box style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IXODetailsSubComponent
            title="Blockchain"
            value={getChainName(ixo?.participate_chain_id)}
          />
          <IXODetailsSubComponent
            title="Total Supply"
            value={`${ixo?.about_total_supply ? parseFloat(ixo?.about_total_supply) : 0}`}
          />
        </Box>{' '}
        <Box style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IXODetailsSubComponent
            title="Project Valuation"
            value={`$${
              ixo?.about_project_valuation ? parseFloat(ixo?.about_project_valuation) : 0
            }`}
          />
          <IXODetailsSubComponent
            title="Initial Market Cap"
            value={`$${
              ixo?.about_initial_market_cap ? parseFloat(ixo?.about_initial_market_cap) : 0
            }`}
          />
        </Box>
      </Box>
    </Box>
  );
};

const WhitelistSubComponent = () => {
  return (
    <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Image src={checked.src} alt="checked" h="18px" w="18px" />
      <Text
        style={{
          fontSize: '12px',
          fontWeight: '600',
          fontFamily: 'Plus Jakarta Sans',
          color: '#fff',
        }}>
        Like post
      </Text>
      <Image src={linkIcon.src} alt="checked" h="18px" w="12px" style={{ cursor: 'pointer' }} />
    </Box>
  );
};

interface IXODetailsSubComponentProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}
const IXODetailsSubComponent = (props: IXODetailsSubComponentProps) => {
  const { title, value, icon } = props;
  return (
    <Box
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        padding: '12px',
        position: 'relative',
        flex: 1,
        backgroundColor: '#000',
        borderRadius: '7px',
      }}>
      <Text
        style={{
          fontSize: '12px',
          fontWeight: '400',
          color: '#41413F',
          fontFamily: 'Plus Jakarta Sans',
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: '12px',
          fontWeight: '700',
          color: '#fff',
          fontFamily: 'Plus Jakarta Sans',
        }}>
        {value}
      </Text>
      {icon && <Box style={{ position: 'absolute', right: '12px', top: '12px' }}>{icon}</Box>}
    </Box>
  );
};
