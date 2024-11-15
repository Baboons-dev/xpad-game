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

  const formatXP = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "XP";
  };

  const gradientStyle = {
    background: "linear-gradient(90deg, #1ED1FC 0%, #47E473 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontFamily: "Plus Jakarta Sans",
  };

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
              imageRendering: "auto",
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
            sx={!isAfter ? gradientStyle : { color: "#8C8C8C", fontFamily: "Plus Jakarta Sans" }}
            fontSize="14px"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
            marginBottom="24px"
          >
            {userLevelData?.current_points
              ? formatXP(userLevelData?.current_points)
              : isComplete
              ? formatXP(userLevelData?.ending_points)
              : formatXP(userLevelData?.starting_points)}
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
                  }${formatXP(userLevelData?.ending_points)}`}
            </span>
          </Text>
        </Box>

        {userLevelData?.next_level_name !== "N/A" && (
          <Box display="flex" alignItems="center" gap={"2px"}>
            {isComplete ? (
              <Text
                sx={gradientStyle}
                fontSize="14px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans"
              >
                Complete
              </Text>
            ) : (
              <Text
                color="#8C8C8C"
                fontSize="14px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans"
              >
                {userLevelData?.next_level_name}
              </Text>
            )}
          </Box>
        )}
      </Box>
      <Box marginTop="8px">
        <Progress
          borderRadius="26px"
          value={isComplete ? 100 : userLevelData?.percentage_completion}
          height="10px"
          sx={{
            '& > div[role="progressbar"]': {
              background: "linear-gradient(90deg, #1ED1FC 0%, #47E473 100%)",
            },
          }}
        />
      </Box>
    </Box>
  );
}