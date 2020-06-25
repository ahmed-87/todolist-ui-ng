import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Todo from '../todo';
import ToDoService from '../todo.service';
import LoadingMaskService from 'src/app/shared/loading-mask/loading-mask.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import AppService from 'src/app/app.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'td-delete-todo',
    template: `
    <button mat-menu-item (click) = "openDeleteConfirm()">
        <mat-icon>close</mat-icon>
        <span>Remove</span>
    </button>
    `,
})
export class DeleteToDo implements OnDestroy{

    @Input() todo: Todo;
    todoItem: Todo;
    dialogCloseSub: Subscription;

    constructor(
        public dialog: MatDialog,
        private appService: AppService,
        private todoService: ToDoService,
        private loadingMaskService: LoadingMaskService
    ) { }

    openDeleteConfirm(): void {
        this.todoItem = new Todo(
            this.todo.id,
            this.todo.title,
            this.todo.description,
            this.todo.createdByUserId,
            this.todo.updatedByUserId,
            this.todo.completed,
        );

        let message = "Are you sure you want to delete this item?.";
        let confirmBtn = "Delete";
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: { message, confirmBtn },
            disableClose: true,
        });

        dialogRef.updatePosition({ top: `65px`});

        this.dialogCloseSub = dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.loadingMaskService.openLoadingMask("Saving...");
                this.todoService.deleteTodo(this.todoItem).subscribe(
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
        this.appService.setPopupMessage("Todo Deleted Successfully !!!.");
        this.todoService.getMyToDoList(this.todo.createdByUserId);
        console.log(response);
    }

    onFail(error: any): void {
        console.log(error);
        this.loadingMaskService.closeLoadingMask();
        this.appService.setPopupMessage("Error in Deleting Todo Item :( .");
        this.appService.displayPopupMessage("Ok",
            { panelClass: "snack-bar-class-error" }
        );
    }



    ngOnDestroy(){
        this.dialogCloseSub.unsubscribe();
    }
}