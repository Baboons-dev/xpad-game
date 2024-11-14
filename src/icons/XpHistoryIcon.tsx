import { Icon, IconProps } from "@chakra-ui/react/icon";
import React from "react";

export default function XpIcon(props: IconProps) {
  return (
    <Icon
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="50" height="50" rx="25" fill="white" fillOpacity="0.1" />
      <path
        d="M25.9839 32.6327V17.3672H33.3331C34.7579 17.3672 35.9864 17.5998 37.0187 18.065C38.0654 18.5303 38.8723 19.199 39.4393 20.0714C40.0063 20.9291 40.2898 21.9468 40.2898 23.1245C40.2898 24.3021 40.0063 25.3198 39.4393 26.1776C38.8723 27.0353 38.0654 27.7041 37.0187 28.1839C35.9864 28.6491 34.7579 28.8817 33.3331 28.8817H28.8407L31.1305 26.6791V32.6327H25.9839ZM31.1305 27.2462L28.8407 24.9127H33.006C33.7184 24.9127 34.2418 24.7528 34.5762 24.4329C34.9251 24.1131 35.0996 23.6769 35.0996 23.1245C35.0996 22.572 34.9251 22.1358 34.5762 21.816C34.2418 21.4961 33.7184 21.3362 33.006 21.3362H28.8407L31.1305 19.0028V27.2462Z"
        fill="#BEF642"
      />
      <path
        d="M9.71045 32.6327L16.5145 23.1245L16.4927 26.7228L9.90672 17.3672H15.6858L19.524 23.0372L17.0597 23.059L20.8107 17.3672H26.3498L19.7639 26.5265V22.95L26.677 32.6327H20.7888L16.9507 26.701L19.3277 26.6791L15.5768 32.6327H9.71045Z"
        fill="#BEF642"
      />
    </Icon>
  );
}