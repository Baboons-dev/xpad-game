"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, Icon } from "@chakra-ui/react";

const NavIcon = ({ active, children, color }: { active: boolean; children: React.ReactNode; color: string }) => (
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
        bg={color}
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
      color: "#33DBB8",
      icon: (active: boolean) => (
        <Icon w={6} h={6}  color={active ? "#33DBB8" : "#595959"}>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.08579 11.5858C9.46086 11.2107 9.96957 11 10.5 11H14.5C15.0304 11 15.5391 11.2107 15.9142 11.5858C16.2893 11.9609 16.5 12.4696 16.5 13V21C16.5 21.5523 16.0523 22 15.5 22C14.9477 22 14.5 21.5523 14.5 21V13L10.5 13L10.5 21C10.5 21.5523 10.0523 22 9.5 22C8.94772 22 8.5 21.5523 8.5 21V13C8.5 12.4696 8.71071 11.9609 9.08579 11.5858Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8567 3.23489L4.85452 9.23575C4.74341 9.32965 4.65412 9.44663 4.59289 9.57859C4.53167 9.71054 4.49997 9.85426 4.5 9.99973V19C4.5 19.2652 4.60536 19.5195 4.79289 19.7071C4.98043 19.8946 5.23478 20 5.5 20H19.5C19.7652 20 20.0196 19.8946 20.2071 19.7071C20.3946 19.5195 20.5 19.2652 20.5 19V9.99997C20.5 9.8545 20.4683 9.71054 20.4071 9.57859C20.3459 9.44663 20.2566 9.32963 20.1455 9.23573L20.1403 9.2313L13.1455 3.23673C13.1448 3.23611 13.144 3.2355 13.1433 3.23489C12.9632 3.08351 12.7354 3.00049 12.5 3.00049C12.2646 3.00049 12.0368 3.08351 11.8567 3.23489ZM10.5635 1.70921C11.105 1.25157 11.791 1.00049 12.5 1.00049C13.209 1.00049 13.895 1.25157 14.4365 1.70921L14.4417 1.71364L21.4365 7.70821C21.4374 7.70901 21.4384 7.70981 21.4393 7.71061C21.7713 7.9919 22.0382 8.34205 22.2213 8.73678C22.405 9.13257 22.5001 9.56365 22.5 9.99997C22.5 10 22.5 9.99989 22.5 9.99997V19C22.5 19.7956 22.1839 20.5587 21.6213 21.1213C21.0587 21.6839 20.2957 22 19.5 22H5.5C4.70435 22 3.94129 21.6839 3.37868 21.1213C2.81607 20.5587 2.5 19.7956 2.5 19V10.0002C2.5 10.0001 2.5 10.0003 2.5 10.0002C2.49993 9.56389 2.59503 9.13257 2.77868 8.73678C2.96183 8.34208 3.22864 7.99195 3.56059 7.71067L10.5635 1.70921Z" fill="currentColor"/>
          </svg>
        </Icon>
      ),
    },
    {
      href: "/layerx",
      label: "NFTs",
      color: "#33A7FF",
      icon: (active: boolean) => (
        <Icon w={6} h={6}  viewBox="0 0 24 24" color={active ? "#33A7FF" : "#595959"}>
         <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2553 1.27016C11.6461 1.09197 12.0705 0.999756 12.5 0.999756C12.9293 0.999756 13.3536 1.0919 13.7443 1.26996L22.3298 5.17793C22.682 5.33467 22.9814 5.58985 23.1919 5.91283C23.4038 6.23774 23.5165 6.61725 23.5165 7.00511C23.5165 7.39298 23.4038 7.77248 23.1919 8.0974C22.9813 8.42046 22.6818 8.67569 22.3295 8.83242L13.755 12.7299C13.7549 12.73 13.7551 12.7299 13.755 12.7299C13.3643 12.9081 12.9395 13.0005 12.51 13.0005C12.0804 13.0005 11.6558 12.9082 11.265 12.7299L2.68996 8.8222C2.33791 8.66545 2.0386 8.41031 1.82807 8.0874C1.61624 7.76249 1.50346 7.38298 1.50346 6.99511C1.50346 6.60724 1.61624 6.22774 1.82807 5.90283C2.03865 5.57984 2.33806 5.32465 2.69023 5.16791L11.2553 1.27016C11.2554 1.27011 11.2552 1.2702 11.2553 1.27016ZM12.5 2.99976C12.3568 2.99976 12.2153 3.03051 12.085 3.08993L3.50354 6.99515L3.51472 7.00008L12.0947 10.9101C12.225 10.9696 12.3668 11.0005 12.51 11.0005C12.6532 11.0005 12.7947 10.9697 12.925 10.9103L21.5165 7.00508L21.5057 7.00033L12.9157 3.09026C12.7854 3.03084 12.6432 2.99976 12.5 2.99976Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.58933 17.2368C1.81749 16.7338 2.41018 16.5111 2.91313 16.7392L12.085 20.9001C12.2153 20.9595 12.3568 20.9903 12.5 20.9903C12.6432 20.9903 12.7847 20.9595 12.915 20.9001L12.9169 20.8992L22.0869 16.7392C22.5898 16.5111 23.1825 16.7338 23.4107 17.2368C23.6388 17.7397 23.4161 18.3324 22.9131 18.5606L13.745 22.7197C13.7447 22.7199 13.7443 22.72 13.744 22.7202C13.3534 22.8982 12.9292 22.9903 12.5 22.9903C12.0708 22.9903 11.6466 22.8982 11.256 22.7202C11.2557 22.72 11.2553 22.7199 11.255 22.7197L2.08687 18.5606C1.58392 18.3324 1.36116 17.7397 1.58933 17.2368Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.58933 12.2368C1.81749 11.7338 2.41018 11.5111 2.91313 11.7392L12.085 15.9001C12.2153 15.9595 12.3568 15.9903 12.5 15.9903C12.6432 15.9903 12.7847 15.9595 12.915 15.9001L12.9169 15.8992L22.0869 11.7392C22.5898 11.5111 23.1825 11.7338 23.4107 12.2368C23.6388 12.7397 23.4161 13.3324 22.9131 13.5606L13.745 17.7197C13.7447 17.7199 13.7443 17.72 13.744 17.7202C13.3534 17.8982 12.9292 17.9903 12.5 17.9903C12.0708 17.9903 11.6466 17.8982 11.256 17.7202C11.2557 17.72 11.2553 17.7199 11.255 17.7197L2.08687 13.5606C1.58392 13.3324 1.36116 12.7397 1.58933 12.2368Z" fill="currentColor"/>
        </Icon>
      ),
    },
    {
      href: "/ixos",
      label: "Soon",
      color: "#BEF642",
      disabled: true,
      icon: (active: boolean) => (
        <Icon w={6} h={6} viewBox="0 0 24 24" color="#656565" opacity="0.6">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 3C5.73858 3 3.5 5.23858 3.5 8C3.5 10.7614 5.73858 13 8.5 13C11.2614 13 13.5 10.7614 13.5 8C13.5 5.23858 11.2614 3 8.5 3ZM1.5 8C1.5 4.13401 4.63401 1 8.5 1C12.366 1 15.5 4.13401 15.5 8C15.5 11.866 12.366 15 8.5 15C4.63401 15 1.5 11.866 1.5 8Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.653 10.0206C17.8459 9.50308 18.4218 9.23997 18.9393 9.4329C20.0422 9.84407 21.0236 10.5267 21.7927 11.4176C22.5618 12.3086 23.0939 13.3791 23.3397 14.5301C23.5855 15.6812 23.537 16.8757 23.1989 18.0031C22.8607 19.1304 22.2437 20.1544 21.405 20.9801C20.5662 21.8059 19.5328 22.4068 18.4003 22.7273C17.2678 23.0479 16.0727 23.0776 14.9256 22.8139C13.7785 22.5502 12.7165 22.0015 11.8376 21.2186C10.9588 20.4356 10.2916 19.4437 9.89766 18.3346C9.71283 17.8141 9.98489 17.2424 10.5053 17.0576C11.0258 16.8727 11.5975 17.1448 11.7823 17.6652C12.0637 18.4575 12.5403 19.166 13.168 19.7252C13.7958 20.2845 14.5544 20.6764 15.3737 20.8648C16.1931 21.0531 17.0467 21.0319 17.8556 20.8029C18.6646 20.574 19.4028 20.1447 20.0019 19.5549C20.601 18.9651 21.0417 18.2337 21.2832 17.4284C21.5248 16.6232 21.5593 15.77 21.3838 14.9478C21.2082 14.1256 20.8282 13.361 20.2788 12.7246C19.7294 12.0882 19.0284 11.6006 18.2407 11.3069C17.7232 11.114 17.4601 10.5381 17.653 10.0206Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 6C6.5 5.44772 6.94772 5 7.5 5H8.5C9.05228 5 9.5 5.44772 9.5 6V10C9.5 10.5523 9.05228 11 8.5 11C7.94772 11 7.5 10.5523 7.5 10V7C6.94772 7 6.5 6.55228 6.5 6Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5079 13.1678C16.9012 12.78 17.5344 12.7845 17.9221 13.1778L18.6221 13.8878C19.0079 14.2791 19.0057 14.9084 18.6171 15.297L15.7971 18.117C15.4066 18.5075 14.7734 18.5075 14.3829 18.117C13.9924 17.7265 13.9924 17.0933 14.3829 16.7028L16.5008 14.5849L16.4979 14.582C16.1101 14.1887 16.1146 13.5555 16.5079 13.1678Z" fill="currentColor"/>
        </Icon>
      ),
    },
    {
      href: "/xplay",
      label: "xPlay",
      color: "#F6C942",
      icon: (active: boolean) => (
        <Icon w={6} h={6}  viewBox="0 0 24 24" color={active ? "#F6C942" : "#595959"}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 11H10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H15.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 10H18.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <g clip-path="url(#clip0_85_213)">
              <path d="M10 10H9V9C9 8.45 8.55 8 8 8C7.45 8 7 8.45 7 9V10H6C5.45 10 5 10.45 5 11C5 11.55 5.45 12 6 12H7V13C7 13.55 7.45 14 8 14C8.55 14 9 13.55 9 13V12H10C10.55 12 11 11.55 11 11C11 10.45 10.55 10 10 10Z" fill="currentColor"/>
              <path d="M15.01 11C14.46 11 14.01 11.45 14.01 12C14.01 12.55 14.46 13 15.01 13C15.56 13 16.01 12.55 16.01 12C16.01 11.45 15.56 11 15.01 11Z" fill="currentColor"/>
              <path d="M18.01 9C17.46 9 17.01 9.45 17.01 10C17.01 10.55 17.46 11 18.01 11C18.56 11 19.01 10.55 19.01 10C19.01 9.45 18.56 9 18.01 9Z" fill="currentColor"/>
              <path d="M22.31 8.62C22.31 8.62 22.3 8.5 22.29 8.49C22.16 7.26 21.59 6.12 20.67 5.29C19.75 4.46 18.56 4 17.32 4H6.68C5.42 4 4.23 4.45 3.33 5.26C2.43 6.08 1.83 7.25 1.71 8.49L1.69 8.62C1.53 9.97 1 14.49 1 16C1 17.07 1.42 18.07 2.17 18.83C2.93 19.59 3.93 20 5 20C6.41 20 7.16 19.25 7.71 18.71L9.12 17.3C9.31 17.11 9.56 17.01 9.83 17.01H14.17C14.43 17.01 14.69 17.12 14.88 17.3L16.29 18.71C16.84 19.26 17.58 20 19 20C20.07 20 21.07 19.58 21.83 18.83C22.59 18.08 23 17.07 23 16C23 14.49 22.47 9.97 22.31 8.62ZM20.41 17.41C20.03 17.79 19.53 18 19 18C18.44 18 18.2 17.78 17.71 17.29L16.3 15.88C15.73 15.31 14.98 15 14.18 15H9.84C9.04 15 8.29 15.31 7.72 15.88L6.31 17.29C5.82 17.78 5.58 18 5.02 18C4.49 18 3.98 17.79 3.61 17.41C3.23 17.03 3.02 16.53 3.02 16C3.02 14.89 3.37 11.59 3.7 8.87L3.72 8.69C3.8 7.94 4.15 7.23 4.69 6.74C5.22 6.26 5.93 6 6.7 6H17.34C18.08 6 18.8 6.27 19.35 6.77C19.9 7.27 20.25 7.95 20.33 8.74V8.86C20.67 11.58 21.02 14.89 21.02 16C21.02 16.53 20.81 17.04 20.43 17.41H20.41Z" fill="currentColor"/>
            </g>
            <defs>
              <clipPath id="clip0_85_213">
                <rect width="22" height="16" fill="white" transform="translate(1 4)"/>
              </clipPath>
            </defs>
          </svg>
        </Icon>
      ),
    },
    {
      href: "/profile",
      label: "Profile",
      color: "#33DBB8",
      icon: (active: boolean) => (
        <Icon w={6} h={6}  viewBox="0 0 24 24" color={active ? "#33DBB8" : "#595959"}>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 3C10.8431 3 9.5 4.34315 9.5 6C9.5 7.65685 10.8431 9 12.5 9C14.1569 9 15.5 7.65685 15.5 6C15.5 4.34315 14.1569 3 12.5 3ZM7.5 6C7.5 3.23858 9.73858 1 12.5 1C15.2614 1 17.5 3.23858 17.5 6C17.5 8.76142 15.2614 11 12.5 11C9.73858 11 7.5 8.76142 7.5 6ZM4.5 17C4.5 14.2386 6.73858 12 9.5 12H15.5C18.2614 12 20.5 14.2386 20.5 17C20.5 19.7614 18.2614 22 15.5 22H9.5C6.73858 22 4.5 19.7614 4.5 17ZM9.5 14C7.84315 14 6.5 15.3431 6.5 17C6.5 18.6569 7.84315 20 9.5 20H15.5C17.1569 20 18.5 18.6569 18.5 17C18.5 15.3431 17.1569 14 15.5 14H9.5Z" fill="currentColor"/>
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
              gap="2px"
              opacity={item.disabled ? 0.5 : 1}
              position="relative"
            >
              <NavIcon active={isActive} color={item.color}>{item.icon(isActive)}</NavIcon>
              <Box
                fontSize="12px"
                color={isActive ? item.color : "#595959"}
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