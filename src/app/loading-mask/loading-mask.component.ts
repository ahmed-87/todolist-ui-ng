import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
    selector: 'td-loading-mask',
    templateUrl: 'loading-mask.component.html',
    styleUrls: ['loading-mask.component.css']
  })
  export class LoadingMaskComponent {
  
    constructor(
      public dialogRef: MatDialogRef<LoadingMaskComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    handleClose(): void {
      this.dialogRef.close();
    }
  
  }