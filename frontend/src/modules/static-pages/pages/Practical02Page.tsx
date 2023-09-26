import { useTodoList } from 'src/modules/todo/hooks';
import { AddTodoListForm, TodoList } from 'src/modules/todo/organisms';
import { Box, Heading } from 'src/shared/design-system';

export function Practical02Page() {
  const { items, addItem, setItemIsCompleted } = useTodoList();

  return (
    <Box>
      <Heading>Practical 02</Heading>
      <AddTodoListForm addItem={addItem} />
      <TodoList items={items} onSetIsCompleted={setItemIsCompleted} />
    </Box>
  );
}
