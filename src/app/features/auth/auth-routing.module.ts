import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth';
import { SignInComponent } from './components/sign-in';
import { SignOnComponent } from './components/sign-on/sign-on.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: SignInComponent },
      { path: 'registrar', component: SignOnComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
