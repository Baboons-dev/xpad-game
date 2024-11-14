import { Box, Text, Image, Progress, useToast } from "@chakra-ui/react";
import React from "react";

interface RankProps {
  isProfilePage?: boolean;
  userLevelData?: any | null;
  isComplete?: boolean;
  isAfter?: boolean;
}

export default function Rank(props: RankProps) {
  const {
    userLevelData,
    isComplete = false,
    isProfilePage,
    isAfter = false,
  } = props;

  return (
    <Box
      borderRadius="12px"
      width={"100%"}
      background="#191916"
      border="1px solid rgba(255, 255, 255, 0.10)"
      padding="10px 14px"
    >
      <Box gap="16px" display="flex" height="48px" alignItems="center">
        <Box width="32px" height="32px">
          <Image
            src={userLevelData?.level_image}
            alt="User Level"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              imageRendering: "auto", // Adjust rendering to avoid pixelation
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems="flex-start"
          flexDirection="column"
          gap="6px"
        >
          <Text
            color="#FFF"
            textAlign="center"
            fontFamily="Plus Jakarta Sans"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
          >
            {userLevelData?.level_name}
          </Text>
        </Box>
      </Box>
      <Box
        height="21px"
        marginTop="18px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box>
          <Text
            color={isAfter ? "#8C8C8C" : "#19A0ED"}
            fontSize="14px"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
            marginBottom="24px"
          >
            {userLevelData?.current_points
              ? userLevelData?.current_points
              : isComplete
              ? userLevelData?.ending_points + "XP"
              : userLevelData?.starting_points}
            <span
              style={{
                color: "#8C8C8C",
                textAlign: "center",
                fontFamily: "Plus Jakarta Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "normal",
              }}
            >
              {isComplete
                ? ""
                : `${
                    userLevelData?.current_user_level || isProfilePage
                      ? "/"
                      : "-"
                  }${userLevelData?.ending_points}XP`}
            </span>
          </Text>
        </Box>

        {userLevelData?.next_level_name !== "N/A" && (
          <Box display="flex" alignItems="center" gap={"2px"}>
            {isComplete ? (
              <h1>complete</h1>
            ) : (
              // <CheckIcon />
              <h1>incomplete</h1>
              // <CustomRightArrow fillColor={"#D9D9D9"} />
            )}
            <Text
              color={isComplete ? "#19A0ED" : "#8C8C8C"}
              fontSize=" 14px"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="normal"
            >
              {isComplete ? "Complete" : userLevelData?.next_level_name}
            </Text>
          </Box>
        )}
      </Box>
      <Box marginTop="8px">
        <Progress
          borderRadius="26px"
          value={isComplete ? 100 : userLevelData?.percentage_completion}
          height="16px"
        />
      </Box>
    </Box>
  );
}
