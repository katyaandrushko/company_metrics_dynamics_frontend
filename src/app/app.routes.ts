import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { guestGuard } from './core/guards/guest.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanyFormComponent } from './pages/company-form/company-form.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'companies', pathMatch: 'full' },

      {
        path: 'companies',
        canActivate: [authGuard],
        component: CompaniesComponent,
      },
      { path: 'companies/add', component: CompanyFormComponent },
      { path: 'companies/:id', component: CompanyFormComponent },
      {
        path: 'companies/details/:id',
        component: CompanyDetailComponent,
      },
      { path: 'login', canActivate: [guestGuard], component: LoginComponent },
      {
        path: 'register',
        canActivate: [guestGuard],
        component: RegisterComponent,
      },
    ],
  },
];
