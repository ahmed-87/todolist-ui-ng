
import { HeaderComponent } from "./header.component";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import AuthService from '../auth/auth.service';



@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ],
    exports: [HeaderComponent],
    providers: [AuthService]
})

export class HeaderModule {

}