import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoService, TodoType } from './todo-service';
import { TodoStore } from './todo-store';

@Component({
  selector: 'app-todo',
  imports: [CommonModule],
  template: `
    @if(store.isLoading()) {
    <h1>Loading...</h1>
    } @else {
    <h1>
      {{ store.todosCount() }} Todo{{ store.todosCount() === 1 ? '' : 's' }}
    </h1>
    <ul>
      @for(todo of store.todos(); track todo.id) {
      <li>{{ todo.id }} {{ todo.title }}</li>
      <button (click)="toggleTodo(todo.id)">
        {{ todo.completed ? 'Undo' : 'Complete' }}
      </button>
      <button (click)="removeTodo(todo.id)">Remove</button>
      }
    </ul>
    <h2>
      {{ store.completedTodosCount() }} Completed Todo{{
        store.completedTodosCount() === 1 ? '' : 's'
      }}
    </h2>
    <ul>
      @for(todo of store.completedTodos(); track todo.id) {
      <li>{{ todo.id }} {{ todo.title }}</li>
      }
    </ul>
    <button (click)="addTodo()">Add Todo</button>
    <button (click)="clearTodos()">Clear Todos</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStore, TodoService],
})
export default class Todo {
  readonly store = inject(TodoStore);

  protected addTodo() {
    this.store.addTodo({
      id: this.store.lastId() + 1,
      title: 'Lorem ipsum dolor sit amet',
      completed: false,
      userId: 1,
    } satisfies TodoType);
  }

  protected removeTodo(id: number) {
    this.store.removeTodo(id);
  }

  protected toggleTodo(id: number) {
    this.store.toggleTodo(id);
  }

  protected clearTodos() {
    this.store.clearTodos();
  }
}
