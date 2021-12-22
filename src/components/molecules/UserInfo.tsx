import React from 'react';

import { Avatar, Flex, Text } from '@chakra-ui/react';

export const UserInfo: React.FC = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
  };
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Flex h="100%" alignItems="center">
      <Avatar
        name={fullName}
        borderRadius={5}
        marginRight={4}
        h="43px"
        w="43px"
      />
      <Text as="span" fontWeight="bold" fontSize="1rem" color="text.link">
        {fullName}
      </Text>
    </Flex>
  );
};

export default UserInfo;
