import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Collapse } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { setExpandTable } from 'store/ducks/report/slice';
import { selectIsContainerOpen } from 'store/ducks/report/selectors';

import { Container } from 'components/atoms';

import DataTable from './Table';

type DataGroupProps = {
  title: string;
  id: string;
};

const mapStateToProps = createStructuredSelector({
  isOpen: (state, id) => selectIsContainerOpen(state, id),
});

const DataGroup: React.FC<DataGroupProps> = ({ title, id }) => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => mapStateToProps(state, id));

  const handleExpandReport = (i: string) => {
    dispatch(setExpandTable({ id: i, value: !isOpen }));
  };

  return (
    <>
      <Container
        variant="secondary"
        onClick={() => handleExpandReport(id)}
        _notFirst={{ marginTop: '5px' }}
        cursor="pointer"
      >
        {title}
      </Container>
      <Collapse in={isOpen} animateOpacity>
        <DataTable groupId={id} />
      </Collapse>
    </>
  );
};

export default DataGroup;
