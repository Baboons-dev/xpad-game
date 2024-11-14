import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

export default function BackRightIcon(props: IconProps) {
  return (
    <Icon
      width="21px"
      height="20px"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_6_2812"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="20"
      >
        <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_6_2812)">
        <path
          d="M13.9581 10.8331H4.66646C4.43035 10.8331 4.23244 10.7532 4.07271 10.5935C3.91299 10.4338 3.83313 10.2358 3.83313 9.99972C3.83313 9.76361 3.91299 9.5657 4.07271 9.40597C4.23244 9.24625 4.43035 9.16639 4.66646 9.16639H13.9581L11.5831 6.79139C11.4165 6.62472 11.3366 6.43028 11.3435 6.20806C11.3505 5.98584 11.4304 5.79139 11.5831 5.62472C11.7498 5.45806 11.9477 5.37125 12.1769 5.36431C12.406 5.35736 12.604 5.43722 12.7706 5.60389L16.5831 9.41639C16.6665 9.49972 16.7255 9.59 16.7602 9.68722C16.7949 9.78445 16.8123 9.88861 16.8123 9.99972C16.8123 10.1108 16.7949 10.215 16.7602 10.3122C16.7255 10.4094 16.6665 10.4997 16.5831 10.5831L12.7706 14.3956C12.604 14.5622 12.406 14.6421 12.1769 14.6351C11.9477 14.6282 11.7498 14.5414 11.5831 14.3747C11.4304 14.2081 11.3505 14.0136 11.3435 13.7914C11.3366 13.5692 11.4165 13.3747 11.5831 13.2081L13.9581 10.8331Z"
          fill="#8C8C8C"
        />
      </g>
    </Icon>
  );
}