"use client";
import Link from "next/link";
import { Box, Divider, Image, Text, useToast } from "@chakra-ui/react";
import backgroundImage from "../../assets/background.png";
import NftMintingIcon from "@/icons/NftMinting";
import { FeatureType, HistoryObject, HistoryResponse } from "@/types/type";
import IxoFundraisingIcon from "@/icons/Ixo";
import XplayIcon from "@/icons/Xplay";
import { useUser } from "@/hooks";
import { useEffect, useState } from "react";
import { getMyHistory } from "@/api/apiCalls/user";
import XpHistoryDetails from "@/components/XpHistory/XpHistoryDetails";
import BackArrowIcon from "@/icons/ArrowBack";

export default function HomePage() {
  const { logout } = useUser();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [historyItemsList, setHistoryItemsList] =
    useState<HistoryResponse | null>();
  // const historyItemsList = useAppStore(
  //   (state: AppStoreState) => state.historyItemsList,
  // );
  // const setHistoryItemsList = useAppStore(
  //   (state: AppStoreState) => state.setHistoryItemsList,
  // );
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
      // const res: HistoryResponse = await getMyHistory(page, recordsPerPage);
      const res = {
        count: 38,
        current_page: 1,
        total_pages: 4,
        results: [
          {
            id: 63,
            points_awarded: 100,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-22T14:22:04.069204Z",
            activity: "third_place_competition",
            activity_id: null,
            user: 32,
          },
          {
            id: 64,
            points_awarded: 200,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-23T07:54:14.857832Z",
            activity: "minted_nft",
            activity_id: null,
            user: 32,
          },
          {
            id: 65,
            points_awarded: 200,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-23T08:00:08.147309Z",
            activity: "minted_nft",
            activity_id: null,
            user: 32,
          },
          {
            id: 67,
            points_awarded: 200,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-23T16:28:20.340436Z",
            activity: "minted_nft",
            activity_id: null,
            user: 32,
          },
          {
            id: 68,
            points_awarded: 200,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-23T16:30:09.063132Z",
            activity: "minted_nft",
            activity_id: null,
            user: 32,
          },
          {
            id: 69,
            points_awarded: 200,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-23T16:30:46.926157Z",
            activity: "minted_nft",
            activity_id: null,
            user: 32,
          },
          {
            id: 70,
            points_awarded: 200,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-23T16:33:09.169898Z",
            activity: "minted_nft",
            activity_id: null,
            user: 32,
          },
          {
            id: 71,
            points_awarded: 200,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-23T16:33:10.143426Z",
            activity: "minted_nft",
            activity_id: null,
            user: 32,
          },
          {
            id: 72,
            points_awarded: 200,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-23T16:33:15.137841Z",
            activity: "minted_nft",
            activity_id: null,
            user: 32,
          },
          {
            id: 73,
            points_awarded: 200,
            awarded_from: "layerx",
            transaction_timestamp: "2024-10-23T16:33:23.082047Z",
            activity: "minted_nft",
            activity_id: null,
            user: 32,
          },
        ],
      };
      console.log("res", res);
      setHistoryItemsList(res);
      setCurrentPage(res?.current_page);
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

  const handlePrevPage = () => {
    console.log("handlePrevPage");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function onPaginationitemClick(pageToFetch: number): void {
    console.log("onPaginationitemClick", pageToFetch);
    setCurrentPage(pageToFetch);
  }

  function handleNextPage(): void {
    console.log("handle next page");
    if (historyItemsList?.count && currentPage < historyItemsList?.count) {
      setCurrentPage(currentPage + 1);
    }
  }

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
    <Box w="100%" display="flex" flexDirection="column">
      <Box position="absolute" w="100%" zIndex={0}>
        <Image
          src={backgroundImage.src}
          h="auto"
          objectFit="contain"
          position="absolute"
        />
        <Box position="relative" margin="24px 16px 29px 16px">
          <Box display="flex" alignItems="center">
            <Link href={"/"}>
              <Box>
                <BackArrowIcon />
              </Box>
            </Link>

            <Box width="100%" display="flex" justifyContent="center">
              <Text
                color="#CECECE"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="800"
                lineHeight=" normal"
                fontFamily="Plus Jakarta Sans"
              >
                XP Overview
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          margin="0px 16px 24px 16px"
          position="relative"
          display="flex"
          gap="14px"
          flexDirection="column"
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
      </Box>
    </Box>
  );
}
