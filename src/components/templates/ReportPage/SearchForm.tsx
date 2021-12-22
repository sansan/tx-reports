/* eslint-disable react/no-children-prop */
import React, { useState, FC } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  Select,
} from '@chakra-ui/react';
import { FaCalendar, FaCaretDown } from 'react-icons/fa';

import { Gateway, Project } from 'typings';

type SearchFormProps = {
  onSubmit: Function;
  isLoading: boolean;
  gateways?: Gateway[];
  projects?: Project[];
};

const SearchForm: FC<SearchFormProps> = ({
  onSubmit,
  isLoading,
  gateways,
  projects,
}) => {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedGateway, setSelectedGateway] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const loadReport = () => {
    onSubmit({
      projectId: selectedProject,
      gatewayId: selectedGateway,
      from,
      to,
    });
  };

  return (
    <Stack direction={{ base: 'column', lg: 'row' }}>
      <Box w="145px">
        <Select
          placeholder="All projects"
          size="sm"
          onChange={(e) => setSelectedProject(e.target.value)}
          icon={<FaCaretDown />}
        >
          {projects?.map(({ projectId, name }) => (
            <option key={projectId} value={projectId}>
              {name}
            </option>
          ))}
        </Select>
      </Box>

      <Box w="145px">
        <Select
          placeholder="All gateways"
          size="sm"
          onChange={(e) => setSelectedGateway(e.target.value)}
          icon={<FaCaretDown />}
        >
          {gateways?.map(({ gatewayId, name }) => (
            <option key={gatewayId} value={gatewayId}>
              {name}
            </option>
          ))}
        </Select>
      </Box>

      <Box w="120px">
        <InputGroup>
          <Input
            placeholder="From date"
            disabled={isLoading}
            onChange={(e) => setFrom(e.target.value)}
          />
          <InputRightElement children={<FaCalendar color="white" />} />
        </InputGroup>
      </Box>

      <Box w="120px">
        <InputGroup>
          <Input
            placeholder="From date"
            variant="primary"
            disabled={isLoading}
            onChange={(e) => setTo(e.target.value)}
          />
          <InputRightElement children={<FaCalendar color="white" />} />
        </InputGroup>
      </Box>

      <Button
        variant="primary"
        size="sm"
        disabled={isLoading}
        onClick={loadReport}
      >
        Generate report
      </Button>
    </Stack>
  );
};

SearchForm.defaultProps = {
  gateways: [],
  projects: [],
};

export default SearchForm;
