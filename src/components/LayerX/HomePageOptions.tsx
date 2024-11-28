import { Box, Text, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { CompetitionIcon } from './icons';

interface HomePageOptionProps {
  heading: string;
  subHeading: string;
  backgroundColor: string;
  paddingTopMain: string;
  buttonText: string;
  redirectUrl: string;
  showIcon?: boolean;
}

export default function HomePageOption(props: HomePageOptionProps) {
  const {
    heading,
    subHeading,
    backgroundColor,
    paddingTopMain,
    buttonText,
    redirectUrl,
    showIcon,
  } = props;
  return (
    <Box
      borderRadius="20px"
      backgroundColor={backgroundColor}
      border="1px solid rgba(255, 255, 255, 0.10)"
      margin="12px 16px 46px 16px"
      paddingTop={paddingTopMain}
      paddingBottom="20px"
      paddingX="20px"
      position="relative">
      {showIcon && (
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom="16px">
          <CompetitionIcon color="#33A7FF" />
        </Box>
      )}
      <Text
        color="#FFF"
        textAlign="center"
        fontFamily="Plus Jakarta Sans"
        fontSize="28px"
        fontStyle=" normal"
        fontWeight="800"
        lineHeight="normal">
        {heading}
      </Text>
      <Text
        color="#A0A0A0"
        textAlign="center"
        fontFamily="Plus Jakarta Sans"
        fontSize="14px"
        fontStyle="normal"
        fontWeight="400"
        marginTop="16px"
        lineHeight="normal">
        {subHeading}
      </Text>

      <Divider
        marginBottom="20px"
        marginTop="20px"
        border="1px solid rgba(255, 255, 255, 0.10) !important"
      />

      <Box
        borderRadius="8px"
        background="#337BFF"
        height="42px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor={'pointer'}
        transition="all 0.3s"
        _hover={{
          bg: '#337BFF',
          color: '#000',
        }}>
        <Link href={redirectUrl}>
          <Text fontFamily="Plus Jakarta Sans" color={'#FFF'} fontSize="14px" fontWeight="700">
            {buttonText}
          </Text>
        </Link>
      </Box>
    </Box>
  );
}
