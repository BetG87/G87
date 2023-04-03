import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ManageraccountComponent } from './manageraccount/manageraccount.component';
import { ManagergameComponent } from './managergame/managergame.component';
import { ManagerbankComponent } from './managerbank/managerbank.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
  ,
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'account-info',
    component: AccountInfoComponent,
  },
  {
    path: 'manageraccount',
    component: ManageraccountComponent,
  },
  {
    path: 'managergame',
    component: ManagergameComponent,
  },
  {
    path: 'managerbank',
    component: ManagerbankComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}