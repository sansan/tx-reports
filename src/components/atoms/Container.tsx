/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

type ContainerProps = BoxProps & {
  variant?: 'primary' | 'secondary';
};

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = 'primary',
  ...rest
}) => (
  <Box
    {...rest}
    bg={variant === 'primary' ? 'background.dark' : 'background.light'}
    padding="1.25rem"
    borderRadius="10"
  >
    {children}
  </Box>
);

Container.defaultProps = { variant: 'primary' };

export default Container;
