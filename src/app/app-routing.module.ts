import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FloatingSearchComponent } from './floating-search/floating-search.component';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from '../auth-guard';

const routes: Routes = [
    {
        path: '',
        component: FloatingSearchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
