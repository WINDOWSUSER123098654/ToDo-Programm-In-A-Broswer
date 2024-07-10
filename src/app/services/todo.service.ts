import {Todo} from "../models/todos";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TodoService {

  setAll(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  getAll(): Todo[] {
    return JSON.parse(localStorage.getItem('todos') ?? '[]') as Todo[];
  }

  delete(index: number) {
    const todos = this.getAll();
    todos.splice(index, 1);
    this.setAll(todos);
  }

  add(todo: Todo): void {
    const todos = this.getAll();
    todos.unshift(todo);
    this.setAll(todos);
  }

  update(todo: Todo, index: number): void {
    const todos = this.getAll();
    todos[index] = todo;
    this.setAll(todos);
  }
}
