import HomeIcon from "@/icons/Home";
import NftsIcon from "@/icons/Nfts";
import Soon from "@/icons/Soon";
import { Box, Flex, Link, Icon, Text, chakra } from "@chakra-ui/react";
import { Home, Layers, Coins, Gamepad2 } from "lucide-react"; // Assuming these icons are imported
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: <HomeIcon /> },
    { href: "/layerx", label: "NFTs", icon: <NftsIcon /> },
    { href: "/", label: "(Soon)", icon: <Soon />, disabled: true },
    // { href: "/xplay", label: "xPlay", icon: Gamepad2 },
    // { href: "/profile", label: "Profile", icon: Gamepad2 },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="50"
      borderColor="border"
      padding="12px 16px"
      height="64px"
      display={{ base: "block", md: "none" }}
      border="1px solid red"
      borderTop=" 1px solid rgba(255, 255, 255, 0.10)"
      background=" #000"
    >
      <Flex h="full" maxW="md" mx="auto" align="center" justify="space-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="relative"
              color={pathname === item.href ? "brand.lime" : "muted"}
              opacity={item.disabled ? 0.5 : 1}
              pointerEvents={item.disabled ? "none" : "auto"}
              _hover={{ color: "brand.lime" }}
              transition="color 0.2s"
            >
              {item?.icon}
              <Text
                marginTop="2px"
                color="#656565"
                fontSize="12px"
                fontWeight="500"
              >
                {item.label}
              </Text>
              {/* {item.disabled && (
                <chakra.span
                  marginTop="2px"
                  position="absolute"
                  top="-2"
                  fontSize="10px"
                  px="1"
                  borderRadius="full"
                  bg="brand.lime"
                  color="background"
                >
                  Soon
                </chakra.span>
              )} */}
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
