import { Box, Image } from '@chakra-ui/react';
import React from 'react';
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
      <Box display="flex" alignItems="center" gap={2} width={['185%', '125%']} key="row1">
        <Image borderRadius="10px" width="150px" height="150px" src={row1Image1.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row1Image2.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row1Image3.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row1Image4.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row1Image1.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row1Image2.src} />
      </Box>
      <Box display="flex" alignItems="center" gap={2} width={['222%', '137%']} key="row2">
        <Image borderRadius="10px" width="150px" height="150px" src={row2Image1?.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row2Image2.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row2Image3.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row2Image4.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row2Image5.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row2Image1.src} />
      </Box>
      <Box display="flex" alignItems="center" gap={2} width={['185%', '125%']} key="row3">
        <Image borderRadius="10px" width="150px" height="150px" src={row1Image4.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row2Image4.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row2Image3.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row1Image1.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row1Image1.src} />
        <Image borderRadius="10px" width="150px" height="150px" src={row2Image4.src} />
      </Box>
    </Box>
  );
}
