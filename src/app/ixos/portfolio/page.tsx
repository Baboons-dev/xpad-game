"use client";

import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../../assets/background.png";
import Link from "next/link";
import BackArrowIcon from "@/icons/ArrowBack";

export default function PortfolioPage() {
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
                My Portfolio
              </Text>
            </Box>
          </Box>
        </Box>

        <Box
          margin="0px 16px 24px 16px"
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Text color="whiteAlpha.600" fontSize="lg">
            No investments yet
          </Text>
        </Box>
      </Box>
    </Box>
  );
}