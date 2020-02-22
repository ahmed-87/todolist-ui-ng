import {Routes, RouterModule} from "@angular/router";
import { ListTodoListComponent } from './body/todo-list/list-todo-list/list-todo-list.component';
import { AboutComponent } from './body/about/about.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';



const APP_ROUTES: Routes = [
    {path: 'unauth', pathMatch: 'full', component: AuthComponent, canDeactivate: [AuthGuard]},
    {path: '', redirectTo: '/to-do-list', pathMatch: 'full'},
    {path: 'to-do-list', component: ListTodoListComponent, canActivate: [AuthGuard]},
    {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
    // { path: '**', component: NoPageFoundComponent }

];

export const routing = RouterModule.forRoot(APP_ROUTES);