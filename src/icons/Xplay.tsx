import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

export default function XplayIcon({ color = "#F6C942", ...props }: IconProps & { color?: string }) {
  return (
    <Icon
      width="44px"
      height="44px"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="44" height="44" rx="8" fill={color} fillOpacity="0.15" />
      <path
        d="M16 21H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 19V23"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 22H25.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 20H28.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.32 15H16.68C15.6903 15.0002 14.7358 15.3674 14.001 16.0305C13.2663 16.6936 12.8034 17.6055 12.702 18.59C12.696 18.642 12.692 18.691 12.685 18.742C12.604 19.416 12 24.456 12 26C12 26.7956 12.3161 27.5587 12.8787 28.1213C13.4413 28.6839 14.2044 29 15 29C16 29 16.5 28.5 17 28L18.414 26.586C18.789 26.2109 19.2976 26.0001 19.828 26H24.172C24.7024 26.0001 25.211 26.2109 25.586 26.586L27 28C27.5 28.5 28 29 29 29C29.7956 29 30.5587 28.6839 31.1213 28.1213C31.6839 27.5587 32 26.7956 32 26C32 24.455 31.396 19.416 31.315 18.742C31.308 18.692 31.304 18.642 31.298 18.591C31.1968 17.6063 30.7341 16.6941 29.9993 16.0308C29.2645 15.3675 28.3099 15.0003 27.32 15Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}