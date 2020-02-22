
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { MaterialModule } from 'src/app/material.module';
import { ListTodoListComponent } from './todo-list/list-todo-list/list-todo-list.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from '../app-routing.module';
import { routing } from '../app.routing';
import { ItemComponent } from './todo-list/list-todo-list/item/item.component';

@NgModule({
    declarations: [
        BodyComponent,
        ListTodoListComponent,
        AboutComponent,
        ItemComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        MaterialModule,
        // routing
    ],
    exports: [BodyComponent],
    providers: []
})

export class BodyModule {

}