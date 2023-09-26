import { Box, Checkbox } from 'src/shared/design-system';

import { type TodoItemId } from '../types';

export type TodoListItemProps = {
  id: TodoItemId;
  description: string;
  isCompleted: boolean;
  onSetIsCompleted: (id: TodoItemId, isCompleted: boolean) => void;
};

export function TodoListItem({
  id,
  description,
  isCompleted,
  onSetIsCompleted,
}: TodoListItemProps) {
  return (
    <Box>
      <Checkbox
        isChecked={isCompleted}
        onChange={(event) => onSetIsCompleted(id, event.target.checked)}
      />{' '}
      {description}
    </Box>
  );
}
