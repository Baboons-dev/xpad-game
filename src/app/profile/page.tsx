"use client";
import Link from "next/link";
import { Box, Image, Text } from "@chakra-ui/react";
import { useUser } from "@/hooks";
import { useStore } from "@/store";
import backgroundImage from "../../assets/background.png";
import BackArrowIcon from "@/icons/ArrowBack";
import BackRightIcon from "@/icons/ArrowRightGrey";

export default function ProfilePage() {
  const user = useStore((state) => state.user);

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
            <Box>
              <BackArrowIcon />
            </Box>

            <Box width="100%" display="flex" justifyContent="center">
              <Text
                color="#CECECE"
                fontSize="14px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight=" normal"
              >
                My Profile
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="12px"
          >
            <Box
              padding={"1px"}
              zIndex={2}
              width="100px"
              height="100px"
              style={{
                borderRadius: "24px",
                backgroundImage:
                  "linear-gradient(#1F1F1F, #1F1F1F), linear-gradient(#1ED1FC, #47E473, #3AFF65)",
                backgroundOrigin: "border-box",
                backgroundClip: "content-box, border-box",
              }}
            >
              <Box>
                {" "}
                <Image
                  src={user?.avatar}
                  objectFit="cover"
                  height="100%"
                  width="100%"
                  style={{ borderRadius: "0" }}
                />
              </Box>
            </Box>
            <Text color=" #FFF" fontSize=" 30px" fontWeight=" 800">
              {user?.username}
            </Text>
          </Box>

          <Box
            borderRadius="8px"
            border=" 1px solid #FFF"
            height="42px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="10px"
          >
            <Text color=" #FFF" fontSize=" 14px" fontWeight=" 700">
              Connect Wallet
            </Text>
          </Box>
          <Box
            marginTop="10px"
            display="flex"
            flexDirection="column"
            gap="16px"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="8px"
            >
              <Text
                color=" #8C8C8C"
                fontSize="14px"
                fontWeight=" 600"
                lineHeight="14px" /* 100% */
              >
                View XP History
              </Text>
              <Link href={"/xpHistory"}>
                <BackRightIcon />
              </Link>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="8px"
            >
              <Text
                color=" #8C8C8C"
                fontSize="14px"
                fontWeight=" 600"
                lineHeight="14px" /* 100% */
              >
                Rank Overview
              </Text>
              <Link href={"/xpHistory"}>
                <BackRightIcon />
              </Link>
            </Box>
          </Box>
          <Box
            marginTop="36px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              color="#FF3A3A"
              fontSize="14px"
              fontWeight=" 600"
              lineHeight="14px"
            >
              Logout
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
