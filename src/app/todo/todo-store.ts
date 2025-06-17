import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TodoType } from './todo';

type TodoStateType = {
  todos: TodoType[];
  isLoading: boolean;
};

const initialState: TodoStateType = {
  todos: [],
  isLoading: false,
};

export const TodoStore = signalStore(
  withState(initialState),
  withComputed(({ todos }) => ({
    todosCount: computed(() => todos().length),
    completedTodos: computed(() => todos().filter((todo) => todo.completed)),
    lastId: computed(() =>
      todos().reduce(
        (last, item) => (item.id !== undefined ? item.id : last),
        0
      )
    ),
  })),
  withComputed(({ completedTodos }) => ({
    completedTodosCount: computed(() => completedTodos().length),
  })),
  withMethods((store) => ({
    addTodo(todo: TodoType) {
      patchState(store, (state) => ({ todos: [...state.todos, todo] }));
    },
    removeTodo(id: number) {
      patchState(store, (state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
    toggleTodo(id: number) {
      patchState(store, (state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      }));
    },
    clearTodos() {
      patchState(store, () => ({ todos: [] }));
    },
  }))
);
