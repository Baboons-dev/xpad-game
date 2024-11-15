"use client";
import Link from "next/link";
import { Box, Divider, Image, Text, useToast } from "@chakra-ui/react";
import backgroundImage from "../../assets/background.png";
import { HistoryObject, HistoryResponse } from "@/types/type";
import { useUser } from "@/hooks";
import { useEffect, useState } from "react";
import XpHistoryDetails from "@/components/XpHistory/XpHistoryDetails";
import BackArrowIcon from "@/icons/ArrowBack";
import axios from "axios";
import { useStore } from "@/store";
import { Spin } from "antd";

export default function HomePage() {
  const { logout } = useUser();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [historyItemsList, setHistoryItemsList] =
    useState<HistoryResponse | null>();
  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMiwid2FsbGV0X2FkZHJlc3MiOiIweDc4Njg5MzNhMzZGYjc3NzFmNWQ4N2M2NTg1N0Y2M0M5MjY0ZDI4YTQiLCJlbWFpbCI6IiIsImV4cCI6MTc2MjY5Nzg0Nn0.c1t7t9GI39SEqGfH4F_gchkhxtj0iYXBqvQ_T-qEIgA";
  const toast = useToast();

  // Helper function to format the date
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}, ${month}, ${year}`;
  };

  useEffect(() => {
    fetchHistory(currentPage, 10);
  }, [currentPage]);

  const fetchHistory = async (page: number, recordsPerPage: number) => {
    try {
      setIsDataLoading(true);
      const res = await axios.get<HistoryResponse>(
        `https://api.xpad-extension.baboons.tech/api/account/xp-transactions/?page=${page}&per_page=${recordsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log("res", res);
      res && setHistoryItemsList(res?.data);
      setCurrentPage(res?.data?.current_page);
      setIsDataLoading(false);
    } catch (error: any) {
      setIsDataLoading(false);
      toast({
        title: "Something went wrong while xp history",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const historyItemsGroupedByDate: Record<string, HistoryObject[]> = (
    historyItemsList?.results ?? []
  ).reduce((acc, transaction) => {
    const date = formatDate(transaction.transaction_timestamp);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, HistoryObject[]>);

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
            <Link href={"/profile"}>
              <Box>
                <BackArrowIcon />
              </Box>
            </Link>

            <Box width="100%" display="flex" justifyContent="center">
              <Text
                color="white"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="800"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans"
                mb="4"
              >
                XP Overview
              </Text>
            </Box>
          </Box>
        </Box>
        {isDataLoading ? (
          <div className="flex items-center justify-center w-full">
            <Spin />
          </div>
        ) : (
          <Box
            margin="0px 16px 24px 16px"
            position="relative"
            display="flex"
            gap="14px"
            flexDirection="column"
            pb="80px" // Add bottom padding to prevent content from being hidden under the menu
          >
            {Object.entries(historyItemsGroupedByDate).map(
              ([date, historyItems], i) => (
                <XpHistoryDetails
                  key={i}
                  date={date}
                  historyItems={historyItems}
                />
              ),
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}