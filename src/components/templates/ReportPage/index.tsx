import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Flex, CircularProgress } from '@chakra-ui/react';

import { useAppSelector } from 'hooks';
import { selectHasData } from 'store/ducks/report/selectors';

import { PageHeader, EmptyPage } from 'components/molecules';

import SearchForm from './SearchForm';
import Report from './Report';

type ReportPageTemplateProps = {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
};

const mapStateToProps = createStructuredSelector({
  hasData: selectHasData,
});

const ReportPageTemplate: React.FC<ReportPageTemplateProps> = ({
  isSuccess,
  isLoading,
  isError,
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

      {isError && <div>Errro</div>}

      {!hasData && !isLoading && (
        <EmptyPage
          title="No reports"
          subtitle="Currently you have no data for the reports to be generated.
Once you start generating traffic through the Balance application 
the reports will be shown."
        />
      )}

      {isLoading && (
        <CircularProgress value={59} size="100px" thickness="4px" />
      )}

      {hasData && isSuccess && <Report />}
    </Flex>
  );
};

export default ReportPageTemplate;
