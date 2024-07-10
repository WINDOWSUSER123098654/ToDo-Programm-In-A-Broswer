import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {Todo} from "../models/todos";
import {FormBuilder, FormsModule} from "@angular/forms";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass,],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit{
  todos: Todo[] = [];
  inputValue = "";
  isEditing = false;
  isOngoing = false;

  constructor(private todoService: TodoService) {
    this.fetchTodos()
  }

  ngOnInit():void{
    this.fetchTodos()
  }

  onAddClick() {
    if (this.inputValue) {
      let todo: Todo = {description: this.inputValue, completed: false, isEditing: false};
      this.todoService.add(todo)
      this.todos.push(todo)
      this.inputValue = ""
    }
    this.isOngoing = false;
  }


  onDeleteClick(index: number) {
    const confirmed = confirm("Are you sure?");
    if(confirmed){
      this.todoService.delete(index)
      this.fetchTodos()
    }
    this.isOngoing = false;
  }

  onEdit(index: number) {
    if (this.isOngoing == true){
      return;
    }
    this.todos[index].isEditing = true;
    this.isOngoing = true;
  }

  onSave(index: number, value: string) {
    if (value) {
      const edited = this.todos[index];
      edited.description = value;
      this.todoService.update(edited, index)
      this.todos[index].isEditing = false;
      this.todoService.setAll(this.todos);
      this.isOngoing = false;
    }else{
      alert ("Input value")
    }
    this.isOngoing = false;
  }

  onCancel(index: number){
    this.todos[index].isEditing = false;
    this.todos[index] = {...this.todos[index]}
    this.isOngoing = false;
  }

  private fetchTodos() {
    this.todos = this.todoService.getAll()
  }

  OnCheckboxChange(todo: Todo, index: number): void {
    this.todoService.update(todo, index);
    this.fetchTodos();

}

  DeleteAll(){
    const confirmed = confirm("Are you sure?");
    if(confirmed){
      this.fetchTodos()
      this.todos.splice(0, this.todos.length)
      this.todoService.setAll(this.todos)
    }
    this.isOngoing = false;
  }
}
