import React from 'react';
import { Collapse } from '@chakra-ui/react';

import { Container } from 'components/atoms';

import DataTable from './Table';

type DataGroupProps = {
  title: string;
  id: string;
};

const DataGroup: React.FC<DataGroupProps> = ({ title, id }) => {
  const handleExpandReport = (i: string) => {
    console.log(i);
  };

  return (
    <>
      <Container
        variant="secondary"
        onClick={() => handleExpandReport(id)}
        _notFirst={{ marginTop: '5px' }}
      >
        {title}
      </Container>
      <Collapse in={false} animateOpacity>
        <DataTable groupId={id} />
      </Collapse>
    </>
  );
};

export default DataGroup;
