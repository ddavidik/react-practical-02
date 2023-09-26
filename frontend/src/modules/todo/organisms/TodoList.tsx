import { Stack } from 'src/shared/design-system';

import { TodoListItem, type TodoListItemProps } from '../molecules';
import { type TodoItem } from '../types';

export type TodoListProps = {
  items: Array<TodoItem>;
  onSetIsCompleted: TodoListItemProps['onSetIsCompleted'];
};

export function TodoList({ items, onSetIsCompleted }: TodoListProps) {
  return (
    <Stack>
      {items.map((item) => (
        <TodoListItem
          key={item.id}
          id={item.id}
          description={item.description}
          isCompleted={item.isCompleted}
          onSetIsCompleted={onSetIsCompleted}
        />
      ))}
    </Stack>
  );
}
