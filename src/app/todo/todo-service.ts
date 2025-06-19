import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type TodoType = {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
  readonly userId: number;
};

@Injectable()
export class TodoService {
  readonly #httpClient = inject(HttpClient);
  public getTodos(): Observable<TodoType[]> {
    return this.#httpClient.get<TodoType[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }
}
