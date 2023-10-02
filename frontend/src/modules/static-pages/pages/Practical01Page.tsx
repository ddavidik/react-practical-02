import { useState } from 'react';

import {
  Box,
  Button,
  Heading,
  Paragraph,
  Stack,
} from 'src/shared/design-system';

const INITIAL_COUNTER = 0;

export function Practical01Page() {
  const [counter, setCounter] = useState<number>(INITIAL_COUNTER);

  return (
    <Box>
      <Heading>Practical 01</Heading>
      <Paragraph>Counter: {counter}</Paragraph>
      <Stack direction="row">
        <Button
          colorScheme="blue"
          onClick={() => setCounter((counter) => counter - 1)}
        >
          -1
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => setCounter((counter) => counter + 1)}
        >
          +1
        </Button>
        <Button colorScheme="red" onClick={() => setCounter(INITIAL_COUNTER)}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
