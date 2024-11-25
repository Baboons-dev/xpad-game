"use client";

import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../../assets/background.png";
import { Tabs } from "antd";
import Link from "next/link";
import BackArrowIcon from "@/icons/ArrowBack";
import { useEffect, useState } from "react";

interface IXO {
  id: number;
  title: string;
  description: string;
  target: number;
  raised: number;
  endDate: string;
  status: "current" | "upcoming" | "past";
}

const dummyIXOs: IXO[] = [
  {
    id: 1,
    title: "Web3 Gaming Platform",
    description: "Revolutionary gaming platform built on blockchain technology",
    target: 500000,
    raised: 325000,
    endDate: "2024-03-01",
    status: "current",
  },
  {
    id: 2,
    title: "DeFi Lending Protocol",
    description: "Next-generation decentralized lending platform",
    target: 1000000,
    raised: 750000,
    endDate: "2024-04-15",
    status: "current",
  },
  {
    id: 3,
    title: "NFT Marketplace",
    description: "Community-driven NFT marketplace",
    target: 300000,
    raised: 0,
    endDate: "2024-05-01",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Metaverse Project",
    description: "Immersive virtual world experience",
    target: 2000000,
    raised: 2000000,
    endDate: "2024-01-15",
    status: "past",
  },
];

function IXOCard({ ixo }: { ixo: IXO }) {
  const progress = (ixo.raised / ixo.target) * 100;

  return (
    <Box
      borderRadius="12px"
      border="1px solid rgba(255, 255, 255, 0.10)"
      background="#191916"
      padding="24px"
      mb={4}
    >
      <Text
        color="#FFF"
        fontSize="20px"
        fontWeight="800"
        mb={2}
        fontFamily="Plus Jakarta Sans"
      >
        {ixo.title}
      </Text>
      <Text color="#A0A0A0" fontSize="14px" mb={4}>
        {ixo.description}
      </Text>
      
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text color="#FFF" fontSize="14px">
            {ixo.raised.toLocaleString()} USDC
          </Text>
          <Text color="#A0A0A0" fontSize="14px">
            {ixo.target.toLocaleString()} USDC
          </Text>
        </Box>
        <Box
          w="100%"
          h="4px"
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="full"
          overflow="hidden"
        >
          <Box
            w={`${progress}%`}
            h="100%"
            bg="brand-lime"
            transition="width 0.5s ease-in-out"
          />
        </Box>
      </Box>

      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#BEF642] to-[#96C42D] text-black font-semibold hover:opacity-90 transition-opacity">
        {ixo.status === "upcoming"
          ? "Get Notified"
          : ixo.status === "current"
          ? "Invest Now"
          : "View Details"}
      </button>
    </Box>
  );
}

export default function FundraisePage() {
  const [activeTab, setActiveTab] = useState("1");
  const [filteredIXOs, setFilteredIXOs] = useState<IXO[]>([]);

  useEffect(() => {
    const status = activeTab === "1" ? "current" : activeTab === "2" ? "upcoming" : "past";
    setFilteredIXOs(dummyIXOs.filter(ixo => ixo.status === status));
  }, [activeTab]);

  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh" pb="80px">
      <Box position="relative" w="100%" zIndex={0}>
        <Image
          src={backgroundImage.src}
          h="auto"
          objectFit="contain"
          position="absolute"
        />
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
                fontFamily="Plus Jakarta Sans"
              >
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
                label: "Current",
                key: "1",
                children: (
                  <Box className="space-y-4">
                    {filteredIXOs.map((ixo) => (
                      <IXOCard key={ixo.id} ixo={ixo} />
                    ))}
                  </Box>
                ),
              },
              {
                label: "Upcoming",
                key: "2",
                children: (
                  <Box className="space-y-4">
                    {filteredIXOs.map((ixo) => (
                      <IXOCard key={ixo.id} ixo={ixo} />
                    ))}
                  </Box>
                ),
              },
              {
                label: "Past",
                key: "3",
                children: (
                  <Box className="space-y-4">
                    {filteredIXOs.map((ixo) => (
                      <IXOCard key={ixo.id} ixo={ixo} />
                    ))}
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
          font-family: "Plus Jakarta Sans";
        }

        .ixo-tabs .ant-tabs-tab:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .ixo-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #BEF642;
        }

        .ixo-tabs .ant-tabs-ink-bar {
          background: #BEF642;
        }
      `}</style>
    </Box>
  );
}