import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

export default function LoadingSpinner() {
  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center" padding={['66px 36px']}>
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="#00C22B88"
        color="#118BCF88" // Fallback color
        size="lg"
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            // background: 'conic-gradient(from 0deg, blue, green)', // Gradient from blue to green
            // mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))',
          },
        }}
      />
    </Box>
  );
}
