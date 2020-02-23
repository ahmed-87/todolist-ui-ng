import { Component, OnInit, OnDestroy } from '@angular/core';
import ToDoService from '../todo.service';
import { Subscription } from 'rxjs';
import AuthService from 'src/app/auth/auth.service';
import Todo from '../todo';
import LoadingMaskService from 'src/app/loading-mask/loading-mask.service';

@Component({
  selector: 'td-list-todo-list',
  templateUrl: './list-todo-list.component.html',
  styleUrls: ['./list-todo-list.component.css']
})
export class ListTodoListComponent implements OnInit, OnDestroy {

  todoList: Todo[] = [];
  toDoListSubscriber: Subscription;

  constructor(
    private authService: AuthService,
    private loadingMaskService: LoadingMaskService,
    private todoService: ToDoService, 
    ) { }

  ngOnInit() {
    let userId: Number = this.authService.getUserId();
    this.loadingMaskService.openLoadingMask("Loading...");
    this.todoService.getMyToDoList(userId);
    this.toDoListSubscriber = this.todoService
    .listMyToDoList().subscribe(data => {
      this.todoList = data;
      this.loadingMaskService.closeLoadingMask();
      });
  }



  onSuccess = (response: any) => {
    this.todoList = response.json();

    console.log(this.todoList);
  }

  // onFail = (error: any) => {

  // }


  ngOnDestroy() {
    this.toDoListSubscriber.unsubscribe();
  }
}
