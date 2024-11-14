"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, Icon } from "@chakra-ui/react";

const NavIcon = ({ active, children }: { active: boolean; children: React.ReactNode }) => (
  <Box
    position="relative"
    width="24px"
    height="24px"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    {active && (
      <Box
        position="absolute"
        inset="0"
        bg="#33DBB8"
        filter="blur(8px)"
        opacity="0.3"
        borderRadius="full"
      />
    )}
    {children}
  </Box>
);

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: (active: boolean) => (
        <Icon viewBox="0 0 24 24" color={active ? "#33DBB8" : "#595959"}>
          <path
            fill="currentColor"
            d="M12 2.1L1 12h3v9h7v-6h2v6h7v-9h3L12 2.1zm0 2.691l6 5.4V19h-3v-6H9v6H6v-8.809l6-5.4z"
          />
        </Icon>
      ),
    },
    {
      href: "/layerx",
      label: "NFTs",
      icon: (active: boolean) => (
        <Icon viewBox="0 0 24 24" color={active ? "#33DBB8" : "#595959"}>
          <path
            fill="currentColor"
            d="M19 5v14H5V5h14zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"
          />
        </Icon>
      ),
    },
    {
      href: "/ixos",
      label: "Soon",
      disabled: true,
      icon: (active: boolean) => (
        <Icon viewBox="0 0 24 24" color="#595959" opacity="0.5">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"
          />
        </Icon>
      ),
    },
    {
      href: "/xplay",
      label: "xPlay",
      icon: (active: boolean) => (
        <Icon viewBox="0 0 24 24" color={active ? "#33DBB8" : "#595959"}>
          <path
            fill="currentColor"
            d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zm-2.1.72c-.08.09-.21.19-.42.19-.15 0-.29-.06-.39-.16L15.83 14H8.17l-2.84 2.84c-.1.1-.24.16-.39.16-.21 0-.34-.1-.42-.19-.08-.09-.16-.23-.13-.44l1.09-7.66C5.63 7.74 6.48 7 7.47 7h9.06c.99 0 1.84.74 1.98 1.72l1.09 7.66c.03.2-.05.34-.12.43z"
          />
        </Icon>
      ),
    },
    {
      href: "/profile",
      label: "Profile",
      icon: (active: boolean) => (
        <Icon viewBox="0 0 24 24" color={active ? "#33DBB8" : "#595959"}>
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
          />
        </Icon>
      ),
    },
  ];

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      height="64px"
      bg="black"
      borderTop="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      px={4}
      backdropFilter="blur(10px)"
      zIndex={50}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.disabled ? "#" : item.href}
            style={{ textDecoration: "none" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="4px"
              opacity={item.disabled ? 0.5 : 1}
              position="relative"
            >
              <NavIcon active={isActive}>{item.icon(isActive)}</NavIcon>
              <Box
                fontSize="12px"
                color={isActive ? "#33DBB8" : "#595959"}
                opacity={isActive ? 1 : 1}
              >
                {item.label}
              </Box>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}