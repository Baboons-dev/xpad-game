import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

export default function BackArrowIcon(props: IconProps) {
  return (
    <Icon
      width="22px"
      height="20px"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22 8.80526H4.57348L10.8973 2.48148L9.20789 0.792114L0 10L9.20789 19.2079L10.8973 17.5185L4.57348 11.1947H22V8.80526Z"
        fill="white"
      />
    </Icon>
  );
}
