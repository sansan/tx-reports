import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Flex, CircularProgress } from '@chakra-ui/react';

import { useAppSelector } from 'hooks';
import { selectHasData } from 'store/ducks/report/selectors';

import { PageHeader } from 'components/molecules';

import SearchForm from './SearchForm';
import Report from './Report';
import NoData from './NoData';

type ReportPageTemplateProps = {
  isSuccess: boolean;
  isLoading: boolean;
};

const mapStateToProps = createStructuredSelector({
  hasData: selectHasData,
});

const ReportPageTemplate: React.FC<ReportPageTemplateProps> = ({
  isSuccess,
  isLoading,
}) => {
  const { hasData } = useAppSelector(mapStateToProps);

  return (
    <Flex flexDirection="column" w="100%">
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent="space-between"
        w="100%"
        mb="1.75rem"
      >
        <PageHeader
          title="Reports"
          subtitle="Easily generate a report of your transactions"
        />
        <SearchForm isLoading={isLoading} />
      </Flex>

      {!hasData && !isLoading && <NoData />}

      {isLoading && (
        <CircularProgress value={59} size="100px" thickness="4px" />
      )}

      {isSuccess && <Report />}
    </Flex>
  );
};

export default ReportPageTemplate;
