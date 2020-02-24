import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
    templateUrl: 'loading-mask.component.html',
    styleUrls: ['loading-mask.component.css']
  })
  export class LoadingMaskComponent {
  
    constructor(
      public dialogRef: MatDialogRef<LoadingMaskComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  }