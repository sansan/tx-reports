import React from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { Header, SideBar } from 'components/organisms';

export const DefaultLayout: React.FC = () => (
  <Flex flexDirection="column">
    <Header />
    <Flex h="calc(100vh - 80px)" paddingTop={7}>
      <SideBar />
      <Flex marginLeft={5} flexGrow="1" marginRight={9}>
        <Outlet />
      </Flex>
    </Flex>
  </Flex>
);

export default DefaultLayout;
