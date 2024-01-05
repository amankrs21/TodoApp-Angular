import { Component } from '@angular/core';
import { Todo } from '../../../../Todo';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { SearchService } from '../../../Services/search.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
  imports: [CommonModule, TodoItemComponent, AddTodoComponent],
})
export class TodosComponent {
  localItem: string | null;
  todos: Todo[];
  filteredTodos: Todo[] = [];

  constructor(private searchService: SearchService, private toastr: ToastrService) {
    this.localItem = localStorage.getItem('todos');
    if (this.localItem == null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(this.localItem);
    }
  }

  ngOnInit(): void {
    this.searchService.search$.subscribe((searchTerm) => {
      this.filteredTodos = this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.updateFilteredTodos();
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.toastr.success('Todo Added Successfully!!');
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    this.updateFilteredTodos();
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.toastr.warning('Todo Deleted Successfully!!');
  }

  toggleTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.toastr.info('Todo updated Successfully!!');
  }

  private filterTodos(searchTerm: string): void {
    if (!searchTerm) {
      // If no search term, display all todos
      this.filteredTodos = [...this.todos];
    } else {
      // Filter todos based on search term
      this.filteredTodos = this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  private updateFilteredTodos(): void {
    // Update filteredTodos based on the current search term
    const searchTerm = this.searchService.getSearchTerm();
    this.filterTodos(searchTerm);
  }
}
