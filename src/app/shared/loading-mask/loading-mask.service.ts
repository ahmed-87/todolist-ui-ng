import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { LoadingMaskComponent } from './loading-mask.component';



@Injectable()
class LoadingMaskService {

    constructor(public dialog: MatDialog){}

    loadingMask: any;
    openLoadingMask = (message: string) : void => {
        this.loadingMask = this.dialog.open(LoadingMaskComponent, {
            data: {message: message},
            panelClass: "loading-mask-content",
            disableClose: true
        });
    };

    closeLoadingMask = () : void => {
        this.loadingMask.close();
    }
}

export default LoadingMaskService;