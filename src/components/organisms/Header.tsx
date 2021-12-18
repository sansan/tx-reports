import React from 'react';
import { Box } from '@chakra-ui/react';

import { Logo } from 'components/atoms';

export const Header = () => (
  <Box w="100vw" h="80px" borderBottom="2px solid #F3F6F9">
    <Logo />
  </Box>
);

export default Header;
