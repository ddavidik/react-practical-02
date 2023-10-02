import { useState } from 'react';

import { type TodoItem, type TodoItemId } from '../types';

export type State = {
  items: TodoItem[];
  nextId: number;
  filter: (typeof FILTER_STATES)[number];
};

export const FILTER_STATES = ['all', 'completed', 'not-completed'] as const;

export function useTodoList() {
  const [state, setState] = useState<State>({
    items: INITIAL_ITEMS,
    nextId: 4,
    filter: FILTER_STATES[0],
  });

  const { items, filter } = state;

  const addItem = (item: Omit<TodoItem, 'id'>) => {
    setState((state) => ({
      ...state,
      items: [{ ...item, id: state.nextId }, ...items],
      nextId: state.nextId + 1,
    }));
  };

  const setItemIsCompleted = (id: TodoItemId, isCompleted: boolean) => {
    setState((state) => ({
      ...state,
      items: items.map((item) => {
        if (id !== item.id) return item;

        return { ...item, isCompleted };
      }),
    }));
  };

  const removeItem = (id: TodoItemId) => {
    setState((state) => ({
      ...state,
      items: items.filter((todoItem) => todoItem.id !== id),
    }));
  };

  const setFilter = (filterIndex: number) => {
    const filter = FILTER_STATES[filterIndex];

    setState((state) => ({ ...state, filter }));
  };

  return {
    items,
    filter,
    addItem,
    setItemIsCompleted,
    removeItem,
    setFilter,
  };
}

const INITIAL_ITEMS: Array<TodoItem> = [
  {
    id: 1,
    description: 'go grocery shopping',
    isCompleted: true,
  },
  {
    id: 2,
    description: 'wash the dishes',
    isCompleted: true,
  },
  {
    id: 3,
    description: 'write some React code',
    isCompleted: false,
  },
];
