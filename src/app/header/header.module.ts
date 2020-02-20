
import { HeaderComponent } from "./header.component";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';



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
    providers: []
})

export class HeaderModule {

}