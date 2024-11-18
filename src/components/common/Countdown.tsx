import { Box, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface CountdownInterface {
  endDateString: string;
  color?: string;
  fontWeight?: number;
  fontSize?: string;
}

function Countdown(props: CountdownInterface) {
  const { endDateString, color, fontWeight, fontSize } = props;
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const endDate = new Date(Date.parse(endDateString));
      const now = new Date();
      const timeDifference = endDate.getTime() - now.getTime();

      const seconds = Math.floor(timeDifference / 1000) % 60;
      const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
      const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const formattedTime = `${Math.max(days, 0)}d . ${Math.max(
        hours,
        0,
      )}h . ${Math.max(minutes, 0)}m . ${Math.max(seconds, 0)}s`;
      setRemainingTime(formattedTime);
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [endDateString]);

  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <Text
          fontFamily="Montserrat"
          fontWeight={fontWeight ? fontWeight : "unset"}
          fontSize={fontSize ? fontSize : "13px"}
          color={color ? color : "unset"}
        >
          {remainingTime}
        </Text>
      </Box>
    </>
  );
}

export default Countdown;
