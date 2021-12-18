import React from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { Header, SideBar } from 'components/organisms';

export const DefaultLayout: React.FC = () => (
  <Flex flexDirection="column">
    <Header />
    <Flex h="calc(100vh - 82px)">
      <SideBar />
      <Flex>
        <Outlet />
      </Flex>
    </Flex>
  </Flex>
);

export default DefaultLayout;
