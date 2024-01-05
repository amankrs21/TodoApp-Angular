import { Routes } from '@angular/router';
import { TodosComponent } from './Components/Todo/todos/todos.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'todo', component: TodosComponent },
    { path: '', redirectTo: '/todo', pathMatch: 'full'},
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', component: PageNotFoundComponent }
];
