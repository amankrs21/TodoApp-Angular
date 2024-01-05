import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../Todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo:Todo = new Todo();
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();

  deleteTodo() {
    this.todoDelete.emit(this.todo);
  }

  onCheckboxClick(){
    this.todoCheckbox.emit(this.todo);
  }
}
