import { Stack, Tab, TabList, Tabs } from 'src/shared/design-system';

import { FILTER_STATES, State } from '../hooks/useTodoList';
import { TodoListItem, type TodoListItemProps } from '../molecules';
import { type TodoItem } from '../types';

export type TodoListProps = {
  items: Array<TodoItem>;
  filter: State['filter'];
  onSetIsCompleted: TodoListItemProps['onSetIsCompleted'];
  removeItem: TodoListItemProps['removeItem'];
  setFilter: (index: number) => void;
};

export function TodoList({
  items,
  filter,
  onSetIsCompleted,
  removeItem,
  setFilter,
}: TodoListProps) {
  const filteredItems =
    filter === 'all'
      ? items
      : items.filter((todoItem) =>
          filter === 'completed' ? todoItem.isCompleted : !todoItem.isCompleted,
        );

  return (
    <Tabs
      index={FILTER_STATES.indexOf(filter)}
      onChange={setFilter}
      variant="soft-rounded"
      colorScheme="blue"
      my="4"
    >
      <TabList sx={{ mb: 4 }}>
        <Tab>All</Tab>
        <Tab>Completed</Tab>
        <Tab>Not completed</Tab>
      </TabList>
      <Stack border="1px" borderRadius="base" borderColor="gray.300">
        {filteredItems.map((item) => (
          <TodoListItem
            key={item.id}
            id={item.id}
            description={item.description}
            isCompleted={item.isCompleted}
            onSetIsCompleted={onSetIsCompleted}
            removeItem={removeItem}
          />
        ))}
      </Stack>
    </Tabs>
  );
}
