import { useState } from 'react';

import { Button, Input, Stack } from 'src/shared/design-system';

import { TodoItem } from '../types';

export type AddTodoListFormProps = {
  addItem: (item: Omit<TodoItem, 'id'>) => void;
};

export function AddTodoListForm({ addItem }: AddTodoListFormProps) {
  const [description, setDescription] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (description === '') return;

        addItem({ description, isCompleted: false });
        setDescription('');
      }}
    >
      <Stack direction="row" sx={{ mb: 3 }}>
        <Input
          type="text"
          placeholder="What shell to be done?"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button type="submit">Add</Button>
      </Stack>
    </form>
  );
}
