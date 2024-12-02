'use client';
import { MobileNav } from '@/components/mobile-nav';
import OpenWalletNotification from '@/components/OpenWalletNotification';
import { TopBar } from '@/components/top-bar';
import { useTelegram } from '@/providers/TelegramProvider';
import { useStore } from '@/store';
import { Box } from '@chakra-ui/react';
import { message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { useUser } from '../hooks';
import { getSignature } from '@/api/apiCalls/user';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { getCurrentUser, logout } = useUser();
  const [fistTime, setFistTime] = useState<boolean>(true);
  const user = useStore((state) => state.user);
  const accessToken = useStore((state) => state.accessToken);
  const router = useRouter();
  const { telegram_user } = useTelegram();
  const setTgId = useStore((state) => state.setCTgId);
  const searchParams = useSearchParams();
  const tgId = searchParams.get('tgId');
  //const tgId = '66439116385786910FTa6qr9SF/NL4fh2tS4Uw==';

  const { disconnect } = useDisconnect();
  const { address, isConnected, connector, chain } = useAccount();
  const [signerMessage, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { loginWallet } = useUser();
  const { data, isSuccess, signMessage, isError, reset } = useSignMessage();

  const loginS = async (payload: any) => {
    try {
      setLoading(true);
      const res = await loginWallet(payload);
      setMessage('');
      setLoading(false);
    } catch (e) {
      setMessage('');
      await handleLogout();
      setLoading(false);
    }
  };
  const logWallet = async () => {
    try {
      const res = await getSignature(address);
      let challenge = res?.data;
      if (challenge) {
        setMessage(challenge);
      }
    } catch (e) {
      handleLogout();
    }
  };
  useEffect(() => {
    if (address && connector && !!accessToken) {
      try {
        if (isError) {
          setMessage('');
          handleLogout();
        } else if (!data && signerMessage && address) {
          signMessage({ message: signerMessage });
        } else if (data && signerMessage && isSuccess) {
          const payload = {
            wallet_address: address,
            signature: data,
            challenge: signerMessage,
          };
          loginS(payload);
        }
      } catch (e) {
        setMessage('');
        handleLogout();
      }
    }
  }, [signerMessage, address, connector, accessToken, data, isSuccess, isError]);
  useEffect(() => {
    if (address && user && connector) {
      if (user.wallet_address !== address) {
        if (!user.wallet_address) {
          reset();
          logWallet();
        } else {
          message.error('You are trying to connect wrong wallet');
          handleLogout();
        }
      }
    } else if (accessToken && !address) {
      handleLogout();
    }
  }, [accessToken, address, connector, user]);

  const handleLogout = async () => {
    reset();
    await disconnect();
    // message.success('Wallet disconnected!');
  };

  useEffect(() => {
    if (!!user && !!telegram_user && user?.telegram_id !== telegram_user?.id.toString()) {
      setFistTime(true);
      logout();
    } else if (accessToken && !user) {
      getCurrentUser();
      setFistTime(false);
    } else if (!user && !accessToken) {
      router.push('/authenticate?' + searchParams.toString());
    }

    if (accessToken && fistTime && user?.telegram_id === telegram_user?.id.toString()) {
      getCurrentUser();
      setFistTime(false);
    }
  }, [telegram_user, accessToken, user, fistTime]);

  useEffect(() => {
    if (!!user && !telegram_user && accessToken && !fistTime) {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete('tgId');
      router.replace(`/?${nextSearchParams}`);
      setTgId('');
      logout();
    }
  }, [user, telegram_user, accessToken, fistTime]);

  useEffect(() => {
    if (tgId) {
      setTgId(tgId);
    }
  }, [tgId]);

  return (
    <Box
      height="inherit"
      // style={{ marginTop: "80px" }}
    >
      <OpenWalletNotification />
      {/* <TopBar /> */}
      {user && accessToken && <TopBar />}
      {children}
      {user && accessToken && <MobileNav />}
      {/* <MobileNav /> */}
      {/* {user && accessToken && <MobileNav />} */}
      <style jsx global>{`
        .modal .ant-modal-content {
          background: #191916;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal .ant-modal-header {
          background: #191916;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal .ant-modal-close {
          color: rgba(255, 255, 255, 0.45);
        }

        .modal .ant-modal-close:hover {
          color: rgba(255, 255, 255, 0.75);
        }
      `}</style>
    </Box>
  );
}
