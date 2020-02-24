import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Todo from './todo';
import ToDoService from './todo.service';
import LoadingMaskService from 'src/app/loading-mask/loading-mask.service';
import { ConfirmComponent } from 'src/app/confirm/confirm.component';
import AppService from 'src/app/app.service';

@Component({
    selector: 'td-mark-todo',
    template: `
    <button mat-menu-item (click) = "openMarkConfirm()">
         <mat-icon>check</mat-icon>
        <span>Mark Done</span>
    </button>
    `,
})
export class MarkToDo {

    @Input() todo: Todo;
    todoItem: Todo;

    constructor(
        public dialog: MatDialog,
        private appService: AppService,
        private todoService: ToDoService,
        private loadingMaskService: LoadingMaskService
    ) { }

    openMarkConfirm(): void {
        this.todoItem = new Todo(
            this.todo.id,
            this.todo.title,
            this.todo.description,
            this.todo.createdByUserId,
            this.todo.updatedByUserId,
            this.todo.completed,
        );

        let message = "Are you sure you want to mark this item as DONE?."
        let confirmBtn = "Mark as DONE"
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: { message, confirmBtn },
            disableClose: true,
        });

        dialogRef.updatePosition({ top: `65px` });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.loadingMaskService.openLoadingMask("Saving...");
                this.todoService.markDone(this.todoItem).subscribe(
                    //Success
                    (response) => this.onSuccess(response),

                    //Fail
                    (error) => this.onFail(error),

                    //Finish
                    () => this.loadingMaskService.closeLoadingMask()
                )
            } else {
                //Cancel button clicked
            }
            console.log('The ToDo form was closed');
        });
    }

    onSuccess(response: any): void {
        this.appService.setPopupMessage("Todo successfully Marked as DONE !!!.");
        this.todoService.getMyToDoList(this.todo.createdByUserId);
        console.log(response);
    }

    onFail(error: any): void {
        console.log(error);
        this.loadingMaskService.closeLoadingMask();
        this.appService.setPopupMessage("Error in Saving Todo Item :( .");
        this.appService.displayPopupMessage("Ok",
            { panelClass: "snack-bar-class-error" }
        );
    }

}