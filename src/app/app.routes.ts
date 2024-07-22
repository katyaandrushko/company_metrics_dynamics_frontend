import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { guestGuard } from './core/guards/guest.guard';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', canActivate: [guestGuard], component: LoginComponent },
      {
        path: 'register',
        canActivate: [guestGuard],
        component: RegisterComponent,
      },
    ],
  },
];
