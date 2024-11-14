"use client";
import { useUser } from "@/hooks";
import { useStore } from "@/store";
import ProfilePicture from "../assets/profilePicture.png";
import { Box, Image, Text } from "@chakra-ui/react";
import XpIcon from "@/icons/XpIcon";

export function TopBar() {
  const { logout } = useUser();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      height="64px"
      padding="12px 16px"
    >
      <Box display="flex" gap="13px" flexDirection="row">
        <Box
          padding={"1px"}
          height="40px"
          width="40px"
          zIndex={2}
          style={{
            borderRadius: "8px",
            backgroundImage:
              "linear-gradient(#1F1F1F, #1F1F1F), linear-gradient(#1ED1FC, #47E473, #3AFF65)",
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
          }}
        >
          <Box height="40px" width="40px" overflow="hidden">
            <Image
              src={ProfilePicture.src}
              objectFit="cover"
              height="100%"
              width="100%"
              style={{ borderRadius: "0" }}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text
            color="#FFF"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="800"
            lineHeight="normal"
          >
            Demo User
          </Text>
        </Box>
      </Box>
      <Box display="flex" gap="13px" flexDirection="row">
        <Box display="flex" justifyContent="center" alignItems="center">
          <XpIcon />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text
            color="#33DBB8"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
          >
            2500
          </Text>
        </Box>
      </Box>
    </Box>
  );
}