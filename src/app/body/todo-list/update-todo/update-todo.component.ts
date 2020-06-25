import { Component,  Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import Todo from '../todo';
import ToDoService from '../todo.service';
import LoadingMaskService from 'src/app/shared/loading-mask/loading-mask.service';
import AppService from 'src/app/app.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'td-update-todo',
    template: `
    <button mat-flat-button color="primary" (click) = "openToDoForm()">
        Edit
    </button>
    `,
})
export class UpdateToDo implements OnDestroy{

    @Input() todo: Todo;
    todoItem: Todo;
    dialogCloseSub: Subscription;

    constructor(
        public dialog: MatDialog,
        private appService: AppService,
        private todoService: ToDoService,
        private loadingMaskService: LoadingMaskService
    ) { }

    openToDoForm(): void {
        this.todoItem = new Todo(
            this.todo.id,
            this.todo.title,
            this.todo.description,
            this.todo.createdByUserId,
            this.todo.updatedByUserId,
            this.todo.completed,
        )
        const dialogRef = this.dialog.open(ModalComponent, {
            data: this.todoItem,
            disableClose: true
        });

        this.dialogCloseSub = dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.loadingMaskService.openLoadingMask("Saving...");
                this.todoService.updateTodo(result).subscribe(
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
        this.appService.setPopupMessage("Todo Updated Successfully !!!.");
        this.todoService.getMyToDoList(this.todo.createdByUserId);
        console.log(response);
    }

    onFail(error: any): void {
        console.log(error);
        this.loadingMaskService.closeLoadingMask();
        this.appService.setPopupMessage("Error in Updating Todo Item :( .");
        this.appService.displayPopupMessage("Ok",
            { panelClass: "snack-bar-class-error" }
        );
    }

    ngOnDestroy(){
        this.dialogCloseSub.unsubscribe();
    }
}