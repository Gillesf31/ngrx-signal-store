import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import Todo from './todo/todo';

@Component({
  imports: [RouterModule, Todo],
  selector: 'app-root',
  template: `
    <h1>App works!</h1>
    <app-todo />
    <router-outlet></router-outlet>
  `,
})
export class App {}
