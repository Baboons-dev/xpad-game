import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
// import XpIcon from "../../Icons/XpIcon";
// import XpIconLayerX from "../../Icons/XpIconLayerX";
import { timeAgo } from "@/utils/global";
import { HistoryObject } from "@/types/type";
import XpIcon from "@/icons/XpIcon";
import XpIconLayerX from "@/icons/XpIconLayerX";

interface XpHistoryDetailsProps {
  date: string;
  historyItems: HistoryObject[];
}

export default function XpHistoryDetails({
  date,
  historyItems,
}: XpHistoryDetailsProps) {
  function getActivityText(activity: string) {
    switch (activity) {
      case "minted_nft":
        return "Minted an NFT";
      case "participated_competition":
        return "Participated in a competition";
      case "completed_task":
        return "Completed a Task";
      case "second_place_competition":
        return "Second position in competition";
      case "third_place_competition":
        return "Third position in competition";
      case "join_ixo":
        return "Join Ixo";
      case "win_competition":
        return "Win a competition";

      // Add more cases as needed
      default:
        return activity; // Fallback to the original if not mapped
    }
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Box
    // _notLast={{ marginBottom: "23px" }}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Divider
          border="1px solid rgba(255, 255, 255, 0.10) !important"
          width="45%"
        />
        <Text
          color="#8C8C8C"
          textAlign="center"
          fontSize="12px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
          paddingLeft="14px"
          paddingRight="14px"
          fontFamily="Plus Jakarta Sans"
          whiteSpace="nowrap"
        >
          {date}
        </Text>
        <Divider
          border="1px solid rgba(255, 255, 255, 0.10) !important"
          width="45%"
        />
      </Box>
      <Box mt="12px" display="flex" flexDirection="column" gap="12px">
        {historyItems.map((historyItems: HistoryObject, i) => (
          <Box key={i} display="flex" flexDirection="column" gap="14px">
            <Box
              borderRadius="26px"
              border="1px solid rgba(255, 255, 255, 0.10)"
              background="#191916"
              padding="24px"
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box display="flex" flexDirection="row" gap="10px">
                  {historyItems.awarded_from === "layerx" ? (
                    <XpIconLayerX />
                  ) : (
                    <XpIcon />
                  )}
                  <Box display="flex" flexDirection="column" gap="6px">
                    <Text
                      color="#FFF"
                      fontSize="14px"
                      fontStyle="normal"
                      fontWeight="700"
                      fontFamily="Plus Jakarta Sans"
                      lineHeight="normal"
                      textAlign="start"
                    >
                      {capitalizeFirstLetter(historyItems.awarded_from)}
                    </Text>
                    <Text
                      textAlign="start"
                      fontSize="14px"
                      fontStyle="normal"
                      fontWeight="400"
                      fontFamily="Plus Jakarta Sans"
                      lineHeight="normal"
                      color="rgba(255, 255, 255, 0.60)"
                    >
                      {getActivityText(historyItems.activity)} from{" "}
                      {capitalizeFirstLetter(historyItems.awarded_from)}
                    </Text>
                  </Box>
                </Box>
                <Text
                  whiteSpace="nowrap"
                  color="#8C8C8C"
                  fontFamily="Plus Jakarta Sans"
                  fontSize="12px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="normal"
                >
                  {timeAgo(historyItems.transaction_timestamp)}
                </Text>
              </Box>
              <Divider
                border="1px solid rgba(255, 255, 255, 0.10) !important"
                marginTop="18px"
                marginBottom="10px"
              />
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Text
                  color=" #8C8C8C"
                  fontSize="14px"
                  fontFamily="Plus Jakarta Sans"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="normal"
                >
                  Earned
                </Text>
                <Text
                  color={
                    historyItems.awarded_from === "layerx"
                      ? "#33DBB8"
                      : "#BEF642"
                  }
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="600"
                  fontFamily="Plus Jakarta Sans"
                  lineHeight="normal"
                >
                  {`${historyItems.points_awarded}XP`}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
