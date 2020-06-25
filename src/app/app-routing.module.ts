import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ListTodoListComponent } from './body/todo-list/list-todo-list/list-todo-list.component';
import { AboutComponent } from './body/about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'to-do-list', pathMatch: 'full' },
  { path: 'unauth', component: AuthComponent , canDeactivate: [AuthGuard]},
  { path: 'to-do-list', component: ListTodoListComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
