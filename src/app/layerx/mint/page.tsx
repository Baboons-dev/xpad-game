"use client";

import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../../assets/background.png";
import Link from "next/link";
import BackArrowIcon from "@/icons/ArrowBack";
import { Zap } from "lucide-react";
import { Button, Input, message } from "antd";
import { useState } from "react";

export default function MintPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    if (!url) {
      message.error("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success("NFT minted successfully!");
      setUrl("");
    } catch (error) {
      message.error("Failed to mint NFT");
    } finally {
      setLoading(false);
    }
  };

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
                Mint NFT
              </Text>
            </Box>
          </Box>
        </Box>

        <Box margin="0px 16px 24px 16px" position="relative">
          <Box
            borderRadius="12px"
            border="1px solid rgba(255, 255, 255, 0.10)"
            background="#191916"
            padding="24px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="24px"
          >
            {/* Icon */}
            <Box
              width="48px"
              height="48px"
              borderRadius="full"
              bg="rgba(51, 167, 255, 0.1)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Zap size={24} className="text-[#33A7FF]" />
            </Box>

            {/* Title and Description */}
            <Box textAlign="center" mb={2}>
              <Text
                color="white"
                fontSize="24px"
                fontWeight="800"
                mb={2}
                fontFamily="Plus Jakarta Sans"
              >
                Mint your own NFT
              </Text>
              <Text
                color="whiteAlpha.600"
                fontSize="14px"
                fontFamily="Plus Jakarta Sans"
              >
                Enter the link of the Tweet you'd like to Mint
              </Text>
            </Box>

            {/* Input Field */}
            <Box width="100%">
              <Input
                placeholder="Click to paste link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-black/50 border-[#33A7FF]/20 text-white h-12 text-center"
              />
            </Box>

            {/* Mint Button */}
            <Button
              onClick={handleMint}
              loading={loading}
              className="w-full h-12 bg-[#33A7FF] hover:bg-[#33A7FF]/80 text-white border-none font-semibold text-base"
            >
              Mint
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}