import { useState } from 'react';

import { type TodoItem, type TodoItemId } from '../types';

export function useTodoList() {
  const [state, setState] = useState({
    items: INITIAL_ITEMS,
    nextId: 4,
  });

  const { items } = state;

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
    // TODO
  };

  return {
    items,
    addItem,
    setItemIsCompleted,
    removeItem,
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
