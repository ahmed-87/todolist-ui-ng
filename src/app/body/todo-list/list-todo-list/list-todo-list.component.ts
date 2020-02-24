import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import ToDoService from '../todo.service';
import { Subscription } from 'rxjs';
import AuthService from 'src/app/auth/auth.service';
import Todo from '../todo';
import LoadingMaskService from 'src/app/loading-mask/loading-mask.service';
import AppService from 'src/app/app.service';

@Component({
  selector: 'td-list-todo-list',
  templateUrl: './list-todo-list.component.html',
  styleUrls: ['./list-todo-list.component.css']
})
export class ListTodoListComponent implements OnInit, AfterViewInit, OnDestroy {

  userId: Number;
  todoList: Todo[] = [];
  authSubscriber: Subscription;
  toDoListSubscriber: Subscription;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private loadingMaskService: LoadingMaskService,
    private todoService: ToDoService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    // this.authSubscriber = this.authService.getAuthDate().subscribe((authDate) => {
    //   this.zone.run(() => {
    //     this.userId = authDate.userProfile.userId;
    //     if (this.userId > 0 && this.todoService.todoList.length === 0) {
    //       this.loadingMaskService.openLoadingMask("Loading...");
    //       this.todoService.getMyToDoList(this.userId);
    //       this.appService.setPopupMessage("ToDo Loaded Successfully !!!");
    //     }else{
    //       this.todoList = this.todoService.todoList;
    //     }
    //   });
    // });
  }
  
  ngAfterViewInit(): void {
    
    this.userId = this.authService.getUserId();
    if (this.userId > 0) {
      this.loadingMaskService.openLoadingMask("Loading...");
      this.todoService.getMyToDoList(this.userId);
      this.appService.setPopupMessage("ToDo Loaded Successfully !!!");
    }
    
    
    this.zone.run(() => {
      this.toDoListSubscriber = this.todoService
        .listMyToDoList().subscribe((data) => {
          this.todoList = data;
          this.loadingMaskService.closeLoadingMask();
          this.appService.displayPopupMessage("",
            { duration: 3000, panelClass: "snack-bar-class-success" }
          );
        })

    });
  }

  ngOnDestroy() {
    // this.authSubscriber.unsubscribe();
    this.toDoListSubscriber.unsubscribe();
  }
}
