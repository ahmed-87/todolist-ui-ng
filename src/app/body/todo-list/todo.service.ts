import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import Todo from './todo';
import AuthService from 'src/app/auth/auth.service';
import LoadingMaskService from 'src/app/shared/loading-mask/loading-mask.service';
import AppService from 'src/app/app.service';


@Injectable()
class ToDoService {

    constructor(
        private http: Http,
        private appService: AppService,
        private authService: AuthService,
        private loadingMaskService: LoadingMaskService 
    ) { }

    host: string = 'http://localhost:8383/todo';
    headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    public todoList: Todo[] = [];
    private todoListSubject = new Subject<Todo[]>();
    private todoItem = new Subject<Todo>();
    private pupopMessage: string = "";

    getMyToDoList(userId: Number) {
        let requestBody = {
            user_id: userId,
            completed: false
        }

        this.http.post(
            `${this.host}/all`
            , requestBody
            , { headers: this.headers }
        ).subscribe(
            //Success
            (response) => this.onSuccess(response),

            //Fail
            (error) => this.onFail(error),

            //Finished
            //  () => this.appService.finishLoad(1)
        );
    }

    addTodo = (todo: Todo): Observable<any> => {
        todo.createdByUserId = todo.updatedByUserId = this.authService.getUserId();
        let requestBody = { ...todo };
        return this.http.post(
            `${this.host}/add`
            , requestBody
            , { headers: this.headers }
        );
    }

    updateTodo = (todo: Todo): Observable<any> => {
        todo.updatedByUserId = this.authService.getUserId();
        let requestBody = { ...todo };

        return this.http.put(
            `${this.host}/update`
            , requestBody
            , { headers: this.headers }
        );
    }

    deleteTodo = (todo: Todo): Observable<any> => {
    
        return this.http.delete(
            `${this.host}/delete/${todo.id}`
            , { headers: this.headers }
        );
    }

    markDone = (todo: Todo): Observable<any> => {
        todo.updatedByUserId = this.authService.getUserId();
        todo.completed = true;
        let requestBody = { ...todo };

        return this.http.put(
            `${this.host}/update`
            , requestBody
            , { headers: this.headers }
        );
    }

    listMyToDoList = () => {
        return this.todoListSubject.asObservable();
    }

    emitNewToDoItem = (todo: Todo) => {
        return this.todoItem.next(todo);
    }

    getNewToDoItem = () => {
        return this.todoItem.asObservable();
    }

    onSuccess(response: any): void {
        this.todoList = response.json();
        this.todoListSubject.next(this.todoList);
    }

    onFail(error: any): void {
        console.log(error);
        this.loadingMaskService.closeLoadingMask();
        this.appService.setPopupMessage("Error in fetching Todo list :( .");
        this.appService.displayPopupMessage("Ok",
            { panelClass: "snack-bar-class-error" }
        );
    }
}



export default ToDoService;