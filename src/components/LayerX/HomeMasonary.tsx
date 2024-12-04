import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import '@/assets/scss/HomeMasonary.scss';
import row1Image1 from '../../assets/row1Image1.png';
import row1Image2 from '../../assets/row1Image2.png';
import row1Image3 from '../../assets/row1Image3.png';
import row1Image4 from '../../assets/row1Image4.png';

import row2Image1 from '../../assets/row2Image1.png';
import row2Image2 from '../../assets/row2Image2.png';
import row2Image3 from '../../assets/row2Image3.png';
import row2Image4 from '../../assets/row2Image4.png';
import row2Image5 from '../../assets/row2Image5.png';

export default function NFTShowcase() {
  return (
    <Box
      className="NFTShowcase"
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={2}
      height="fit-content"
      maxWidth={['unset', 'unset', '799px']}
      width={['auto']}
      left="0"
      top="0"
      bottom="0"
      right="0"
      margin="auto"
      padding="0.5rem 0"
      overflow="hidden">
      <Box className="box-row-item" display={'flex'}>
        {Array.from({ length: 2 }, (_, idx) => (
          <Box
            className="img-row-wrap row1"
            display="flex"
            flexShrink={'0'}
            alignItems="start"
            key="row1">
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row1Image1.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row1Image2.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row1Image3.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row1Image4.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row1Image1.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row1Image2.src}
            />
          </Box>
        ))}
      </Box>

      <Box className="box-row-item" display={'flex'} justifyContent={'flex-end'}>
        {Array.from({ length: 2 }, (_, idx) => (
          <Box
            className="img-row-wrap row2"
            display="flex"
            flexShrink={'0'}
            alignItems="start"
            key="row2">
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row2Image1?.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row2Image2.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row2Image3.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row2Image4.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row2Image5.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row2Image1.src}
            />
          </Box>
        ))}
      </Box>

      <Box className="box-row-item" display={'flex'}>
        {Array.from({ length: 2 }, (_, idx) => (
          <Box
            className="img-row-wrap row3"
            display="flex"
            flexShrink={'0'}
            alignItems="start"
            key="row3">
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row2Image3.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row2Image4.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row1Image4.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row1Image1.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row1Image1.src}
            />
            <Image
              borderRadius="10px"
              width="150px"
              height="150px"
              marginRight={2}
              src={row2Image4.src}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
