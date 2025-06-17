import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoType } from './todo';

@Injectable()
export class TodoService {
  public getTodos() {
    return httpResource<TodoType[]>(
      () => 'https://jsonplaceholder.typicode.com/todos'
    );
  }
}
