import { useState } from 'react';

import {
  Box,
  Checkbox,
  DeleteIcon,
  IconButton,
  Spacer,
} from 'src/shared/design-system';

import { type TodoItemId } from '../types';

export type TodoListItemProps = {
  id: TodoItemId;
  description: string;
  isCompleted: boolean;
  onSetIsCompleted: (id: TodoItemId, isCompleted: boolean) => void;
  removeItem: (id: TodoItemId) => void;
};

export function TodoListItem({
  id,
  description,
  isCompleted,
  onSetIsCompleted,
  removeItem,
}: TodoListItemProps) {
  const [display, setDisplay] = useState<string>('none');

  const handleDelete = () => removeItem(id);

  return (
    <Box
      _hover={{ bg: 'gray.100' }}
      sx={{ py: 2.5, px: 2, display: 'flex', flexDir: 'row' }}
      onMouseEnter={() => setDisplay('inline-flex')}
      onMouseLeave={() => setDisplay('none')}
    >
      <Checkbox
        isChecked={isCompleted}
        onChange={(event) => onSetIsCompleted(id, event.target.checked)}
        sx={isCompleted ? { color: 'gray.500', textDecor: 'line-through' } : {}}
      >
        {description}
      </Checkbox>
      <Spacer />
      <IconButton
        colorScheme="red"
        aria-label="delete"
        icon={<DeleteIcon />}
        size="xs"
        display={display}
        onClick={handleDelete}
      />
    </Box>
  );
}
