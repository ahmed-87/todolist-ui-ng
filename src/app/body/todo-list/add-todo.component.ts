import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import Todo from './todo';
import ToDoService from './todo.service';
import { Subscription } from 'rxjs';
import LoadingMaskService from 'src/app/loading-mask/loading-mask.service';

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
                    (error) => console.log(error),

                    //Finish
                    () => this.loadingMaskService.closeLoadingMask()
                )
            } else {
                //Cancel button clicked
                this.todo =   new Todo(0, "", "", 0, 0, false);
            }
            console.log('The ToDo form was closed');
        });
    }
    onSuccess(response: any): void {
        this.todoService.getMyToDoList(this.todo.createdByUserId);
        console.log(response);
    }

}