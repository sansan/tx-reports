import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const SideBar = () => {
  useEffect(() => {
    console.log('mount');
  }, []);

  return (
    <Flex flexDirection="column" h="100%" as="ul">
      <li>
        <Link to="/">dash</Link>
      </li>
      <li>
        <Link to="/reports">reports</Link>
      </li>
    </Flex>
  );
};

export default SideBar;
