import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

export default function ProfileIconGrey(props: IconProps) {
  return (
    <Icon
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_b_1014_30918)">
        <rect width="34" height="34" rx="17" fill="white" fillOpacity="0.09" />
        <rect
          x="0.25"
          y="0.25"
          width="33.5"
          height="33.5"
          rx="16.75"
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="0.5"
        />
        <mask
          id="mask0_1014_30918"
          maskUnits="userSpaceOnUse"
          x="5"
          y="5"
          width="24"
          height="24"
        >
          <rect
            x="5.66675"
            y="5.66666"
            width="22.6667"
            height="22.6667"
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask0_1014_30918)">
          <path
            d="M17.0001 17C15.9612 17 15.0719 16.63 14.3321 15.8902C13.5923 15.1504 13.2224 14.2611 13.2224 13.2222C13.2224 12.1833 13.5923 11.2939 14.3321 10.5541C15.0719 9.8143 15.9612 9.4444 17.0001 9.4444C18.039 9.4444 18.9284 9.8143 19.6682 10.5541C20.408 11.2939 20.7779 12.1833 20.7779 13.2222C20.7779 14.2611 20.408 15.1504 19.6682 15.8902C18.9284 16.63 18.039 17 17.0001 17ZM9.44458 22.6666V21.9111C9.44458 21.3759 9.58231 20.884 9.85777 20.4354C10.1332 19.9868 10.4992 19.6444 10.9557 19.4083C11.9316 18.9203 12.9233 18.5544 13.9307 18.3104C14.9381 18.0664 15.9612 17.9444 17.0001 17.9444C18.039 17.9444 19.0622 18.0664 20.0696 18.3104C21.077 18.5544 22.0687 18.9203 23.0446 19.4083C23.5011 19.6444 23.867 19.9868 24.1425 20.4354C24.418 20.884 24.5557 21.3759 24.5557 21.9111V22.6666C24.5557 23.1861 24.3707 23.6307 24.0008 24.0006C23.6309 24.3706 23.1862 24.5555 22.6668 24.5555H11.3335C10.814 24.5555 10.3693 24.3706 9.99944 24.0006C9.62953 23.6307 9.44458 23.1861 9.44458 22.6666Z"
            fill="#D9D9D9"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_b_1014_30918"
          x="-44"
          y="-44"
          width="122"
          height="122"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="22" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1014_30918"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1014_30918"
            result="shape"
          />
        </filter>
      </defs>
    </Icon>
  );
}
