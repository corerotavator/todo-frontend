import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  newTodoTitle = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;
    this.todoService.createTodo(this.newTodoTitle).subscribe(todo => {
      this.todos.push(todo);
      this.newTodoTitle = '';
    });
  }

  updateTodo(todo: any): void {
    this.todoService.updateTodo( {
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }).subscribe();
  }

  deleteTodo(todo: any): void {
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    });
  }
}