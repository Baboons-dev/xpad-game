"use client";

import { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../../assets/background.png";
import { Tabs } from "antd";
import FeaturedNFTs from "@/components/LayerX/FeaturedNFTs";
import MyNFTs from "@/components/LayerX/MyNFTs";
import Link from "next/link";
import BackArrowIcon from "@/icons/ArrowBack";

export default function NFTsPage() {
  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh">
      <Box position="relative" w="100%" zIndex={0}>
        <Image
          src={backgroundImage.src}
          h="auto"
          objectFit="contain"
          position="absolute"
        />
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
                fontFamily="Plus Jakarta Sans"
              >
                NFTs
              </Text>
            </Box>
          </Box>
        </Box>

        <Box margin="0px 16px 24px 16px" position="relative">
          <Tabs
            defaultActiveKey="1"
            className="layerx-tabs"
            items={[
              {
                label: "Featured NFTs",
                key: "1",
                children: <FeaturedNFTs />,
              },
              {
                label: "My NFTs",
                key: "2",
                children: <MyNFTs />,
              },
            ]}
          />
        </Box>
      </Box>

      <style jsx global>{`
        .layerx-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .layerx-tabs .ant-tabs-tab {
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Plus Jakarta Sans';
        }

        .layerx-tabs .ant-tabs-tab:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .layerx-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #33A7FF;
        }

        .layerx-tabs .ant-tabs-ink-bar {
          background: #33A7FF;
        }
      `}</style>
    </Box>
  );
}