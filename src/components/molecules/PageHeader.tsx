import React from 'react';
import { Box, Heading, BoxProps } from '@chakra-ui/react';

type PageHeaderProps = BoxProps & {
  title: string;
  subtitle?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Box {...rest}>
    <Heading>{title}</Heading>
    {subtitle && (
      <Heading variant="secondary" size="sm">
        {subtitle}
      </Heading>
    )}
  </Box>
);

PageHeader.defaultProps = {
  subtitle: undefined,
};

export default PageHeader;
