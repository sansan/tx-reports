import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

import { Logo, Icon } from 'components/atoms';
import { UserInfo } from 'components/molecules';

export const Header = () => (
  <Flex
    w="100vw"
    h="80px"
    borderBottom="2px solid #F3F6F9"
    alignItems="center"
    paddingRight={9}
    paddingLeft={5}
  >
    <Box paddingX={4} marginRight={5}>
      <Logo />
    </Box>
    <Icon variant="menu" />
    <Flex flexGrow="1" justifyContent="flex-end">
      <UserInfo />
    </Flex>
  </Flex>
);

export default Header;
