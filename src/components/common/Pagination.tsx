import ArrowLeftIcon from '@/icons/ArrowLeft';
import ArrowRightIcon from '@/icons/ArrowRight';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  isDrawer?: boolean;
}

export default function Pagination(props: PaginationProps) {
  const { totalPages = 1, page, setPage, isDrawer = false } = props;

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      {totalPages && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent={['center', 'center', 'flex-end']}
          marginTop={isDrawer ? '0px' : '32px'}
        >
          <Box display="flex" alignItems="center" gap="8px">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={handlePreviousPage}
            >
              <ArrowLeftIcon />
            </Box>

            {Array.from({ length: totalPages }, (_, i) => (
              <Box
                key={i} // Use the index 'i' as the key
                height="40px"
                width="40px"
                display="flex"
                justifyContent="center"
                borderRadius="50%"
                alignItems="center"
                backgroundColor={i + 1 === page ? '#118BCF' : 'unset'}
                cursor="pointer"
                onClick={() => setPage(i + 1)} // Correctly pass the page number
              >
                <Text
                  color={i + 1 === page ? '#FFF' : '#7C7C82'}
                  textAlign="center"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="20px"
                  fontFamily="Plus Jakarta Sans"
                >
                  {i + 1} {/* Display the correct page number */}
                </Text>
              </Box>
            ))}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={handleNextPage}
            >
              <ArrowRightIcon />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
