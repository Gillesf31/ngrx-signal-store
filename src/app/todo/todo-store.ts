import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, pipe, switchMap, tap } from 'rxjs';
import { TodoService, TodoType } from './todo-service';

type TodoStateType = {
  todos: TodoType[];
  isLoading: boolean | null;
};

const initialState: TodoStateType = {
  todos: [],
  isLoading: null,
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
  withMethods((store, todoService = inject(TodoService)) => ({
    loadTodos: rxMethod<void>(
      pipe(
        tap(() => patchState(store, () => ({ isLoading: true }))),
        switchMap(() => todoService.getTodos()),
        // NOTE: Simulate delay
        delay(1000),
        tapResponse<TodoType[]>({
          next: (todos) => patchState(store, { todos, isLoading: false }),
          error: () => patchState(store, { isLoading: false }),
        })
      )
    ),
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
