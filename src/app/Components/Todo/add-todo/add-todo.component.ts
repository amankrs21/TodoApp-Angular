import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../../../Todo';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
  
  submitted = false;
  todoForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }
  
  onSubmit = () => {
    this.submitted = true;
    if (this.todoForm.invalid) {
      return;
    }
    const todo = {
      id: 21,
      title: this.todoForm.value.title,
      desc: this.todoForm.value.desc,
      active: true
    }
    console.log('Form submitted:', todo);
    this.submitted = false;
    this.todoAdd.emit(todo);
    this.todoForm.reset();
  }
}
