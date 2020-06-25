import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Todo from 'src/app/body/todo-list/todo';




@Component({
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent {
    constructor(
        public dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Todo) { }

    handleClick(): void {
        this.dialogRef.close();
    }
}