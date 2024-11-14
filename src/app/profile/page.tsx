"use client";
import Link from "next/link";
import { Box, Image, Text } from "@chakra-ui/react";
import { useUser } from "@/hooks";
import { useStore } from "@/store";
import ProfilePicture from "../../assets/profilePicture.png";
import backgroundImage from "../../assets/background.png";
import BackArrowIcon from "@/icons/ArrowBack";
import BackRightIcon from "@/icons/ArrowRightGrey";

export default function ProfilePage() {
  const { logout } = useUser();
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
                fontFamily="Plus Jakarta Sans"
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
            {user?.avatar ? (
              <Box
                padding="1px"
                width="100px"
                height="100px"
                zIndex="2"
                borderRadius="8px"
                backgroundImage="linear-gradient(#1F1F1F, #1F1F1F), linear-gradient(#1ED1FC, #47E473, #3AFF65)"
                backgroundClip="content-box, border-box"
                overflow="hidden"
              >
                <Image
                  src={user?.avatar}
                  alt="Description"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  objectPosition="center"
                  borderRadius="7px"
                />
              </Box>
            ) : (
              <Box
                padding="1px"
                width="100px"
                height="100px"
                zIndex="2"
                borderRadius="8px"
                backgroundImage="linear-gradient(#1F1F1F, #1F1F1F), linear-gradient(#1ED1FC, #47E473, #3AFF65)"
                backgroundClip="content-box, border-box"
                overflow="hidden"
              >
                <Image
                  src={ProfilePicture.src}
                  alt="Description"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  objectPosition="center"
                  borderRadius="7px"
                />
              </Box>
            )}
            <Text
              color=" #FFF"
              fontSize="30px"
              fontWeight="800"
              fontFamily="Plus Jakarta Sans"
            >
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
            <Text
              fontFamily="Plus Jakarta Sans"
              color=" #FFF"
              fontSize=" 14px"
              fontWeight=" 700"
            >
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
                cursor="pointer"
                fontFamily="Plus Jakarta Sans"
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
                cursor="pointer"
                fontFamily="Plus Jakarta Sans"
              >
                Rank Overview
              </Text>
              <Link href={"/rankOverview"}>
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
            <Link href={"/authenticate"}>
              <Text
                color="#FF3A3A"
                fontSize="14px"
                fontWeight=" 600"
                lineHeight="14px"
                cursor="pointer"
                fontFamily="Plus Jakarta Sans"
                onClick={() => logout()}
              >
                Logout
              </Text>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
