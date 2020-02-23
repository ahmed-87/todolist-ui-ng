
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { MaterialModule } from 'src/app/material.module';
import { ListTodoListComponent } from './todo-list/list-todo-list/list-todo-list.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from '../app-routing.module';
import { ItemComponent } from './todo-list/list-todo-list/item/item.component';
import ToDoService from './todo-list/todo.service';
import { HttpModule } from '@angular/http';
import { UpdateToDo } from './todo-list/update-todo.component';

@NgModule({
    declarations: [
        BodyComponent,
        AboutComponent,
        ListTodoListComponent,
        ItemComponent,
        UpdateToDo,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        MaterialModule,
        HttpModule 
    ],
    exports: [BodyComponent],
    providers: [ToDoService]
})

export class BodyModule {

}