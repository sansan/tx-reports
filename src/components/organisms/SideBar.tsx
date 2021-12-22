import React from 'react';
import { Flex } from '@chakra-ui/react';

import { menuItems } from 'config/navigation';
import { MenuItem } from 'components/molecules';

export const SideBar: React.FC = () => {
  const isOpen = false;

  return (
    <Flex
      flexDirection="column"
      h="100%"
      w={`${isOpen ? '200px' : '80px'}`}
      paddingLeft={5}
    >
      {menuItems.map(({ to, title, icon }) => (
        <MenuItem key={to} to={to} title={title} icon={icon} />
      ))}
    </Flex>
  );
};

export default SideBar;
