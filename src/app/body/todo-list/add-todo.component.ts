import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import Todo from './todo';
import ToDoService from './todo.service';
import LoadingMaskService from 'src/app/loading-mask/loading-mask.service';
import AppService from 'src/app/app.service';

@Component({
    selector: 'td-add-todo',
    template: `
    <button mat-flat-button color="primary" (click) = "openToDoForm()">
        <mat-icon>add</mat-icon>
        Add
    </button>
    `,
})
export class AddToDo {

    todo: Todo = new Todo(0, "", "", 0, 0, false);

    constructor(
        public dialog: MatDialog,
        private appService: AppService,
        private todoService: ToDoService,
        private loadingMaskService: LoadingMaskService
    ) { }

    openToDoForm(): void {
        const dialogRef = this.dialog.open(ModalComponent, {
            data: this.todo,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                //Submit button clicked
                this.loadingMaskService.openLoadingMask("Saving...");
                this.todoService.addTodo(result).subscribe(
                    //Success
                    (response) => this.onSuccess(response),

                    //Fail
                    (error) => this.onFail(error),

                    //Finish
                    () => this.loadingMaskService.closeLoadingMask()
                )
            } else {
                //Cancel button clicked
                this.todo = new Todo(0, "", "", 0, 0, false);
            }
            console.log('The ToDo form was closed');
        });
    }

    onSuccess(response: any): void {
        this.todoService.getMyToDoList(this.todo.createdByUserId);
        this.todo = JSON.parse(response._body).data;
        this.todoService.emitNewToDoItem(this.todo);
        this.todo = new Todo(0, "", "", 0, 0, false);
        this.appService.setPopupMessage("Todo Added Successfully !!!.");
        this.appService.displayPopupMessage("Ok",
            { panelClass: "snack-bar-class-error" }
        );

    }

    onFail(error: any): void {
        console.log(error);
        this.loadingMaskService.closeLoadingMask();
        this.appService.setPopupMessage("Error in Adding Todo Item :( .");
        this.appService.displayPopupMessage("Ok",
            { panelClass: "snack-bar-class-error" }
        );
    }
}