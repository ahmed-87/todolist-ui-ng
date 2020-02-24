import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

declare const gapi: any;

@Injectable()
class AppService {

    private pupopMessage: string = "";
    constructor(private snakBar: MatSnackBar) { }
    setPopupMessage = (message: string) => {
        this.pupopMessage = message;
    }

    displayPopupMessage = (action: string, options: any) => {
        return this.snakBar.open(this.pupopMessage, action,
            { ...options }
        )
    }
}


export default AppService;