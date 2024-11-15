"use client";

import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Button, Input, message } from "antd";
import axios from "axios";
import { useStore } from "@/store";

export default function MintNFT() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useStore((state) => state.user);
  const accessToken = useStore((state) => state.accessToken);

  const handleMint = async () => {
    if (!url) {
      message.error("Please enter a valid URL");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://api.layerx.baboons.tech/api/nfts/mint/",
        { url },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      message.success("NFT minted successfully!");
      setUrl("");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to mint NFT");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Box className="text-center py-8">
        <Text color="white" opacity={0.6}>
          Please connect your wallet to mint NFTs
        </Text>
      </Box>
    );
  }

  return (
    <Box className="max-w-xl mx-auto py-8">
      <Text
        color="#33A7FF"
        fontSize="lg"
        fontWeight="bold"
        mb={4}
        fontFamily="Plus Jakarta Sans"
      >
        Mint New NFT
      </Text>
      <Box className="space-y-4">
        <Input
          placeholder="Enter media URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-black/50 border-[#33A7FF]/20 text-white"
        />
        <Button
          onClick={handleMint}
          loading={loading}
          className="w-full bg-[#33A7FF] text-white border-none hover:bg-[#33A7FF]/80"
        >
          Mint NFT
        </Button>
      </Box>
    </Box>
  );
}