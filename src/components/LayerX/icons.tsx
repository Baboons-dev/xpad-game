import { Icon, IconProps } from '@chakra-ui/react';

export function NftIcon({ color = '#33A7FF', ...props }: IconProps & { color?: string }) {
  return (
    <Icon width="44px" height="44px" viewBox="0 0 44 44" fill="none" {...props}>
      <rect width="44" height="44" rx="8" fill={color} fillOpacity="0.15" />
      <path
        d="M22.83 12.18C22.5695 12.0611 22.2864 11.9996 22 11.9996C21.7136 11.9996 21.4306 12.0611 21.17 12.18L12.6 16.08C12.4226 16.1582 12.2717 16.2864 12.1658 16.4488C12.0599 16.6113 12.0035 16.8011 12.0035 16.995C12.0035 17.1889 12.0599 17.3787 12.1658 17.5411C12.2717 17.7036 12.4226 17.8317 12.6 17.91L21.18 21.82C21.4406 21.9388 21.7236 22.0003 22.01 22.0003C22.2964 22.0003 22.5795 21.9388 22.84 21.82L31.42 17.92C31.5975 17.8417 31.7483 17.7136 31.8543 17.5511C31.9602 17.3887 32.0166 17.1989 32.0166 17.005C32.0166 16.8111 31.9602 16.6213 31.8543 16.4588C31.7483 16.2964 31.5975 16.1682 31.42 16.09L22.83 12.18Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 27.65L22.83 31.81C22.5694 31.9289 22.2864 31.9904 22 31.9904C21.7136 31.9904 21.4306 31.9289 21.17 31.81L12 27.65"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 22.65L22.83 26.81C22.5694 26.9289 22.2864 26.9904 22 26.9904C21.7136 26.9904 21.4306 26.9289 21.17 26.81L12 22.65"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function CompetitionIcon({ color = '#33A7FF', ...props }: IconProps & { color?: string }) {
  return (
    <Icon width="61px" height="60px" viewBox="0 0 44 44" fill="none" {...props}>
      <rect width="44" height="44" rx="8" fill={color} fillOpacity="0.15" />
      <path
        d="M28 16H16C14.8954 16 14 16.8954 14 18V20C14 22.2091 15.7909 24 18 24H26C28.2091 24 30 22.2091 30 20V18C30 16.8954 29.1046 16 28 16Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 24V26C26 26.7956 25.6839 27.5587 25.1213 28.1213C24.5587 28.6839 23.7956 29 23 29H20C19.2044 29 18.4413 28.6839 17.8787 28.1213C17.3161 27.5587 17 26.7956 17 26V24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 20V20.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 29V32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 32H25"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function MintIcon({ color = '#33A7FF', ...props }: IconProps & { color?: string }) {
  return (
    <Icon width="44px" height="44px" viewBox="0 0 44 44" fill="none" {...props}>
      <rect width="44" height="44" rx="8" fill={color} fillOpacity="0.15" />
      <path
        d="M22 14V30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 22H30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
