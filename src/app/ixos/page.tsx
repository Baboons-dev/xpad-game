"use client";

import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../assets/background.png";
import { useRouter } from "next/navigation";

export default function IXOsPage() {
  const router = useRouter();

  const cards = [
    {
      title: "Fundraise",
      description: "Explore and participate in upcoming fundraising opportunities",
      buttonText: "Explore all IXOs",
      onClick: () => router.push("/ixos/fundraise"),
      gradient: "from-[#BEF642] to-[#96C42D]",
    },
    {
      title: "Portfolio",
      description: "Track and manage your IXO investments",
      buttonText: "View my investments",
      onClick: () => router.push("/ixos/portfolio"),
      gradient: "from-[#BEF642] to-[#96C42D]",
    },
  ];

  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh">
      <Box position="relative" w="100%" zIndex={0}>
        <Image
          src={backgroundImage.src}
          h="auto"
          objectFit="contain"
          position="absolute"
        />
        <Box position="relative" margin="36px 16px 36px 16px">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text
              color="#BEF642"
              fontSize="32px"
              fontStyle="normal"
              fontWeight="800"
              lineHeight="normal"
              fontFamily="Plus Jakarta Sans"
            >
              IXOs
            </Text>
          </Box>
        </Box>

        <Box
          margin="0px 16px 24px 16px"
          position="relative"
          display="flex"
          gap="14px"
          flexDirection="column"
          pb="80px"
        >
          {cards.map((card, i) => (
            <Box
              key={i}
              borderRadius="12px"
              border="1px solid rgba(255, 255, 255, 0.10)"
              background="#191916"
              padding="24px"
              transition="all 0.3s"
            >
              <Text
                color="#FFF"
                fontSize="24px"
                fontStyle="normal"
                fontWeight="800"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans"
                mb={4}
              >
                {card.title}
              </Text>
              <Text
                color="#A0A0A0"
                fontSize="16px"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="normal"
                fontFamily="Plus Jakarta Sans"
                mb={6}
              >
                {card.description}
              </Text>
              <button
                onClick={card.onClick}
                className={`w-full py-3 rounded-lg bg-gradient-to-r ${card.gradient} text-black font-semibold hover:opacity-90 transition-opacity`}
              >
                {card.buttonText}
              </button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}