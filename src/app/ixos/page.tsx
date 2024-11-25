"use client";

import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../assets/background.png";
import { useRouter } from "next/navigation";
import { Swords, Coins } from "lucide-react";

export default function IXOsPage() {
  const router = useRouter();

  const cards = [
    {
      title: "Fundraise",
      icon: <Coins className="w-6 h-6 text-[#BEF642]" />,
      description: "Explore and participate in upcoming fundraising opportunities",
      buttonText: "Explore all IXOs",
      onClick: () => router.push("/ixos/fundraise"),
      borderColor: "#BEF642",
      iconBg: "#BEF642",
    },
    {
      title: "Portfolio",
      icon: <Swords className="w-6 h-6 text-[#BEF642]" />,
      description: "Track and manage your IXO investments",
      buttonText: "View my investments",
      onClick: () => router.push("/ixos/portfolio"),
      borderColor: "#BEF642",
      iconBg: "#BEF642",
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
              padding="16px"
              transition="all 0.3s"
            >
              <Box display="flex" flexDirection="row" gap="16px">
                <Box
                  width="44px"
                  height="44px"
                  borderRadius="8px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bg={`${card.iconBg}15`}
                >
                  {card.icon}
                </Box>

                <Box display="flex" flexDirection="column" gap="6px">
                  <Text
                    fontFamily="Plus Jakarta Sans"
                    color="#FFF"
                    fontSize="16px"
                    fontStyle="normal"
                    fontWeight="800"
                    lineHeight="normal"
                  >
                    {card.title}
                  </Text>
                  <Text
                    fontFamily="Plus Jakarta Sans"
                    color="#A0A0A0"
                    fontSize="14px"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                  >
                    {card.description}
                  </Text>
                </Box>
              </Box>

              <Box
                marginTop="16px"
                marginBottom="16px"
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Box
                  as="hr"
                  width="100%"
                  border="1px solid rgba(255, 255, 255, 0.10)"
                />
              </Box>

              <Box
                borderRadius="8px"
                border={`1px solid ${card.borderColor}`}
                height="42px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  bg: card.borderColor,
                  color: "#000",
                }}
                onClick={card.onClick}
              >
                <Text
                  fontFamily="Plus Jakarta Sans"
                  color="#FFF"
                  fontSize="14px"
                  fontWeight="700"
                  _hover={{
                    color: "#000",
                  }}
                >
                  {card.buttonText}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}